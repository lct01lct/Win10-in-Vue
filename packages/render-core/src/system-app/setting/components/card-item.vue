<script lang="ts" setup>
  withDefaults(
    defineProps<{
      icon: string;
      name: string;
      desc?: string;
      width?: number;
    }>(),
    {
      width: 400,
    }
  );
</script>

<template>
  <div class="comp-card-item" :style="{ width: width + 'px' }">
    <img class="card-img" :src="icon" alt="" />
    <div class="card-introduce">
      <div class="name">{{ name }}</div>
      <div class="desc">{{ desc }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .comp-card-item {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 10px;
    .card-img {
      width: 35px;
      height: 35px;
      margin-right: 15px;
    }
    .card-introduce {
      font-size: 14px;
      font-weight: 500;
      .name {
        height: 16px;
      }
      .desc {
        height: 16px;
        color: #7b7b7b;
      }
    }
    &:hover {
      background-color: #f2f2f2;
    }
  }
</style>
