
<template>
    <div>
        <DataTable v-model:filters="filtersRef" :value="data" paginator showGridlines :rows="10" :dataKey="options.key"
                   filterDisplay="menu" :loading="loading" :globalFilterFields="globalFiltersRef" editMode="row"
                   v-model:editingRows="editingRows"
                   @row-edit-init="rowEditInt"
                   @row-edit-save="rowEditSave"
        >
            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filtersRef['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"
                    :showFilterMatchModes="col.showFilterMatchModes" :filterMenuStyle="col.filterMenuStyle" :filterField="col.field"
                    :bodyClass="col.classes" :bodyStyle="col.style" :pt="{headerContent: {class: col.headerClasses, style:col.headerStyles}}">
                <template #body="{ data }">
                    <template v-if="col.type==='date'">
                        {{ formatDate(resolveFieldData(data, col.field)) }}
                    </template>
                    <template v-else-if="col.type==='price'">
                        {{ formatCurrency(resolveFieldData(data, col.field)) }}
                    </template>
                    <template v-else-if="col.type==='status'">
                        <Tag :value="resolveFieldData(data, col.field)" :severity="getSeverity(data, col.field)" />
                    </template>
                    <template v-else-if="col.type==='boolean'">
                        <i class="pi" :class="{ 'pi-check-circle text-green-500 ': resolveFieldData(data, col.field), 'pi-times-circle text-red-500': !resolveFieldData(data, col.field) }"></i>
                    </template>
                    <template v-else>
                        <span>{{ resolveFieldData(data, col.field) }}</span>
                    </template>
                </template>
                <template #editor="{ data }">
                    <IconField v-if="col.type === 'text'">
                        <InputIcon class="pi pi-spin pi-spinner" v-if="col.loading"> </InputIcon>
                        <InputIcon class="pi pi-check-circle text-green-700" v-if="col.success"> </InputIcon>
                        <InputText :placeholder="col.header" :modelValue="resolveFieldData(data, col.field)" @update:modelValue="updateFieldData($event, data, col.field)" />
                    </IconField>
                    <IconField v-else-if="col.type === 'textarea'">
                        <InputIcon class="pi pi-spin pi-spinner" v-if="col.loading"> </InputIcon>
                        <InputIcon class="pi pi-check-circle text-green-700" v-if="col.success"> </InputIcon>
                        <Textarea placeholder="Text Area" autoResize rows="1" cols="30"
                                  :modelValue="resolveFieldData(data, col.field)" @update:modelValue="updateFieldData($event, data, col.field)"/>
                    </IconField>
                    <IconField v-else-if="col.type === 'autocomplete'">
                        <InputIcon :style="{right:'.3rem'}" class="pi pi-check-circle text-green-700 z-10" v-if="col.loading"> </InputIcon>
                        <InputIcon :style="{right:'.3rem'}" class="pi pi-spin pi-spinner z-10" v-if="col.loading"> </InputIcon>
                        <AutoComplete :inputStyle="{paddingRight:'1.5rem'}" optionLabel="name"
                                      :suggestions="options[col.field]?.autocompleteFilteredSuggestions||[]"
                                      @complete="autocomplete($event, col, data)"
                                      :modelValue="resolveFieldData(data, col.field)" @update:modelValue="updateFieldData($event, data, col.field)"/>
                    </IconField>
                    <IconField v-else-if="col.type === 'number'">
                        <InputIcon class="pi pi-spin pi-spinner" v-if="col.loading"> </InputIcon>
                        <InputIcon class="pi pi-check-circle text-green-700" v-if="col.success"> </InputIcon>
                        <InputNumber showButtons  input-class="text-right"
                                     :modelValue="resolveFieldData(data, col.field)" @update:modelValue="updateFieldData($event, data, col.field)"/>
                    </IconField>
                    <IconField v-else-if="col.type === 'decimal'">
                        <InputIcon class="pi pi-spin pi-spinner" v-if="col.loading"> </InputIcon>
                        <InputIcon class="pi pi-check-circle text-green-700" v-if="col.success"> </InputIcon>
                        <InputNumber  :minFractionDigits="2" :maxFractionDigits="5"  input-class="text-right"
                                      :modelValue="resolveFieldData(data, col.field)" @update:modelValue="updateFieldData($event, data, col.field)"/>
                    </IconField>
                    <IconField v-else-if="col.type === 'price'">
                        <InputIcon class="pi pi-spin pi-spinner" v-if="col.loading"> </InputIcon>
                        <InputIcon class="pi pi-check-circle text-green-700" v-if="col.success"> </InputIcon>
                        <InputNumber  mode="currency" currency="BDT" locale="en-AU" input-class="text-right"
                                      :modelValue="resolveFieldData(data, col.field)" @update:modelValue="updateFieldData($event, data, col.field)"/>
                    </IconField>
                    <IconField v-else-if="col.type === 'date'">
                        <InputIcon class="pi pi-spin pi-spinner" v-if="col.loading"> </InputIcon>
                        <InputIcon class="pi pi-check-circle text-green-700" v-if="col.success"> </InputIcon>
                        <Calendar showIcon iconDisplay="input"
                                  :modelValue="resolveFieldData(data, col.field)" @update:modelValue="updateFieldData($event, data, col.field)"/>
                    </IconField>
                    <IconField v-else-if="col.type === 'dropdown'">
                        <InputIcon :style="{right:'.3rem'}" class="pi pi-check-circle text-green-700 z-10" v-if="col.success" > </InputIcon>
                        <InputIcon :style="{right:'.3rem'}" class="pi pi-spin pi-spinner z-10" v-if="col.loading"> </InputIcon>
                        <Dropdown  :style="col.success||col.loading?{paddingRight:'1.5rem'}:''" :options="options[col.field].dropdownOptions"
                                    optionLabel="name"
                                   :placeholder="col.placeholder" checkmark :highlightOnSelect="false" class="w-full"
                                    :modelValue="resolveFieldData(data, col.modelField)" @update:modelValue="updateFieldData($event, data, col.modelField)"
                        />
                    </IconField>
                    <a v-else-if="col.type === 'link'" :href="data[col.field]" target="_blank" rel="noopener noreferrer"> {{ data[col.field] }} </a>
                    <div v-else-if="col.type==='status'">
                         <span class=" flex relative align-items-center w-8rem cursor-pointer ">
                            <Dropdown :options="options.status?.statusList||[]"
                                      optionLabel="label" optionValue="value" placeholder="Select a Status"
                                      :modelValue="resolveFieldData(data, col.field)" @update:modelValue="updateFieldData($event, data, col.field)">
                                <template #option="slotProps">
                                    <Tag :value="slotProps.option.value" :severity="slotProps.option.severity" />
                                </template>
                            </Dropdown>
                            <InputIcon class="pi pi-spin pi-spinner absolute" v-if="false"> </InputIcon>
                            <InputIcon class="pi pi-check-circle absolute" style="left:2px" v-if="false"> </InputIcon>
                        </span>
                    </div>
                    <template v-else-if="col.type==='boolean'">
                        <i class="pi" :class="{ 'pi-check-circle text-green-500 ': resolveFieldData(data, col.field), 'pi-times-circle text-red-500': !resolveFieldData(data, col.field) }"></i>
                    </template>
                    <div v-else>
                        {{ data[col.field] }}
                    </div>

                    <!-- image -->
                </template>
                <template v-if="col.filterable" #filter="{ filterModel }">
                    <InputText v-if="col.filterType==='CONTAINS'" v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search contain" />
                    <InputText v-if="col.filterType==='STARTS_WITH'" v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search start with" />
                    <MultiSelect v-if="col.filterType==='IN'" @change="multiselected"
                        v-model="filterModel.value" :options="options[col.field]?.dropdownOptions||[]" optionLabel="name" optionValue="value" placeholder="Any" class="p-column-filter">
                        <template #option="slotProps">
                            <div class="flex align-items-center gap-2">
                                <span>{{ slotProps.option.name }}</span>
                            </div>
                        </template>
                    </MultiSelect>
                    <Calendar v-if="col.filterType==='DATE_IS'" v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
                    <InputNumber v-if="col.type==='price'&&col.filterType==='EQUALS'" v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                    <Dropdown v-if="col.filterType==='DROPDOWN_EQUALS'" v-model="filterModel.value"
                              :options="options[col.field]?.dropdownOptions||[]" placeholder="Select One" class="p-column-filter" showClear>
                        <template #option="slotProps">
                            <div class="flex align-items-center gap-2">
                                <span>{{ slotProps.option.name }}</span>
                            </div>
                        </template>
                    </Dropdown>
                    <div v-if="col.filterType==='BETWEEN'">
                        <Slider v-model="filterModel.value" range class="m-3"></Slider>
                        <div class="flex align-items-center justify-content-between px-2">
                            <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                            <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
                        </div>
                    </div>
                    <div v-if="col.filterType==='TRISTATE'">
                        <label for="verified-filter" class="font-bold"> {{col.header}} </label>
                        <TriStateCheckbox v-model="filterModel.value" inputId="verified-filter" />
                    </div>
                </template>
            </Column>
            <Column header="Edit" :rowEditor="true" style="width: 80px; min-width: 80px" bodyStyle="text-align:center"
                    :pt="{headerContent: {style:'justify-content:center'}}">
                <template #roweditoriniticon>
                    <ActionButton :icon="'pi pi-pencil'" :severity="'info'" :outlined="true" :aria-label="'Edit'" :style="'color: var(--cyan-400)'"/>
                </template>
                <template #roweditorsaveicon>
                    <ActionButton :icon="'pi pi-save'" :outlined="true" :severity="'success'" aria-label="Save" :style="'color: var(--green-400)'"/>
                </template>
                <template #roweditorcancelicon>
                    <ActionButton :icon="'pi pi-times'" :outlined="true" :severity="'success'" aria-label="Save" :style="'color: var(--green-400)'"/>
                </template>
            </Column>
            <Column header="Delete" style="width: 30px; min-width: 30px" bodyStyle="text-align:center"
                    :pt="{headerContent: {style:'justify-content:center'}}">
                <template #body="{ data }">
                    <ActionButton :icon="'pi pi-trash'" :severity="'danger'" :outlined="true" :aria-label="'Delete'" :style="'color: var(--red-400)'"/>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import {ColumnType} from "@/share/types";
import {Prop, PropType, ref} from "vue";
import {ObjectUtils} from "primevue/utils";
import {DatatableOptions} from "./Types";
import {DataTableFilterMeta} from "primevue/datatable";
import {ParseDateToString} from "../../share/utils/DateTimeUtils";
import {setFieldData} from "../../share/utils/ObjectUtility";

const emit = defineEmits(['autocomplete-call']);
const props = defineProps({
    filters: {
        type: Object as PropType<DataTableFilterMeta>,
    },
    globalFilters:{
      type: Array as PropType<Array<string>>,
      default: []
    },
    data: {
        type: Array,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    },
    model: {
        type: Object,
    },
    columns: {
        type: Array as PropType<ColumnType[]>,
        required: true
    },
    options: {
        type: Object as PropType<DatatableOptions>,
        default:{} as any
    }
});
let filtersRef = ref<DataTableFilterMeta>();
let globalFiltersRef = ref<Array<string>>();
const editingRows = ref([]);

const initFilter= () => {
    filtersRef.value = _.cloneDeep(props.filters);
    globalFiltersRef.value = _.cloneDeep(props.globalFilters);
}
const clearFilter = () => {
    initFilter();
}
initFilter();

const formatDate = (value) => {
        return ParseDateToString(value, 'dd/MM/yyyy');
    };
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'BDT' });
};

const formatNumber = (value) => {

}

const autocomplete = (event, column:ColumnType, data) => {
    if(column.autocompleteApi){
        return emit('autocomplete-call', {event, column, data});
    }
    setTimeout(() => {
        if (!event.query.trim().length) {
            props.options[column.field].autocompleteFilteredSuggestions = [...(props.options[column.field]?.autocompleteSuggestions || [])];
        } else {
            props.options[column.field].autocompleteFilteredSuggestions = props.options[column.field].autocompleteSuggestions?.filter((suggestion) => {
                return suggestion.name.toLowerCase().startsWith(event.query.toLowerCase());
            })||[];
        }
    }, 250);
}
const resolveFieldData = (data, field) => {
   return ObjectUtils.resolveFieldData(data, field);
}

const getSeverity = (data, field) => {
    return props.options[field]?.statusList?.find((status) => status.value === data[field])?.severity || null;
}
const multiselected = (event) => {

}
const rowEditInt = (event) => {

}
const rowEditSave = (event) => {

}

const updateFieldData = (event, data, field) => {
    setFieldData(data, field, event);
}
</script>
