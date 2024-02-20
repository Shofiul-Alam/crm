import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import AppHome from "@/pages/AppHome.vue";

const routes: Array<RouteRecordRaw>  = [
    {
        path: '/',
        name: 'app-home',
        component: AppHome
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});

