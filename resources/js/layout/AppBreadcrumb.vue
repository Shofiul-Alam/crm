<script setup>
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
const breadcrumbRoutes = ref([]);
const title = ref([]);

const setBreadcrumbRoutes = () => {
    if (route.meta.breadcrumb) {
        breadcrumbRoutes.value = route.meta.breadcrumb;
        title.value = route.meta.title
        return;
    }

    breadcrumbRoutes.value = route.fullPath
        .split('/')
        .filter((item) => item !== '')
        .filter((item) => isNaN(Number(item)))
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1));
};

watch(
    route,
    () => {
        setBreadcrumbRoutes();
    },
    { immediate: true }
);
</script>

<template>
    <nav class="layout-breadcrumb">
        <h3>{{title}}</h3>
        <ol>
            <template v-for="(breadcrumbRoute, i) in breadcrumbRoutes" :key="breadcrumbRoute">
                <li :class="{'current': breadcrumbRoutes.length===i+1}">
                    <template v-if="breadcrumbRoutes.length===i+1">
                        {{ breadcrumbRoute.label }}
                    </template>
                    <template v-else>
                        <router-link :to="{name: breadcrumbRoute.routeName}">
                            {{ breadcrumbRoute.label }}
                        </router-link>
                    </template>
                </li>
                <li v-if="i !== breadcrumbRoutes.length - 1" class="layout-breadcrumb-chevron">/</li>
            </template>
        </ol>
    </nav>
</template>
