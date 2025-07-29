<template>
  <div class="code">
    <div class="code_code" v-html="codeHtml?.trim()"></div>
    <div style="flex-grow: 1"></div>
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
