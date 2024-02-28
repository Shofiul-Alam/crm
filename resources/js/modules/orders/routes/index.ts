import { RouteRecordRaw } from 'vue-router'
export const routes: Array<RouteRecordRaw>  = [
    {
        path: 'orders',
        name: 'orders',
        component: () => import("../pages/Orders.vue"),
        meta:{
            title: 'Orders',
            breadcrumb: [
                {label: 'Dashboard', routeName: 'app-home'}, {label: 'Orders'}
            ]
        }
    },
    {
        path: 'orders/view/:id',
        name: 'order-details',
        component: () => import("../pages/OrderDetails.vue"),
        meta:{
            title: 'Order Details',
            breadcrumb: [
                {label: 'Dashboard', routeName: 'app-home'},
                {label: 'Orders', routeName: 'orders'},
                {label: 'Order Details'}
            ]
        }
    },
    {
        path: 'orders/view/:id/invoice',
        name: 'order-invoice',
        component: () => import("../pages/Invoice.vue"),
        meta:{
            title: 'Invoice',
            breadcrumb: [
                {label: 'Dashboard', routeName: 'app-home'},
                {label: 'Orders', routeName: 'orders'},
                {label: 'Order Details', routeName: 'order-details', params: {id: ':id'}},
                {label: 'Invoice'}
            ]
        }
    }
];
