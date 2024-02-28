<template>
    <div class="card">
        <div class=" flex pb-3">
            <Button class="mr-5" type="button" icon="pi pi-plus" label="Add New Order" @click="toggle" />

            <OverlayPanel ref="op">
                <div class="flex flex-column gap-3 w-25rem p-3">
                    <p style="font-size: 1.5rem">Create Order</p>
                    <Dropdown v-model="selectedCountry" :options="countries" filter optionLabel="name" placeholder="Select a Customer" class="w-full" />
                    <Calendar v-model="newOrder.date" showIcon iconDisplay="input" inputId="icondisplay" placeholder="Order Date" date-format="D d/m/y" />
                    <Button type="button" label="Create Order" class="w-full" />
                </div>
            </OverlayPanel>
        </div>
        <DatatableCrudWithFilters
            :filters="filters"
            :data="customers"
            :loading="loading"
            :columns="columns"
            :options="datatableOptions"
            :globalFilters="globalFilters"/>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import { CustomerService } from '../services/CustomerService';
import {NowAsDateObject} from "@/share/utils/DateTimeUtils.ts";
import {DataTableFilterMeta} from "primevue/datatable";
import {DatatableOptions} from "../../../Components/Datatable/Types";
import {ColumnType} from "../../../share/types";
import {OrderDatatableFilters, OrderGlobalFilters} from "../constants/OrderDatatableFilters";
import {OrderFields} from "../constants/OrderFields";
import {OrderDatatableOptions} from "../constants/OrderDatatableOptions";

let filters = ref<DataTableFilterMeta>(OrderDatatableFilters);
let globalFilters = ref<Array<string>>(OrderGlobalFilters);
let datatableOptions = ref<DatatableOptions>(OrderDatatableOptions);
let columns = ref<Array<ColumnType>>(OrderFields);
let customers = ref();
let countries = ref([
    {name: 'USA', code: 'US'},
    {name: 'Germany', code: 'DE'},
    {name: 'Japan', code: 'JP'},
    {name: 'Italy', code: 'IT'},
    {name: 'Greece', code: 'GR'},
    {name: 'Canada', code: 'CA'},
    {name: 'China', code: 'CN'}
]);
let loading = ref<boolean>(false);
let selectedCountry = ref(null);
let op = ref();

let newOrder = ref({
    date: NowAsDateObject()
});

const clearFilter = () => {
    filters.value = OrderDatatableFilters;
};

const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
        d.date = new Date(d.date);
        return d;
    });
};
const toggle = (event) => {
    op.value.toggle(event);
}

onMounted(() => {
    loading.value = true;
    CustomerService.getCustomersMedium().then((data) => {
        customers.value = getCustomers(data);
        loading.value = false;
    });
});

</script>

<style lang="scss">
.p-tag .p-menuitem-content a.p-menuitem-link {
    padding: 0.1rem;
}
.p-tieredmenu{

}
</style>
