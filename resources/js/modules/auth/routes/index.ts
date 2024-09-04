import { RouteRecordRaw } from 'vue-router'
export const routes: Array<RouteRecordRaw>  = [
    {
        path: 'login',
        name: 'login',
        component: () => import("../pages/Login.vue"),
        meta:{
            title: 'Login',
            breadcrumb: [
                {label: 'Login', routeName: 'login'}, {label: 'Login'}
            ]
        }
    },
    {
        path: 'register',
        name: 'register',
        component: () => import("../pages/Register.vue"),
        meta:{
            title: 'Register',
            breadcrumb: [
                {label: 'Register', routeName: 'register'}, {label: 'Register'}
            ]
        }
    },
    {
        path: 'password/reset',
        name: 'reset-password-request',
        component: () => import("../pages/ForgotPassword.vue"),
        meta:{
            title: 'Reset Password',
            breadcrumb: [
                {label: 'Reset Password', routeName: 'reset-password-request'}, {label: 'Reset Password'}
            ]
        }
    },
    {
        path: 'password/reset/:token',
        name: 'reset-password-form',
        component: () => import("../pages/NewPassword.vue"),
        meta:{
            title: 'Reset Password',
            breadcrumb: [
                {label: 'Reset Password', routeName: 'reset-password-form'}, {label: 'Reset Password'}
            ]
        }
    }
];
