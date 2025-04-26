<template>
  <img
    :id="props.id ?? ''"
    :class="`image ${props.class ?? ''}`"
    :style="_ratio"
    :src="src"
    :width="width"
    :height="height"
    :srcset="Array.isArray(srcset) ? srcset?.join(', ') : srcset"
    :sizes="Array.isArray(sizes) ? sizes?.join(', ') : sizes"
    :alt="alt"
    :title="title"
    :loading="lazy ? 'lazy' : 'eager'"
    :fetchpriority="priority"
    decoding="async"
  />
</template>

<script setup lang="ts">
import { __uniqid } from '@lotsof/sugar/string';
import { computed, onMounted } from 'vue';
import './image.css';
import type { TImage } from './image.type.js';

let _ratioValue = 1;
const _ratio = computed(() => {
  return {
    '--image-aspect-ratio': _ratioValue,
  };
});

const props = withDefaults(defineProps<TImage>(), {
  id: `img-${__uniqid()}`,
  lazy: true,
});

onMounted(() => {
  const $img = document.querySelector(`#${props.id}`) as HTMLImageElement;
  $img?.addEventListener('load', () => {
    const w = $img.naturalWidth;
    const h = $img.naturalHeight;
    let aspectRatio;
    if (w > h) {
      aspectRatio = w / h;
    } else {
      aspectRatio = h / w;
    }
    console.log('A', aspectRatio);
    _ratioValue = aspectRatio;
  });
});
</script>
