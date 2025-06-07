<template>
  <div v-if="carpenter" :id="id" type="carpenter/component">
    <component
      is="script"
      :id="`${id}-specs`"
      type="application/json"
      v-html="JSON.stringify(specs)"
    />
    <props.component v-bind="values" />
  </div>
  <!-- <props.component v-else v-bind="values" /> -->
</template>
<script lang="ts" setup>
import { getCurrentInstance, inject, onMounted, ref } from 'vue';
import { type TCarpenterVueProxy } from './carpenterVueProxy.type';

const instance = getCurrentInstance();
const props = withDefaults(defineProps<TCarpenterVueProxy>(), {});
const values = ref({});
const carpenter = inject('carpenter');

onMounted(() => {
  (<any>window)._carpenterComponents = (<any>window)._carpenterComponents || {};
  (<any>window)._carpenterComponents[props.id] = {
    update(newValues) {
      props.specs.values = {
        ...props.specs.values,
        ...newValues,
      };
      values.value = { ...values.value, ...newValues };
      instance?.proxy?.$forceUpdate();
    },
  };
});
</script>
