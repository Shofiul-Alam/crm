import { App, InjectionKey, ComponentOptionsMixin } from 'vue'
import { ModuleDeclaration, ModuleManager } from '@/share/types';
import mitt, { Emitter } from 'mitt';
import { Router } from 'vue-router';

export const EmitterInjectionKey = Symbol() as InjectionKey<Emitter<any>>
export const ServiceInjectionKey = Symbol() as InjectionKey<ComponentOptionsMixin>

export default {
    install: (app: App, {
        modules,
        services,
        router,
        config,
    }: ModuleManager): void => {

        const additionalServices: ComponentOptionsMixin[] = [];
        let messages = {};

        // init modules
        for (const module of modules) {

            console.info(`registering module -> ${module.name}`);

            // module routes
            addBaseRoute(router, module);
            addRoute(router, module);
        }

        for (const service of services) {
            console.info(`registering service -> ${service.name}`);
            // add optional script to vue instance
            additionalServices.push(service.component)
        }

        // provide emitter
        app.provide(EmitterInjectionKey, mitt())

        // provide modules, that requires the vue instance
        app.provide(ServiceInjectionKey, additionalServices)
    }
};

// Base Route for modules
const addBaseRoute = (router: Router, module: ModuleDeclaration): void => {
    if (!module.component) return;


    if (!module.basePath) {
        throw new Error('`basepath` should not be empty. Either set a basepath or declare the module as `anonymous`')
    }

    router.addRoute({
        name: module.name,
        path: module.basePath,
        component: module.component,
    })
}

const addRoute = (router: Router, module: ModuleDeclaration): void => {
    if (!module.routes) return;

    for (const route of module.routes) {
        if (module.component) {
            // add Module Routes
            router.addRoute(module.name, route)
        } else {
            // add Routes
            router.addRoute(route);
        }
    }
}
