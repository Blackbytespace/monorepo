<template>
  <article class="card" :id="id">
    <figure v-if="image" class="card_figure">
      <Image v-bind="image" />
    </figure>
    <div class="card_body">
      <Body v-if="body" v-bind="body" />
    </div>
  </article>
</template>
<script lang="ts" setup>
import Body from '../body/body.vue';
import Image from '../image/image.vue';
import './card.css';
import type { TCard } from './card.type.js';

withDefaults(defineProps<TCard>(), {});
</script>
