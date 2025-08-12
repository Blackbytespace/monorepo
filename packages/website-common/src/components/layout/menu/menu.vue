<template>
  <div class="menu">
    <MenuItem
      v-for="(item, key) in deepDocmapJson"
      :key="key"
      :item="item"
      :title="key"
    />
  </div>
</template>
<script lang="ts" setup>
import { __deepize } from '@blackbyte/sugar/object';
import './menu.css';
import type { TMenu } from './menu.type';
import MenuItem from './menuItem.vue';

const props = withDefaults(defineProps<TMenu>(), {
  docmapJson: {},
});

const finalDocmapJson: any = {};
for (let [namespace, doc] of Object.entries(props.docmapJson.generated.map)) {
  const finalNamespace = namespace.split('.').slice(2).join('.');
  finalDocmapJson[finalNamespace] = doc;
}
const deepDocmapJson = __deepize(finalDocmapJson);
</script>
