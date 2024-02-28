<template>
    <div class="layout-search app-searchbar">
        <transition name="search-container" @enter="onEnter">
            <div class="search-container" @click="onSearchContainerClick">
                <i class="pi pi-search"></i>
                <InputText ref="searchInput" type="text" name="search" placeholder="Search" @keydown="onInputKeydown" />
            </div>
        </transition>
    </div>
</template>

<script>
// import Navigation from "./services/Navigation";
// import {mapState} from "vuex";

export default {
    name: "AppSearch",
    emits: ["search-click", "search-hide"],

    created() {
        // if(!this.$store.hasModule('nav')){
        //     this.$store.registerModule('nav', Navigation)
        // }
    },
    methods: {
        onEnter() {
            if (this.$refs.searchInput) {
                this.$refs.searchInput.$el.focus();
            }
        },
        onSearchContainerClick(event) {
            // this.$store.dispatch('nav/onSearchClick', event);
            // this.$emit("search-click", event);
        },
        onInputKeydown(event) {
            const key = event.which;

            //escape, tab and enter
            if (key === 27 || key === 9 || key === 13) {
                // this.$store.dispatch('nav/onSearchHide', event);
                // this.$emit("search-hide", event);
            }
        }
    }
};
</script>
