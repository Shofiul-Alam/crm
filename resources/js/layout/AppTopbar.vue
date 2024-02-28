<template>
    <div class="layout-topbar">
        <div class="topbar-left">
            <a v-ripple="{
                    pt: {
                        root: { style: 'background: rgba(0,0,0, 0.3); transition: background-color 3s;' }
                    }
                }"
                class="menu-button p-trigger p-ripple  cursor-pointer" tabindex="0" @click="onMenuToggle">
                <i class="pi pi-chevron-left"></i>
            </a>
            <AppSearch />
            <img class="horizontal-logo" src="/layout/images/logo-white.svg" alt="diamond-layout" />
            <img class="mobile-logo" :src="'/layout/images/logo-' + logo + '.svg'" alt="diamond-layout" />
        </div>

        <div class="layout-topbar-menu-section">
            <AppSidebar ref="sidebarRef"></AppSidebar>
        </div>
        <div class="layout-mask modal-in"></div>

        <div class="topbar-right">
            <ul class="topbar-menu">
                <li class="static sm:relative">
                    <a tabindex="0" v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', leaveActiveClass: 'fadeout', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                        <i class="pi pi-bell"></i>
                        <span class="topbar-badge">5</span>
                    </a>
                    <ul class="list-none p-3 m-0 border-round shadow-2 absolute surface-overlay hidden origin-top w-full sm:w-19rem mt-2 right-0 z-5 top-auto">
                        <li>
                            <a class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-shopping-cart mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">New Order</span>
                                    <span class="text-color-secondary">You have <strong>3</strong> new orders.</span>
                                </span>
                            </a>
                            <a v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-check-square mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Withdrawn Completed</span>
                                    <span class="text-color-secondary">Funds are on their way.</span>
                                </span>
                            </a>
                            <a v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-chart-line mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Monthly Reports</span>
                                    <span class="text-color-secondary">Monthly Reports are ready.</span>
                                </span>
                            </a>
                            <a v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-comments mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Comments</span>
                                    <span class="text-color-secondary"><strong>2</strong> new comments.</span>
                                </span>
                            </a>
                            <a v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-exclamation-circle mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Chargeback Request</span>
                                    <span class="text-color-secondary"><strong>1</strong> to review.</span>
                                </span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="static sm:relative">
                    <a tabindex="0"  @click="toggle"
                       v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', leaveActiveClass: 'fadeout', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                        <i class="pi pi-plus-circle" style="font-size:23px"></i>
                    </a>
                    <ul class="list-none p-3 m-0 border-round shadow-2 absolute surface-overlay hidden origin-top w-full sm:w-19rem mt-2 right-0 z-5 top-auto">
                        <OverlayPanel ref="op">
                            <div class="flex flex-column gap-3 w-25rem p-3">
                                <p style="font-size: 1.5rem">Create Order</p>
                                <Dropdown v-model="selectedCountry" :options="countries" filter optionLabel="name" placeholder="Select a Customer" class="w-full" />
                                <Calendar v-model="newOrder.date" showIcon iconDisplay="input" inputId="icondisplay" placeholder="Order Date" date-format="D d/m/y" />
                                <Button type="button" label="Create Order" class="w-full" />
                            </div>
                        </OverlayPanel>
                    </ul>
                </li>
                <li class="profile-item static sm:relative">
                    <a tabindex="0" v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', leaveActiveClass: 'fadeout', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                        <img src="/layout/images/profile.jpg" alt="diamond-layout" class="profile-image" />
                        <span class="profile-name">Amelia Stone</span>
                    </a>
                    <ul class="list-none p-3 m-0 border-round shadow-2 absolute surface-overlay hidden origin-top w-full sm:w-12rem mt-2 right-0 z-5 top-auto">
                        <li>
                            <a v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-user mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Profile</span>
                                </span>
                            </a>
                            <a v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-cog mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Settings</span>
                                </span>
                            </a>
                            <a v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-calendar mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Calendar</span>
                                </span>
                            </a>
                            <a v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-inbox mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Inbox</span>
                                </span>
                            </a>
                            <a v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-power-off mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Logout</span>
                                </span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import AppSidebar from '@/layout/AppSidebar.vue';
import { usePrimeVue } from 'primevue/config';
import {NowAsDateObject} from "@/share/utils/DateTimeUtils.ts";

const $primevue = usePrimeVue();

defineExpose({
    $primevue
});

const { onMenuToggle, showRightMenu, toggleSearchBar, layoutConfig } = useLayout();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const sidebarRef = ref(null);
const selectedCountry = ref(null);
const op = ref();
const newOrder = ref({
    date: NowAsDateObject()
});
const countries = ref(
[
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);

const logo = computed(() => {
    return layoutConfig.colorScheme.value === 'dark' ? 'white' : 'dark';
});
const toggle = (event) => {
   op.value.toggle(event);
}

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>
