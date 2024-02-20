<template>
  <div>
    <h1>{{ t("foo.module") }}</h1>
    <h2>{{ someNumberPlusOnTimesTwoDividedByThree }}</h2>
    <button @click="setRandomNumber">Click Me</button>

    <router-link :to="{ name: 'foo-one' }"> One </router-link>
    <router-link :to="{ name: 'foo-two' }"> Two </router-link>

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import useSomeNumberStore from './services/FooService.ts';
import {computed} from "vue";
const { t } = useI18n();

const someNumberStore = useSomeNumberStore();

const someNumberPlusOnTimesTwoDividedByThree = computed(
    () => someNumberStore.someNumberPlusOneTimesTwo / 3,
);
function setRandomNumber() {
  someNumberStore.wrappedSetSomeNumber(Math.round(Math.random() * 1000));
}
</script>
