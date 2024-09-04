import { RouteRecordRaw } from 'vue-router'
export const routes: Array<RouteRecordRaw>  = [
    {
        path: 'empty',
        name: 'empty',
        component: () => import("../pages/EmptyIndex.vue"),
        meta:{
            title: 'Orders',
            breadcrumb: [
                {label: 'Dashboard', routeName: 'app-home'}, {label: 'Orders'}
            ]
        }
    },
    {
        path: 'empty/view/:id',
        name: 'empty-details',
        component: () => import("../pages/EmptyDetails.vue"),
        meta:{
            title: 'Order Details',
            breadcrumb: [
                {label: 'Dashboard', routeName: 'app-home'},
                {label: 'Orders', routeName: 'orders'},
                {label: 'Order Details'}
            ]
        }
    }
];
