import ModulePage from './ProductModule.vue';
import { routes } from './routes';
import { ModuleDeclaration } from '@/share/types';


export default {
    name: 'module-products',
    basePath: '/',
    component: ModulePage,
    components:[],
    locales: {},
    routes,
} as ModuleDeclaration;
