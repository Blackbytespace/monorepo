<template>
  <div class="code-tabs" ref="$root">
    <nav class="code-tabs_nav">
      <ol class="code-tabs_tabs">
        <li
          :class="`code-tabs_tab ${
            selectedTabIndex === index ? '-active' : ''
          }`"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selectTab(index)"
        >
          <p class="code-tabs_tab-title typo-h4">{{ tab.title }}</p>
          <p
            class="code-tabs_tab-description typo-caption"
            v-if="tab.description"
          >
            {{ tab.description }}
          </p>
        </li>
      </ol>
    </nav>
    <div class="code-tabs_content">
      <div class="code-tabs_code-wrapper" :style="{ height: `${height}px` }">
        <div
          :class="`code-tabs_code ${
            selectedTabIndex === index ? '-active' : ''
          }`"
          v-for="(tab, index) in tabs"
          :key="index"
          v-show="selectedTabIndex === index"
        >
          <Code :code="tab.code" :language="tab.language" />
        </div>
      </div>
      <div style="flex-grow: 1"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { __wait } from '@blackbyte/sugar/datetime';
import { onMounted, ref } from 'vue';
import Code from '../../ui/code/code.vue';
import { type TCodeTabs } from './codeTabs.type';

const height = ref(0);
const selectedTabIndex = ref(0);

const $root = ref<HTMLElement | null>(null);

withDefaults(defineProps<TCodeTabs>(), {});

const selectTab = async (index: number) => {
  selectedTabIndex.value = index;
  const $tab = $root.value?.querySelector(
    `.code-tabs_code:nth-child(${index + 1})`,
  ) as HTMLElement;
  if (!$tab) {
    return;
  }
  await __wait(0);
  height.value = $tab.offsetHeight;
};

onMounted(() => {
  selectTab(0);
});
</script>
