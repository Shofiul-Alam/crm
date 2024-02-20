# We need to build the Composer base to reuse packages we've installed
FROM composer:2.3.5 as composer_base

# Create args for PHP extensions and PECL packages we need to install.
# This makes it easier if we want to install packages,
# as we have to install them in multiple places.
# This helps keep ou Dockerfiles DRY -> https://bit.ly/dry-code
# You can see a list of required extensions for Laravel here: https://laravel.com/docs/8.x/deployment#server-requirements
# Need add tokenizer ext (error on install)
ARG PHP_EXTS="bcmath ctype fileinfo mbstring pdo pdo_mysql dom pcntl gd"
ARG PHP_PECL_EXTS="redis mongodb"


# First, create the application directory, and some auxilary directories for scripts and such
RUN mkdir -p /opt/apps/laravel-in-kubernetes /opt/apps/laravel-in-kubernetes/bin

# Next, set our working directory
WORKDIR /opt/apps/laravel-in-kubernetes



# We need to create a composer group and user, and create a home directory for it, so we keep the rest of our image safe,
# And not accidentally run malicious scripts
RUN addgroup -S composer \
    && adduser -S composer -G composer \
    && chown -R composer /opt/apps/laravel-in-kubernetes \
    && apk add --no-cache ${PHPIZE_DEPS} openssl ca-certificates gnupg libpng zstd curl-dev libxml2-dev oniguruma-dev libpng-dev \
    && docker-php-ext-configure gd --enable-gd \
    && docker-php-ext-install -j$(nproc) ${PHP_EXTS} \
    && pecl install ${PHP_PECL_EXTS} \
    && docker-php-ext-enable ${PHP_PECL_EXTS} \
    && apk del --no-cache curl-dev libxml2-dev libpng-dev oniguruma-dev

# Next we want to switch over to the composer user before running installs.
# This is very important, so any extra scripts that composer wants to run,
# don't have access to the root filesystem.
# This especially important when installing packages from unverified sources.
USER composer



# Copy in our dependency files.
# We want to leave the rest of the code base out for now,
# so Docker can build a cache of this layer,
# and only rebuild when the dependencies of our application changes.
COPY --chown=composer composer.json ./
# COPY --chown=composer composer.lock ./
COPY ./docker/fpm/php.ini /usr/local/etc/php/conf.d/docker-php-laravel.ini



# Install all the dependencies without running any installation scripts.
# We skip scripts as the code base hasn't been copied in yet and script will likely fail,
# as `php artisan` available yet.
# This also helps us to cache previous runs and layers.
# As long as comoser.json and composer.lock doesn't change the install will be cached.
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist



# Copy in our actual source code so we can run the installation scripts we need
# At this point all the PHP packages have been installed,
# and all that is left to do, is to run any installation scripts which depends on the code base
COPY --chown=composer . .


# Now that the code base and packages are all available,
# we can run the install again, and let it run any install scripts.
RUN composer install --no-dev --prefer-dist --ignore-platform-reqs

#--------------------------------- Our Code Base is End Here -------------------------------





#--------------------------------- Frontend Start Here -------------------------------
# For the frontend, we want to get all the Laravel files,
# and run a production compile
FROM node:18.13.0 as frontend

# We need to copy in the Laravel files to make everything is available to our frontend compilation
COPY --from=composer_base /opt/apps/laravel-in-kubernetes /opt/apps/laravel-in-kubernetes

WORKDIR /opt/apps/laravel-in-kubernetes

# We want to install all the NPM packages,
# and compile the MIX bundle for production
# RUN npm install --save-dev webpack-cli
RUN npm install && \
    npm run build


#--------------------------------Frontend End here--------------------------------------------

# #--------------------------------FPM_SERVER Start here--------------------------------------------
# We need a stage which contains FPM to actually run and process requests to our PHP application.
FROM php:8.2-fpm-alpine as laravel-php

# We need to declare that we want to use the args in this build step

ARG PHP_EXTS="bcmath ctype fileinfo mbstring pdo pdo_mysql dom pcntl opcache curl gd"

ARG PHP_PECL_EXTS="redis mongodb"

WORKDIR /opt/apps/laravel-in-kubernetes

RUN apk update
RUN apk add --no-cache ${PHPIZE_DEPS} bash curl openssl ca-certificates supervisor gnupg libpng freetype libwebp libjpeg-turbo zstd icu curl-dev libxml2-dev oniguruma-dev libwebp-dev libpng-dev freetype-dev libjpeg-turbo-dev

RUN docker-php-ext-configure gd --enable-gd --with-jpeg --with-freetype --with-webp  && \
    docker-php-ext-install -j$(nproc) ${PHP_EXTS} && \
    pecl install ${PHP_PECL_EXTS} && \
    docker-php-ext-enable ${PHP_PECL_EXTS} && \
    apk del --no-cache curl-dev libxml2-dev libpng-dev oniguruma-dev libwebp-dev freetype-dev libjpeg-turbo-dev

# As FPM uses the www-data user when running our application,
# we need to make sure that we also use that user when starting up,
# so our user "owns" the application when running

USER  www-data

COPY ./docker/fpm/php.ini /usr/local/etc/php/conf.d/docker-php-laravel.ini

# We have to copy in our code base from our initial build which we installed in the previous stage
COPY --from=composer_base --chown=www-data /opt/apps/laravel-in-kubernetes /opt/apps/laravel-in-kubernetes

# #--------------------------------FPM_SERVER END here--------------------------------------------


# #--------------------------------FPM_SERVER Start here--------------------------------------------
# We need a stage which contains FPM to actually run and process requests to our PHP application.
FROM laravel-php as fpm_server

WORKDIR /opt/apps/laravel-in-kubernetes

ARG WWWGROUP
ARG XDEBUG_MODE
ARG PHP_PECL_EXTS="sqlsrv pdo_sqlsrv"

USER root
# MS-SQL Driver setup
# https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver15#alpine17
RUN curl -O https://download.microsoft.com/download/b/9/f/b9f3cce4-3925-46d4-9f46-da08869c6486/msodbcsql18_18.0.1.1-1_amd64.apk
RUN curl -O https://download.microsoft.com/download/b/9/f/b9f3cce4-3925-46d4-9f46-da08869c6486/mssql-tools18_18.0.1.1-1_amd64.apk
RUN apk add --allow-untrusted msodbcsql18_18.0.1.1-1_amd64.apk
RUN apk add --allow-untrusted mssql-tools18_18.0.1.1-1_amd64.apk

# MS-SQL Driver setup
# https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver15#alpine17
# RUN curl -O https://download.microsoft.com/download/3/5/5/355d7943-a338-41a7-858d-53b259ea33f5/msodbcsql18_18.3.1.1-1_arm64.apk
# RUN curl -O https://download.microsoft.com/download/3/5/5/355d7943-a338-41a7-858d-53b259ea33f5/mssql-tools18_18.3.1.1-1_arm64.apk
# RUN apk add --allow-untrusted msodbcsql18_18.3.1.1-1_arm64.apk
# RUN apk add --allow-untrusted mssql-tools18_18.3.1.1-1_arm64.apk

RUN apk add --no-cache ${PHPIZE_DEPS} unixodbc-dev &&\
    pecl install ${PHP_PECL_EXTS} && \
    docker-php-ext-enable ${PHP_PECL_EXTS} && \
    apk del --no-cache unixodbc-dev

RUN if [ "${XDEBUG_MODE}" = "True" ]; then \
        apk add --no-cache --virtual .build-deps ${PHPIZE_DEPS} &&\
        apk add --update linux-headers  &&\
        pecl install xdebug &&\
        docker-php-ext-enable xdebug  &&\
        apk del -f .build-deps; fi

# https://github.com/mendsley/docker-alpine-gosu/blob/master/Dockerfile
#ENV GOSU_VERSION="1.7" \
#  GOSU_DOWNLOAD_URL="https://github.com/tianon/gosu/releases/download/1.7/gosu-amd64" \
#  GOSU_DOWNLOAD_SIG="https://github.com/tianon/gosu/releases/download/1.7/gosu-amd64.asc" \
#  GOSU_DOWNLOAD_KEY="0x036A9C25BF357DD4"
#RUN apk update \
#    && gpg-agent --daemon \
#    && gpg --keyserver pgp.mit.edu --recv-keys $GOSU_DOWNLOAD_KEY \
#    && echo "trusted-key $GOSU_DOWNLOAD_KEY" >> /root/.gnupg/gpg.conf \
#    && curl -sSL "$GOSU_DOWNLOAD_URL" > gosu-amd64 \
#    && curl -sSL "$GOSU_DOWNLOAD_SIG" > gosu-amd64.asc \
#    && gpg --verify gosu-amd64.asc \
#    && rm -f gosu-amd64.asc \
#    && mv gosu-amd64 /usr/bin/gosu \
#    && chmod +x /usr/bin/gosu \
#    && apk del --purge $buildDeps \
#    && rm -rf /root/.gnupg \
#    && rm -rf /var/cache/apk/*
RUN mkdir /var/log/supervisor
RUN chown www-data:www-data -R /var/log/supervisor
RUN touch /var/run/supervisord.pid
RUN chown www-data:www-data /var/run/supervisord.pid
COPY ./docker/fpm/start-container /usr/local/bin/start-container
COPY ./docker/fpm/fpm-supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN chmod +x /usr/local/bin/start-container

# RUN addgroup -S $WWWGROUP && adduser -S sail -G $WWWGROUP
# RUN adduser -u 1337 sail -G $WWWGROUP -h /home/sail -D sail
# RUN usermod -a -G root sail
# RUN usermod -a -G $WWWGROUP sail


# As FPM uses the www-data user when running our application,
# we need to make sure that we also use that user when starting up,
# so our user "owns" the application when running
USER  www-data

# We have to copy in our code base from our initial build which we installed in the previous stage
COPY --from=frontend --chown=www-data /opt/apps/laravel-in-kubernetes/public /opt/apps/laravel-in-kubernetes/public

# We want to cache the event, routes, and views so we don't try to write them when we are in Kubernetes.
# Docker builds should be as immutable as possible, and this removes a lot of the writing of the live application.

# #--------------------------------FPM_SERVER END here--------------------------------------------

#--------------------------------CLI Start here--------------------------------------------
# For running things like migrations, and queue jobs,
# we need a CLI container.
# It contains all the Composer packages,
# and just the basic CLI "stuff" in order for us to run commands,
# be that queues, migrations, tinker etc.
FROM laravel-php as cli

# We need to declare that we want to use the args in this build step
WORKDIR /opt/apps/laravel-in-kubernetes

USER  root
# We need to install some requirements into our image,
# used to compile our PHP extensions, as well as install all the extensions themselves.
# You can see a list of required extensions for Laravel here: https://laravel.com/docs/8.x/deployment#server-requirements
# RUN apk add --no-cache supervisor

USER www-data
# Need to Setup SuperVisor and Laravel WebSocket here to trigger
COPY ./docker/queue/laravel-worker.conf /etc/supervisor/conf.d/laravel-worker.conf

# We want to cache the event, routes, and views so we don't try to write them when we are in Kubernetes.
# Docker builds should be as immutable as possible, and this removes a lot of the writing of the live application.
# RUN php artisan event:cache

#--------------------------------CLI END here--------------------------------------------




# # #--------------------------------NGINX_Web_Server Start here--------------------------------------------
# We need an nginx container which can pass requests to our FPM container,
# as well as serve any static content.
FROM nginx:1.20-alpine as web_server

WORKDIR /opt/apps/laravel-in-kubernetes

RUN apk add openssl;
# We need to add our NGINX template to the container for startup,
# and configuration.
COPY docker/server-setup/web_server/nginx.conf.template /etc/nginx/nginx.conf
COPY docker/server-setup/web_server/start-container.sh /
RUN chmod +x /start-container.sh
RUN mkdir -p /etc/nginx/ssl/
RUN openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=KROST, Inc./CN=localhost" -addext "subjectAltName=DNS:localhost" -newkey rsa:2048 -keyout /etc/nginx/ssl/localhost.key -out /etc/nginx/ssl/localhost.crt;

# Copy in ONLY the public directory of our project.
# This is where all the static assets will live, which nginx will serve for us.
COPY --from=frontend /opt/apps/laravel-in-kubernetes/public /opt/apps/laravel-in-kubernetes/public
RUN mkdir -p /var/www/certbot

#ENTRYPOINT ["/start-container.sh"]
#CMD ["nginx", "-g", "daemon off;"]

# # #--------------------------------NGINX_Web_Server End here--------------------------------------------


# # # #--------------------------------Jasper Start here--------------------------------------------
# We need a Jasper container to generate application reports.
# We'll start with the CLI container as our base,
# as we only need to override the CMD which the container starts with to point at cron
FROM cli as jasper

WORKDIR /opt/apps/laravel-in-kubernetes
USER root
RUN mkdir /var/log/supervisor
RUN chown www-data:www-data -R /var/log/supervisor
RUN touch /var/run/supervisord.pid
RUN chown www-data:www-data /var/run/supervisord.pid
COPY ./docker/fpm/start-container /usr/local/bin/start-container
COPY ./docker/fpm/fpm-supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN chmod +x /usr/local/bin/start-container
# We have to install jave SDK in order to create jasperstarter runtime environment


RUN apk update
RUN apk add openjdk8



# #--------------------------------Jasper End here--------------------------------------------


# # # #--------------------------------CRON Start here--------------------------------------------
# We need a CRON container to the Laravel Scheduler.
# We'll start with the CLI container as our base,
# as we only need to override the CMD which the container starts with to point at cron
FROM jasper as cron

WORKDIR /opt/apps/laravel-in-kubernetes

ARG PHP_PECL_EXTS="sqlsrv pdo_sqlsrv"

USER root
# MS-SQL Driver setup
# https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver15#alpine17
RUN curl -O https://download.microsoft.com/download/b/9/f/b9f3cce4-3925-46d4-9f46-da08869c6486/msodbcsql18_18.0.1.1-1_amd64.apk
RUN curl -O https://download.microsoft.com/download/b/9/f/b9f3cce4-3925-46d4-9f46-da08869c6486/mssql-tools18_18.0.1.1-1_amd64.apk
RUN apk add --allow-untrusted msodbcsql18_18.0.1.1-1_amd64.apk
RUN apk add --allow-untrusted mssql-tools18_18.0.1.1-1_amd64.apk

RUN apk add --no-cache ${PHPIZE_DEPS} unixodbc-dev &&\
    pecl install ${PHP_PECL_EXTS} && \
    docker-php-ext-enable ${PHP_PECL_EXTS} && \
    apk del --no-cache unixodbc-dev

# We want to create a laravel.cron file with Laravel cron settings, which we can import into crontab,
# and run crond as the primary command in the forground
RUN touch laravel.cron && \
    echo "* * * * * cd /opt/apps/laravel-in-kubernetes && php artisan schedule:run >> /dev/stdout 2>&1" >> laravel.cron && \
    crontab laravel.cron

CMD ["crond", "-f", "-d", "8"]
# #--------------------------------CRON End here--------------------------------------------

# #--------------------------------Dotnet Api Start here--------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS dotnet_base
USER root
WORKDIR /app
EXPOSE 80-81

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS dotnet_build
USER root
WORKDIR /src
COPY ./DotnetApi /src/DotnetApi
WORKDIR "/src/DotnetApi"
RUN dotnet restore "./PayFlowApiClient/PayFlowApiClient.csproj"
RUN dotnet build "./PayFlowApiClient/PayFlowApiClient.csproj" -c Release -o /app/build

FROM dotnet_build AS dotnet_publish
USER root
RUN dotnet publish "./PayFlowApiClient/PayFlowApiClient.csproj" -c Release -o /app/publish

FROM dotnet_base AS dotnet_final
USER root
WORKDIR /app
COPY --from=dotnet_publish /app/publish .
RUN touch /app/PayflowSDK.log
RUN chmod 777 /app/PayflowSDK.log
ENTRYPOINT ["dotnet", "PayFlowApiClient.dll"]
# #--------------------------------Dotnet End here--------------------------------------------



FROM cli
