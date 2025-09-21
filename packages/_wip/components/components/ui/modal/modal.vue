<template>
  <div
    ref="$root"
    :id="id"
    :class="`modal ${props.open ? '-open' : ''} ${props.class ?? ''}`"
  >
    <div class="modal_backdrop" @click="close"></div>
    <div class="modal_content">
      <h1>modal</h1>
    </div>
    <button v-if="closeable" class="modal_close" @click="close"></button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import './modal.css';
import type { TModal } from './modal.type.js';

const $root = ref<HTMLElement | null>(null);
const props = withDefaults(defineProps<TModal>(), {
  open: false,
});

const open = () => {
  $root.value?.dispatchEvent(
    new CustomEvent('modal.open', {
      detail: { id: props.id },
    }),
  );
  props.onOpen?.();
};

const close = () => {
  console.log('close', $root.value);
  $root.value?.dispatchEvent(
    new CustomEvent('modal.close', {
      detail: { id: props.id },
    }),
  );
  props.onClose?.();
};
</script>
