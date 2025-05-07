<template>
  <article class="card" :id="id">
    <figure v-if="image" class="_figure">
      <Image v-bind="image" />
    </figure>
    <div class="_body">
      <Body v-if="body" v-bind="body" />
    </div>
  </article>
</template>
<script lang="ts" setup>
import Body from '../body/body.vue';
import Image from '../image/image.vue';
import './card.css';
import type { TCard } from './card.type.js';

const props = withDefaults(defineProps<TCard>(), {});
</script>
