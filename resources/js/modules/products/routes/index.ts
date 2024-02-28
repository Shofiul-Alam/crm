import { RouteRecordRaw } from 'vue-router'
export const routes: Array<RouteRecordRaw>  = [
    {
        path: 'products',
        name: 'products',
        component: () => import("../pages/Products.vue"),
        meta:{
            title: 'Products',
            breadcrumb: [
                {label: 'Dashboard', routeName: 'app-home'}, {label: 'Products'}
            ]
        }
    },
    {
        path: 'products/view/:id',
        name: 'product-details',
        component: () => import("../pages/ProductDetails.vue"),
        meta:{
            title: 'Product Details',
            breadcrumb: [
                {label: 'Dashboard', routeName: 'app-home'},
                {label: 'Products', routeName: 'products'},
                {label: 'Product Details'}
            ]
        }
    },
    {
        path: 'products/add-product',
        name: 'product-add',
        component: () => import("../pages/AddProduct.vue"),
        meta:{
            title: 'Add Product',
            breadcrumb: [
                {label: 'Dashboard', routeName: 'app-home'},
                {label: 'Products', routeName: 'products'},
                {label: 'Add Product'}
            ]
        }
    }
];
