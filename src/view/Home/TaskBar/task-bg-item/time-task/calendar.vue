<script lang="ts" setup>
  import { year, month, second } from '@/share/time';
  import Btn from '@/components/Btn/index.vue';

  const currentYear = ref<string>(year.value);
  const currentMonth = ref<string>(month.value);
</script>

<template>
  <div class="calendar-wrapper">
    <div class="calendar-title">
      <Btn color="#dfdfdff3" hover-color="#fff">
        <span class="current">{{ currentYear }} 年 {{ currentMonth }} 月</span>
      </Btn>
      <span class="btn-group">
        <Btn color="#dfdfdff3" hover-color="#fff">
          <span class="iconfont icon-xiangshang"></span>
        </Btn>
        <Btn color="#dfdfdff3" hover-color="#fff">
          <span class="iconfont icon-xiangxia"></span>
        </Btn>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .calendar-wrapper {
    padding: 20px;
    font-size: 14px;
    font-weight: 400;

    .calendar-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconfont {
        font-size: 20px;
      }
    }
  }
</style>
