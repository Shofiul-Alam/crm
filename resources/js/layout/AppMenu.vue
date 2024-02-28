<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                to: '/'
            },
        ]
    },
    { separator: true },
    {
        label: 'SALES',
        items: [
            {
                label: 'Products',
                icon: 'pi pi-fw pi-home',
                to: '/products'
            },
            {
                label: 'Add Product',
                icon: 'pi pi-fw pi-home',
                to: '/products/add-product'
            },
            {
                label: 'Orders',
                icon: 'pi pi-fw pi-home',
                to: '/orders'
            }
        ]
    },
    { separator: true },
    {
        label: 'REPORTS',
        items: [
            {
                label: 'Sales Summary',
                icon: 'pi pi-fw pi-home',
                to: '/products'
            },
            {
                label: 'Purchase Summary',
                icon: 'pi pi-fw pi-home',
                to: '/products'
            },
            {
                label: 'Stock Summary',
                icon: 'pi pi-fw pi-home',
                to: '/products'
            },
            {
                label: 'Free Summary',
                icon: 'pi pi-fw pi-home',
                to: '/products'
            },
            {
                label: 'Revenue Summary',
                icon: 'pi pi-fw pi-home',
                to: '/products'
            }
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <AppMenuItem v-if="!item.separator" :item="item" root :index="i" />

            <li v-else class="menu-separator"></li>
        </template>
    </ul>
</template>
