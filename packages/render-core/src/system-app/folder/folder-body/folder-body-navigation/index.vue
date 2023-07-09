<script lang="ts" setup>
  import Option from './option.vue';
  import Navigation from './navigation.vue';
  import Search from './search.vue';
</script>

<template>
  <div class="folder-body-navigation-wrapper">
    <Option></Option>
    <Navigation></Navigation>
    <Search></Search>
  </div>
</template>

<style>
  .folder-body-navigation-wrapper {
    display: flex;
    height: 40px;
    align-items: center;
  }
</style>
