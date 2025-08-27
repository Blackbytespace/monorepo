<template>
  <div class="code">
    <component
      v-if="codeHtml"
      is="s-code"
      :language="language"
      :header="header ? true : undefined"
    >
      <div v-html="codeHtml"></div>
    </component>
  </div>
</template>
<script lang="ts" setup>
import { codeToHtml } from 'shiki';
import { ref } from 'vue';
import type { TCode } from './code.type';

const codeHtml = ref<string | null>(null);

const props = withDefaults(defineProps<TCode>(), {
  language: 'typescript',
  code: "console.log('hello world');",
});

(async () => {
  codeHtml.value = await codeToHtml(props.code, {
    lang: props.language,
    theme: 'github-dark',
  });
})();
</script>
