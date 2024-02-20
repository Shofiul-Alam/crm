// import './bootstrap';
// import './style.css'
import {createApp, defineAsyncComponent} from 'vue'
import router from './router'
import { ModuleManager } from '@/share/types';
import moduleManager from '@/plugins/modules';
import AppStateService from './services/AppStateService';

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import Ripple from 'primevue/ripple';
import BadgeDirective from 'primevue/badgedirective';
import StyleClass from 'primevue/styleclass';
import Toast from 'primevue/toast';
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import InputSwitch from "primevue/InputSwitch";
import RadioButton from "primevue/RadioButton";
import Checkbox from "primevue/Checkbox";
import Dialog from "primevue/dialog";
import Sidebar from "primevue/sidebar";
import '@/assets/preloading.scss';
import '@/assets/styles.scss';
import '@/assets/theme/theme-light/blue/theme.scss';


const app = createApp({});
app.use(moduleManager, {
    modules: [

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
app.component('InputSwitch', InputSwitch);
app.component('RadioButton', RadioButton);
app.component('Checkbox', Checkbox);
app.component('Dialog', Dialog);
app.component('Sidebar', Sidebar);




const layouts = import.meta.glob("./layout/**/*.vue");

Object.entries(layouts).forEach(([path, definition]) => {
    const componentName = path.split('/').pop().replace(/\.\w+$/, '');
    app.component(componentName, defineAsyncComponent(definition));
});

app.mount('#app');
