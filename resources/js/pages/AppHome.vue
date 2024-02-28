<template>
    <div class="layout-dashboard">
        <div class="grid">
            <div class="col-12 md:col-6 xl:col-3" v-for="(metric, index) in metrics" :key="index">
                <div
                    class="card shadow-1 flex flex-column"
                    :style="{
                        borderColor: metric.color_light,
                        borderLeft: '4px solid ' + metric.color_light
                    }"
                >
                    <div class="flex align-items-center">
                        <div class="flex justify-content-center align-items-center p-2 border-round" :style="{ backgroundColor: metric.color_light }">
                            <i :class="metric.icon" :style="{ color: metric.color_dark }"></i>
                        </div>
                        <span class="text-xl ml-2 font-semibold" :style="{ color: metric.color_light }">
                            {{ metric.title }}
                        </span>
                    </div>

                    <div class="grid mt-3">
                        <div class="col-6 flex flex-column p-3 text-center" v-for="(content, i) in metric.textContent" :key="i" :class="i === 0 ? 'border-right-1 surface-border' : ''">
                            <span class="text-color text-2xl font-semibold">{{ content.amount }}</span>
                            <span class="text-color font-semibold">{{ content.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 xl:col-6">
                <div class="card">
                    <div class="flex w-full justify-content-between align-items-center">
                        <h4>Orders</h4>
                        <Button type="button" severity="secondary" text @click="menu.toggle($event)"><i class="pi pi-search mr-2"></i> Show</Button>
                    </div>
                    <Menu ref="menu" :popup="true" :model="items"></Menu>

                    <div class="grid mt-3">
                        <div
                            class="col-6 md:col-3 relative transition-all transition-duration-300 hover:shadow-3 cursor-pointer h-5rem"
                            @click="changeDataset($event, 0)"
                            data-label="New Orders"
                            data-index="0"
                            data-fill="rgba(100, 181, 246, 0.2)"
                            data-stroke="#BBDEFB"
                        >
                            <span class="flex align-items-center"><i class="pi pi-plus-circle mr-1"></i> New</span>
                            <img :src="'/demo/images/dashboard/graph-new.svg'" class="absolute w-11" style="left: 5%; bottom: 0" />
                        </div>
                        <div
                            class="col-6 md:col-3 relative transition-all transition-duration-300 hover:shadow-3 cursor-pointer h-5rem"
                            @click="changeDataset($event, 1)"
                            data-label="Completed Orders"
                            data-index="1"
                            data-stroke="#C5CAE9"
                            data-fill="rgba(121, 134, 203, 0.2)"
                        >
                            <span class="flex align-items-center"><i class="pi pi-check-circle mr-1"></i> Completed</span>
                            <img :src="'/demo/images/dashboard/graph-completed.svg'" class="absolute w-11" style="left: 5%; bottom: 0" />
                        </div>
                        <div
                            class="col-6 md:col-3 relative transition-all transition-duration-300 hover:shadow-3 cursor-pointer h-5rem"
                            @click="changeDataset($event, 2)"
                            data-label="Refunded Orders"
                            data-index="2"
                            data-stroke="#B2DFDB"
                            data-fill="rgba(224, 242, 241, 0.5)"
                        >
                            <span class="flex align-items-center"><i class="pi pi-refresh mr-1"></i> Refunded</span>
                            <img src="/demo/images/dashboard/graph-refunded.svg" class="absolute w-11" style="left: 5%; bottom: 0" />
                        </div>
                        <div
                            class="col-6 md:col-3 relative transition-all transition-duration-300 hover:shadow-3 cursor-pointer h-5rem"
                            @click="changeDataset($event, 3)"
                            data-label="Cancelled Orders"
                            data-index="3"
                            data-stroke="#B2EBF2"
                            data-fill="rgba(224, 247, 250, 0.5)"
                        >
                            <span class="flex align-items-center"><i class="pi pi-times-circle mr-1"></i> Cancelled</span>
                            <img src="/demo/images/dashboard/graph-cancelled.svg" class="absolute w-11" style="left: 5%; bottom: 0" />
                        </div>
                        <div class="col-12 mt-5">
                            <Chart ref="chart" :height="340" type="line" :data="ordersChart" :options="ordersChartOptions" id="order-chart"></Chart>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 xl:col-6">
                <div class="card h-full">
                    <div class="flex justify-content-between">
                        <h4>Recent Sales</h4>
                        <Dropdown
                            v-model="selectedWeek"
                            :options="orderWeek"
                            option-label="name"
                            class="w-9rem"
                            :pt="{
                                input: { class: 'flex align-items-center' }
                            }"
                        />
                    </div>

                    <p>Your sales activity over time.</p>

                    <DataTable ref="salesTableRef" :value="products" dataKey="id" paginator :rows="5" class="datatable-responsive">
                        <template #empty> No products found.</template>

                        <Column field="name" header="ID" sortable :headerStyle="{ width: '10%', minWidth: '6rem' }">
                            <template #body="{ data }">
                                <span class="p-column-title">ID</span>
                                {{ data.id }}
                            </template>
                        </Column>
                        <Column field="category" header="Category" sortable :headerStyle="{ width: '30%', minWidth: '10rem' }">
                            <template #body="{ data }">
                                <span class="p-column-title">Category</span>
                                {{ data.category }}
                            </template>
                        </Column>
                        <Column field="price" header="Price" sortable :headerStyle="{ width: '20%', minWidth: '10rem' }">
                            <template #body="{ data }">
                                <span class="p-column-title">Price</span>
                                {{ formatCurrency(data.price) }}
                            </template>
                        </Column>
                        <Column field="inventoryStatus" header="Status" sortable :headerStyle="{ width: '30%', minWidth: '10rem' }">
                            <template #body="{ data }">
                                <span class="p-column-title">Status</span>
                                <Tag :severity="getBadgeSeverity(data.inventoryStatus)">{{ data.inventoryStatus }}</Tag>
                            </template>
                        </Column>
                        <Column :style="{ textAlign: 'center' }">
                            <template #body>
                                <Button type="button" icon="pi pi-search"></Button>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { ProductService } from '@/services/ProductService';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig } = useLayout();

const products = ref([]);
const menu = ref(null);

const orderWeek = ref([
    { name: 'This Week', code: '0' },
    { name: 'Last Week', code: '1' }
]);

const selectedWeek = ref(orderWeek.value[0]);

const ordersChart = ref(null);
const ordersChartOptions = ref(null);
const revenueChart = ref(null);
const revenueChartOptions = ref(null);
const salesTableRef = ref(null);

onMounted(() => {
    const productService = new ProductService();
    productService.getProductsSmall().then((data) => (products.value = data));

    setChartData();
});

watch(layoutConfig.colorScheme, () => {
    setChartData();
});

const setChartData = (setValue = true) => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    if (!setValue) return;

    ordersChart.value = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'New',
                data: [2, 7, 20, 9, 16, 9, 5],
                backgroundColor: ['rgba(100, 181, 246, 0.2)'],
                borderColor: ['#64B5F6'],
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }
        ]
    };
    ordersChartOptions.value = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: textColor
                }
            }
        },
        maintainAspectRatio: false,
        hover: {
            mode: 'index'
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary,
                    min: 0,
                    max: 20
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
    revenueChart.value = {
        labels: ['Direct', 'Promoted', 'Affiliate'],
        datasets: [
            {
                data: [40, 35, 25],
                backgroundColor: ['#64B5F6', '#7986CB', '#4DB6AC'],
                borderColor: surfaceBorder
            }
        ]
    };
    revenueChartOptions.value = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: textColor
                }
            }
        },
        maintainAspectRatio: false
    };
};

const dataSet = [
    [2, 7, 20, 9, 16, 9, 5],
    [2, 4, 9, 20, 16, 12, 20],
    [2, 17, 7, 15, 4, 20, 8],
    [2, 2, 20, 4, 17, 16, 20]
];

const changeDataset = (event, index) => {
    ordersChart.value.datasets[0].data = dataSet[index];
    ordersChart.value.datasets[0].label = event.currentTarget.getAttribute('data-label');
    ordersChart.value.datasets[0].borderColor = event.currentTarget.getAttribute('data-stroke');
    ordersChart.value.datasets[0].backgroundColor = event.currentTarget.getAttribute('data-fill');

    setChartData(false);
};

const items = ref([
    {
        label: 'Shipments',
        items: [
            { label: 'Tracker', icon: 'pi pi-compass' },
            { label: 'Map', icon: 'pi pi-map-marker' },
            { label: 'Manage', icon: 'pi pi-pencil' }
        ]
    }
]);

const metrics = ref([
    {
        title: 'Orders',
        icon: 'pi pi-shopping-cart',
        color_light: '#64B5F6',
        color_dark: '#1976D2',
        textContent: [
            { amount: '640', text: 'Pending' },
            { amount: '1420', text: 'Completed' }
        ]
    },
    {
        title: 'Revenue',
        icon: 'pi pi-dollar',
        color_light: '#7986CB',
        color_dark: '#303F9F',
        textContent: [
            { amount: '$2,100', text: 'Expenses' },
            { amount: '$9,640', text: 'Income' }
        ]
    },
    {
        title: 'Customers',
        icon: 'pi pi-users',
        color_light: '#4DB6AC',
        color_dark: '#00796B',
        textContent: [
            { amount: 8272, text: 'Active' },
            { amount: 25402, text: 'Registered' }
        ]
    },
    {
        title: 'Comments',
        icon: 'pi pi-users',
        color_light: '#4DD0E1',
        color_dark: '#0097A7',
        textContent: [
            { amount: 12, text: 'New' },
            { amount: 85, text: 'Responded' }
        ]
    }
]);

const teamMembers = ref([
    {
        name: 'Amy Elsner',
        desc: 'Accounting',
        image: 'amyelsner'
    },
    {
        name: 'Anna Fali',
        desc: 'Procurement',
        image: 'annafali'
    },
    {
        name: 'Bernardo Dominic',
        desc: 'Finance',
        image: 'bernardodominic'
    },
    {
        name: 'Ivan Magalhaes',
        desc: 'Sales',
        image: 'ivanmagalhaes'
    },
    {
        name: 'Xuxue Feng',
        desc: 'Management',
        image: 'xuxuefeng'
    }
]);

watch(
    layoutConfig.colorScheme,
    () => {
        setChartData();
    },
    { immediate: true }
);

watch(
    layoutConfig.theme,
    () => {
        setChartData();
    },
    { immediate: true }
);

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const getBadgeSeverity = (status) => {
    const stockStatus = {
        OUTOFSTOCK: 'danger',
        LOWSTOCK: 'warning',
        INSTOCK: 'success'
    };

    return stockStatus[status];
};
</script>
