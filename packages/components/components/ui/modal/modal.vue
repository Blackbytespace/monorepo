<template>
  <div
    :class="`modal ${props.open ? '-open' : ''} ${props.class ?? ''}`"
    :id="id"
  >
    <div class="modal_backdrop" @click="close"></div>
    <div class="modal_content">
      <h1>modal</h1>
    </div>
    <button v-if="closeable" class="modal_close" @click="close"></button>
  </div>
</template>
<script lang="ts" setup>
import './modal.css';
import type { TModal } from './modal.type.js';

const props = withDefaults(defineProps<TModal>(), {
  open: false,
});

// const open = () => {
//   $root.value?.dispatchEvent(
//     new CustomEvent('modal.open', {
//       detail: { id: props.id },
//     }),
//   );
//   props.onOpen?.();
// };

// const close = () => {
//   $root.value?.dispatchEvent(
//     new CustomEvent('modal.close', {
//       detail: { id: props.id },
//     }),
//   );
//   props.onClose?.();
// };
</script>
