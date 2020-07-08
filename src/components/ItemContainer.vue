<template>
  <div class="item-class q-pa-xs">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ItemContainer'
});
</script>

<style lang="scss" scoped>
.item-class {
  width: 33.33%;
  height: auto;
}

@media (max-width: 600px) {
  .item-class {
    width: 100%;
    height: auto;
  }
}
</style>
