<script setup>
import { ref } from 'vue';
import { useLayout } from '@/layout/composables/layout';

const { layoutState } = useLayout();

const searchInput = ref(null);

const onInputKeydown = (event) => {
    if (event.key === 'Enter') {
        layoutState.searchBarActive.value = false;
    }
};
const focusOnInput = () => {
    searchInput.value.$el.focus();
};
</script>

<template>
    <Dialog
        v-model:visible="layoutState.searchBarActive.value"
        :style="{ width: '50vw' }"
        :breakpoints="{ '992px': '75vw', '576px': '90vw' }"
        :closeOnEscape="true"
        :closable="false"
        :dismissableMask="true"
        :draggable="false"
        :modal="true"
        @show="focusOnInput()"
        :pt="{
            header: { class: 'hidden' },
            content: { class: 'p-0 border-round-sm' }
        }"
    >
        <div class="search-container">
            <i class="pi pi-search"></i>
            <InputText type="text" class="p-inputtext search-input" ref="searchInput" placeholder="Search" @keydown="onInputKeydown($event)" />
        </div>
    </Dialog>
</template>
