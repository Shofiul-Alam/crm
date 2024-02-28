<template>
    <Button :icon="activeIcon"
            :severity="severity"
            :outlined="outlined"
            :aria-label="label"
            :class="buttonClass"
            :style="buttonStyle"
            :loading="loading"
            v-tooltip.top="{
                value: error,
                pt:{
                    arrow:{
                      class: 'border-danger'
                    },
                    text: {
                        class: 'bg-danger text-white'
                    },
                }
            }"
            :badge="error?'i':''"
            badge-severity="danger"
    ></Button>
</template>

<script setup>
import {computed, watch} from "vue";

const props = defineProps({
    icon: String,
    label: String,
    severity: String,
    outlined: {
        type: Boolean,
        default: true
    },
    style: String,
    ariaLabel: String,
    class: String,
    loading: {
        type: Boolean,
        default: false
    },
    success: {
        type: Boolean,
        default: false
    },
    error: String,
    disable: {
        type: Boolean,
        default: false
    }
})
const activeIcon = computed(() => {
    return props.success? 'pi pi-check': props.icon
})
const buttonClass = computed(() => {
    return props.class + " p-action-button";
})
const buttonStyle = computed(() => {
    return props.style;
})

</script>
