<template>
  <div class="code">
    <component is="s-code" language="js">
      <div v-html="code"></div>
    </component>
  </div>
</template>
<script lang="ts" setup>
import { codeToHtml } from 'shiki';
import type { TCode } from './code.type';

const props = withDefaults(defineProps<TCode>(), {
  language: 'typescript',
  code: "console.log('hello world');",
});

const codeHtml = await codeToHtml(props.code, {
  lang: props.language,
  theme: 'github-dark',
});
</script>
