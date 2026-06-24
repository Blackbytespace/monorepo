<template>
  <div class="menu-item">
    <div v-if="item.name" class="menu-item_label">
      <a
        :class="`menu-item_link ${currentItemId == item.id.toLowerCase() ? '-active' : ''}`"
        :href="`/doc/${toSlug(item.id)}`"
        :title="item.name"
      >
        <span class="menu-item_label-name">
          {{ item.name }}
        </span>
        <span class="menu-item_platforms">
          <span
            :class="`menu-item_platform platform -${platform.name}`"
            v-for="platform in item.platform"
            :key="platform"
            >{{ platform.name }}</span
          >
        </span>
      </a>
    </div>
    <div class="menu-item_group" tabindex="0" v-else>
      <div class="menu-item_group-label">
        {{ title }}
      </div>
      <MenuItem
        v-for="(child, key) in item"
        :key="key"
        :item="child"
        :title="key"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { toSlug } from '@blackbyte/website-common';
import { onMounted, ref } from 'vue';
import { type TMenuItem } from './menu.type';

const props = withDefaults(defineProps<TMenuItem>(), {
  item: {},
});

const currentItemId = ref<string | null>(null);

onMounted(() => {
  currentItemId.value = `@${document.location.pathname.replace(/\/$/, '').split('/').pop()?.toLowerCase()}`;
});
</script>
