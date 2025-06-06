<template>
  <component :is="props.component" v-bind="values" />
</template>
<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { type TVueProxy } from './vueProxy.type';

const instance = getCurrentInstance();
const props = withDefaults(defineProps<TVueProxy>(), {});
const values = ref({});

onMounted(() => {
  document.addEventListener('factory.update', (e: CustomEvent) => {
    if (e.detail?.id !== props.id) return;
    values.value = e.detail?.values || {};
    instance?.proxy?.$forceUpdate();
  });
});
</script>
