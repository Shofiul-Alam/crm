import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw>  = [
    {
        path: '/',
        name: 'app-home',
        component: () => import("@/pages/Dashboard.vue"),
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

