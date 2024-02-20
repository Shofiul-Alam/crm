import { RouteRecordRaw } from 'vue-router'

import ExampleOnePage from '../pages/ExampleOnePage.vue'
import ExampleTwoPage from '../pages/ExampleTwoPage.vue'
export const routes: Array<RouteRecordRaw>  = [
    {
        path: 'fone',
        name: 'foo-one',
        component: ExampleOnePage,
    },
    {
        path: 'ftwo',
        name: 'foo-two',
        component: ExampleTwoPage,
    },
];
