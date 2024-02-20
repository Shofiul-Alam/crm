import ModulePage from './Module.vue';
import { routes } from './routes';
import { ModuleDeclaration } from '@/share/types';
import de from './locales/de.json';
import en from './locales/en.json';

export default {
    name: 'module-foo',
    basePath: '/f',
    component: ModulePage,
    locales: { de, en },
    routes,
} as ModuleDeclaration;
