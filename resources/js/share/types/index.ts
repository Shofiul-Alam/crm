import { Router, RouteRecordRaw } from "vue-router";
import { Component, ComponentOptionsMixin } from 'vue'

/**
 * Module Management
 */
export interface ModuleDeclaration {
    name: string;
    component: Component;
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
