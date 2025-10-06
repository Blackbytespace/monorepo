<template>
  <div class="code">
    <component
      is="s-code"
      :filename="filename"
      :language="language"
      :header="header ? true : undefined"
      :code="code"
    >
    </component>
  </div>
</template>
<script lang="ts" setup>
import type { TCode } from './code.type';

const props = withDefaults(defineProps<TCode>(), {
  language: 'typescript',
  code: "console.log('hello world');",
});
</script>
