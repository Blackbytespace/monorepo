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
      <div class="code-tabs_code-wrapper">
        <div
          :class="`code-tabs_code ${
            selectedTabIndex === index ? '-active' : ''
          }`"
          v-for="(tab, index) in tabs"
          :key="index"
          v-show="selectedTabIndex !== -1 && selectedTabIndex === index"
        >
          <Code :code="tab.code" header :language="tab.language" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Code from '../../ui/code/code.vue';
import './codeTabs.css';
import { type TCodeTabs } from './codeTabs.type';

const selectedTabIndex = ref(0);
const $root = ref<HTMLElement | null>(null);
withDefaults(defineProps<TCodeTabs>(), {});

const selectTab = (index: number) => {
  selectedTabIndex.value = index;
};
</script>
