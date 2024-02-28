import {createApp, defineAsyncComponent} from 'vue'
import router from './router'
import { ModuleManager } from '@/share/types';
import('@/assets/styles.scss');

import moduleManager from '@/plugins/modules';
import AppStateService from './services/AppStateService';
import OrdersModule from '@/modules/orders';
import ProductsModule from '@/modules/products';

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Ripple from 'primevue/ripple';
import BadgeDirective from 'primevue/badgedirective';
import StyleClass from 'primevue/styleclass';
import Toast from 'primevue/toast';
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import ActionButton from "@/Components/Inputs/ActionButton.vue";
import InputSwitch from "primevue/InputSwitch";
import RadioButton from "primevue/RadioButton";
import Checkbox from "primevue/Checkbox";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";
import Column from "primevue/column";
import MultiSelect from "primevue/multiselect";
import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import Tag from "primevue/tag";
import ProgressBar from "primevue/progressbar";
import Slider from "primevue/slider";
import TriStateCheckbox from "primevue/tristatecheckbox";
import Chip from "primevue/chip";
import Divider from "primevue/divider";
import Fieldset from "primevue/fieldset";
import AutoComplete from "primevue/autocomplete";
import Tooltip from 'primevue/tooltip';
import Card from "primevue/card";
import SplitButton from "primevue/splitbutton";


const DataTable = defineAsyncComponent(() => import("primevue/datatable")) ;
const Editor = defineAsyncComponent(() => import("primevue/editor"));
const FileUpload = defineAsyncComponent(() => import("primevue/fileupload"));
const Dialog = defineAsyncComponent(() => import("primevue/dialog"));
const Sidebar = defineAsyncComponent(() => import("primevue/sidebar"));
const OverlayPanel = defineAsyncComponent(() => import("primevue/overlaypanel"));
const Menu = defineAsyncComponent(() => import("primevue/menu"));
const Chart = defineAsyncComponent(() => import("primevue/chart"));
const DatatableCrudWithFilters = defineAsyncComponent(() => import("@/Components/Datatable/DatatableCrudWithFilters.vue"));


const app = createApp({});
app.use(moduleManager, {
    modules: [
        OrdersModule,
        ProductsModule
    ],
    services: [

    ],
    router
} as ModuleManager);
app.use(AppStateService);
app.use(PrimeVue, { ripple: true });
app.use(ConfirmationService);
app.use(ToastService);
app.use(router);

app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.directive('badge', BadgeDirective);
app.directive('styleclass', StyleClass);

app.component('Toast', Toast);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('Button', Button);
app.component('ActionButton', ActionButton);
app.component('InputSwitch', InputSwitch);
app.component('RadioButton', RadioButton);
app.component('Checkbox', Checkbox);
app.component('Dialog', Dialog);
app.component('Sidebar', Sidebar);
app.component('InputIcon', InputIcon);
app.component('IconField', IconField);
app.component('Column', Column);
app.component('MultiSelect', MultiSelect);
app.component('Calendar', Calendar);
app.component('InputNumber', InputNumber);
app.component('Tag', Tag);
app.component('ProgressBar', ProgressBar);
app.component('Slider', Slider);
app.component('TriStateCheckbox', TriStateCheckbox);
app.component('DataTable', DataTable);
app.component('Editor', Editor);
app.component('FileUpload', FileUpload);
app.component('Chip', Chip);
app.component('Divider', Divider);
app.component('Fieldset', Fieldset);
app.component('AutoComplete', AutoComplete);
app.component('OverlayPanel', OverlayPanel);
app.component('Card', Card);
app.component('Menu', Menu);
app.component('Chart', Chart);
app.component('Textarea', Textarea);
app.component('SplitButton', SplitButton);
app.component('DatatableCrudWithFilters', DatatableCrudWithFilters);




const layouts = import.meta.glob("./layout/**/*.vue");

Object.entries(layouts).forEach(([path, definition]) => {
    const componentName = path.split('/').pop().replace(/\.\w+$/, '');
    app.component(componentName, defineAsyncComponent(definition));
});

app.mount('#app');
