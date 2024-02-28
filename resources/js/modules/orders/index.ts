import ModulePage from './OrderModule.vue';
import { routes } from './routes';
import { ModuleDeclaration } from '@/share/types';


export default {
    name: 'module-orders',
    basePath: '/',
    component: ModulePage,
    components:[],
    locales: {},
    routes,
} as ModuleDeclaration;
