<script lang="ts" setup>
  import Option from './option.vue';
  import Navigation from './navigation.vue';
</script>

<template>
  <div class="folder-body-navigation-wrapper">
    <Option></Option>
    <Navigation></Navigation>
    <div class="search-wrapper"></div>
  </div>
</template>

<style>
  .folder-body-navigation-wrapper {
    overflow: hidden;
    display: flex;
    height: 40px;
    align-items: center;
  }
</style>
