import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import AppHome from "@/pages/AppHome.vue";

const routes: Array<RouteRecordRaw>  = [
    {
        path: '/',
        name: 'app-home',
        component: AppHome,
        meta:{
            title: 'Dashboard',
            breadcrumb: [
                {label: 'Dashboard', routeName: 'app-home'}, {label: 'Dashboard'}
            ]
        }
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});

