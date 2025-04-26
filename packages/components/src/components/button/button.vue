<template>
  <a
    :id="id"
    :class="`button -${style} ${props.class}`"
    :href="link?.href"
    :title="link?.title"
    :target="link?.target"
    :aria-label="link?.ariaLabel"
    :rel="link?.rel"
  >
    {{ link?.text }}
  </a>
</template>
<script lang="ts" setup>
import { TButton } from '@lotsof/types';
import './button.css';

const props = withDefaults(defineProps<TButton>(), {
  style: 'solid',
  target: '_self',
  rel: 'noopener noreferrer',
});
</script>
