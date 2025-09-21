<template>
  <div :carpenter="id" :key="seed">
    <props.component v-bind="values" />
  </div>
</template>
<script lang="ts" setup>
import { __Carpenter, type TCarpenterComponent } from '@blackbyte/carpenter';
import { getCurrentInstance, onMounted, ref } from 'vue';
import { type TCarpenterVueProxy } from './carpenterVueProxy.type';

const instance = getCurrentInstance();
const props = withDefaults(defineProps<TCarpenterVueProxy>(), {});
const values = ref(props.specs.values ?? {});
const seed = ref(0);

onMounted(() => {
  const $component: HTMLElement = document.querySelector(
    `[carpenter="${props.id}"]`,
  ) as HTMLElement;

  const component: TCarpenterComponent = {
    ...props.specs,
    $component,
    update(newValues) {
      values.value = { ...values.value, ...newValues };
      seed.value++;
      instance?.proxy?.$forceUpdate();
    },
  };
  __Carpenter.addComponent(component);
});
</script>
