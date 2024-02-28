import { Router, RouteRecordRaw } from "vue-router";
import { Component, ComponentOptionsMixin } from 'vue'

/**
 * Module Management
 */
export interface ModuleDeclaration {
    name: string;
    component: Component;
    components: Component[];
    basePath?: string;
    locales: {};
    routes: RouteRecordRaw[];
}

export interface ModuleManager {
    modules: ModuleDeclaration[];
    services: ServiceDeclaration[];
    router: Router;
    config: ModuleDeclarationConfig;
}

export interface ServiceDeclaration {
    name: string;
    component: ComponentOptionsMixin;
}

export interface ModuleDeclarationConfig {
    locale: LocaleConfig
}

export interface LocaleConfig {
    locale: string;
    fallbackLocale: string;
}

export interface OptionType {
    label: string;
    value: string;
}
type ColType = 'text' | 'textarea' | 'autocomplete' |'number' |'decimal' |'price' |'date' |'dropdown' |'link' |'status' |'info' |'image' | 'boolean';
type FilterType = 'CONTAINS' | 'STARTS_WITH' | 'IN' | 'DATE_IS' | 'EQUALS' | 'BETWEEN' | 'DROPDOWN_EQUALS'|'TRISTATE';
export interface ColumnType {
    label: string;
    header: string;
    field: string;
    modelField?: string;
    type: ColType;
    placeholder?: string;
    sortable?: boolean;
    filterable?: boolean;
    filterType?: FilterType;
    showFilterMatchModes?: boolean;
    filterMenuStyle?: Object;
    filterField?: string;
    visible?: boolean;
    width?: number;
    style?: string;
    classes?: string;
    headerClasses?: string;
    headerStyles?: string;
    loading: boolean;
    success: boolean;
    autocompleteApi?: boolean;
}

