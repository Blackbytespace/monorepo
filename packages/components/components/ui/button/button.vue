<template>
  <a
    :id="id"
    :class="`button -${props.type} ${props.class ?? ''}`"
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
import { TButton } from '@blackbyte/types';
import './button.css';

const props = withDefaults(defineProps<TButton>(), {
  type: 'solid',
  target: '_self',
  rel: 'noopener noreferrer',
});
</script>
