<template>
    <div class="border-1 surface-border border-round md:p-5 pt-4">
        <div class="grid grid-nogutter flex-wrap gap-4 p-fluid">
            <div class="col-12 lg:col-9">
                <Fieldset legend="Order Details" :toggleable="true">
                    <div class="flex align-items-center justify-content-end pb-4">
                        <Button icon="pi pi-pencil" severity="info" outlined aria-label="Filter" style="width:25px; height: 25px; border:1px solid var(--surface-200); color: var(--cyan-400)"/>
                    </div>
                    <div class="grid formgrid">
                        <div class="col-12 lg:col-4 field">
                            <InputText type="text" placeholder="Order Reference" v-model="product.name" />
                        </div>
                        <div class="col-12 lg:col-4 field">
                            <Dropdown v-model="selectedCountry" :options="countries" filter optionLabel="name" placeholder="Select a Customer" class="w-full" />
                        </div>
                        <div class="col-12 lg:col-4 field">
                            <Calendar v-model="product.code" showIcon iconDisplay="input" inputId="icondisplay" placeholder="Order Date" />
                        </div>
                        <div class="col-12 field">
                            <InputText type="text" placeholder="Order Description" v-model="product.name" />
                        </div>
                    </div>
                </Fieldset>
            </div>
            <div class="flex-1 w-full lg:w-3 xl:w-4 flex flex-column row-gap-3" style="margin-top: 23px;">
                <div class="border-1 surface-border border-round h-full">
                    <div class="flex align-items-center justify-content-between border-bottom-1 surface-border">
                        <span class="text-900 font-bold block  p-3">Order Summery</span>
                        <ActionButton :icon="'pi pi-pencil'"
                                      :success="s.success"
                                      :loading="s.loading"
                                      :severity="'info'"
                                      :outlined="true"
                                      :aria-label="'Edit'"
                                      :error="s.error"
                                      class="mr-3"
                                      @click="clickButton"/>
                    </div>
                    <div class="p-3">
                        <div class="py-2 px-3 flex align-items-center border-round">

                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full card">
                <h6>Order Items</h6>
                <AutoComplete class="mb-4" v-model="value" :suggestions="items" @complete="search" placeholder="Search Item and Add to Order"/>
                <DataTable  :value="products" showGridlines  dataKey="id" :loading="loading" >
                    <template #empty> No item added yet. </template>
                    <template #loading> Loading items data. Please wait. </template>
                    <Column header="#" headerStyle="width:3rem">
                        <template #body="slotProps">
                            {{ slotProps.index + 1 }}
                        </template>
                    </Column>
                    <Column field="name" header="Product" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                    </Column>
                    <Column class="text-right" filterField="balance" dataType="numeric" style="min-width: 8rem">
                        <template #header>
                            <span class="w-full text-right">Unit Price</span>
                        </template>
                        <template #body="{ data }">
                            <InputNumber v-model="data.balance" inputId="currency-us" mode="currency" currency="BDT" locale="en-AU" input-class="text-right" />
                        </template>
                    </Column>
                    <Column class="text-center" field="quantity" :showFilterMatchModes="false" style="min-width: 6rem">
                        <template #header>
                            <div class="w-full flex justify-center">
                                <span>Quantity</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex justify-center">
                                <div style="width:100px">
                                    <InputNumber :inputStyle="{padding:'.2rem .9rem'}" v-model="qty" showButtons  style="width: 100px" :min="0" :max="99"/>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column class="text-center" field="return" :showFilterMatchModes="false" style="min-width: 6rem">
                        <template #header>
                            <div class="w-full flex justify-center">
                                <span>Returned</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex justify-center">
                                <div style="width:100px">
                                    <InputNumber :inputStyle="{padding:'.2rem .9rem'}" v-model="qty" showButtons  style="width: 100px" :min="0" :max="99"/>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column class="text-center" field="quantity" :showFilterMatchModes="false" style="min-width: 6rem">
                        <template #header>
                            <div class="w-full flex justify-center">
                                <span>Delivered</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex justify-center">
                                <div style="width:100px">
                                    <InputNumber :inputStyle="{padding:'.2rem .9rem'}" v-model="qty" showButtons  style="width: 100px" :min="0" :max="99"/>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column class="text-right" filterField="balance" dataType="numeric" style="min-width: 7rem"
                            header-class="bg-green-200" body-class="bg-green-200">
                        <template #header>
                            <span class="w-full text-right">Item Total</span>
                        </template>
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                    </Column>
                    <Column class="text-right" filterField="discount" dataType="numeric" style="min-width: 8rem">
                        <template #header>
                            <span class="w-full text-right">Com. Given</span>
                        </template>
                        <template #body="{ data }">
                            <InputNumber input-class="text-right" mode="currency" :modelValue="10000" currency="BDT" locale="en-AU"/>
                        </template>
                    </Column>
                    <Column class="text-right" filterField="discount" dataType="numeric" style="min-width: 8rem">
                        <template #header>
                            <span class="w-full text-right">Com. Taken</span>
                        </template>
                        <template #body="{ data }">
                            <InputNumber input-class="text-right" mode="currency" :modelValue="10000" currency="BDT" locale="en-AU"/>
                        </template>
                    </Column>
                    <Column class="text-center" field="return" :showFilterMatchModes="false" style="min-width: 6rem">
                        <template #header>
                            <div class="w-full flex justify-center">
                                <span>Damaged</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex justify-center">
                                <div style="width:100px">
                                    <InputNumber :inputStyle="{padding:'.2rem .9rem'}" v-model="qty" showButtons  style="width: 100px" :min="0" :max="99"/>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column class="text-right" filterField="balance" dataType="numeric" style="min-width: 7rem">
                        <template #header>
                            <span class="w-full text-right">Buy Price</span>
                        </template>
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                    </Column>
                    <Column class="text-right" filterField="balance" dataType="numeric" style="min-width: 7rem"
                            header-class="bg-blue-200" body-class="bg-blue-200">
                        <template #header>
                            <span class="w-full text-right">Profit</span>
                        </template>
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                    </Column>
                    <Column field="verified" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">
                        <template #header>
                            <div class="w-full flex justify-center">
                                <span>Actions</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex gap-1 justify-center">
                                <ActionButton :icon="'pi pi-save'" :outlined="true" :severity="'success'" aria-label="Save" :style="'color: var(--green-400)'"/>
                                <ActionButton :icon="'pi pi-pencil'" :severity="'info'" :outlined="true" :aria-label="'Edit'" :style="'color: var(--cyan-400)'"/>
                                <ActionButton :icon="'pi pi-trash'" :severity="'danger'" :outlined="true" :aria-label="'Edit'" :style="'color: var(--red-400)'"/>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {CustomerService} from "@/modules/orders/services/CustomerService.ts";
import ActionButton from "../../../Components/Inputs/ActionButton.vue";

const colorOptions = ref([
    { name: 'Black', background: 'bg-gray-900' },
    { name: 'Orange', background: 'bg-orange-500' },
    { name: 'Navy', background: 'bg-blue-500' }
]);
const product = ref({
    name: '',
    price: '',
    code: '',
    sku: '',
    status: 'Draft',
    tags: ['Nike', 'Sneaker'],
    category: 'Sneakers',
    colors: [],
    stock: 'Sneakers',
    inStock: true,
    description: '',
    images: []
});
const countries = ref([
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
const selectedCountry = ref();
const selectedCategory = ref(null);
const selectedStock = ref(null);
const categoryOptions = ['Sneakers', 'Apparel', 'Socks'];
const fileUploaderRef = ref(null);
const uploadFiles = ref([]);
const value = ref("");
const items = ref([]);
const products = ref([]);
const loading = ref(true);
const qty = ref(0);
const s = ref({});

const search = (event) => {
    items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
}

const onChooseUploadFiles = () => {
    fileUploaderRef.value.choose();
};
const onSelectedFiles = (event) => {
    uploadFiles.value = event.files;
};
const onRemoveFile = (removeFile) => {
    uploadFiles.value = uploadFiles.value.filter((file) => file.name !== removeFile.name);
};

const toggleColor = (color) => {
    const index = product.value.colors.indexOf(color);
    if (index > -1) {
        product.value.colors.splice(index, 1);
    } else {
        product.value.colors.push(color);
    }
};
const onRemoveTags = (tag) => {
    product.value.tags = product.value.tags.filter((t) => t !== tag);
};
const getProducts = (data) => {
    return [...(data || [])].map((d) => {
        d.date = new Date(d.date);
        return d;
    });
}
const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}
const formatCurrency = (value) => {
    if(!value) return;
    return value.toLocaleString('en-US', { style: 'currency', currency: 'BDT' });
}
CustomerService.getCustomersSmall().then((data) => {
    products.value = getProducts(data);
    loading.value = false;
});

const clickButton = () => {
    s.value.error = '';
    s.value.loading = true;
    setTimeout(() => {
        s.value.success = true;
        s.value.loading = false;
        // s.value.error = "There is an error";
        setTimeout(() => {
            s.value.success = false;
        }, 2000)
    }, 2000)

}
</script>

<style scoped lang="scss">
.remove-file-wrapper:hover {
    .remove-button {
        display: flex !important;
    }
}
</style>
