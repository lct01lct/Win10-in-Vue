<script lang="ts" setup>
  import { Popover, Icon, Progess } from '@/components';

  enum PowerStatus {
    '节点模式',
    '最长的续航',
    '更好的性能',
    '最佳性能',
  }

  const powerStatus = ['节点模式', '最长的续航', '更好的性能', '最佳性能'];

  const percent = ref(100);

  watch(percent, (val) => {
    console.log(val);
  });
</script>

<template>
  <Popover animation-dir="top" :left-margin="-165">
    <div class="task-bg-detail power-task">
      电池使用模式：{{ powerStatus[(percent / 100) * (powerStatus.length - 1)] }}
      <Progess
        :steps="['节点模式', '', '', '最佳性能']"
        :show-text="true"
        v-model="percent"
      ></Progess>
    </div>
    <template #reference>
      <div class="system-task task-bg-item">
        <Icon :width="18" :height="18">
          <img src="@/assets/images/homePage/taskBar-img/power.png" />
        </Icon>
      </div>
    </template>
  </Popover>
</template>

<style scoped lang="scss">
  .power-task {
    color: #fff;
    font-size: 14px;
    width: 365px !important;
    height: 250px !important;
    background-color: #1e1e1e !important;
    opacity: 0.9;
  }
</style>
