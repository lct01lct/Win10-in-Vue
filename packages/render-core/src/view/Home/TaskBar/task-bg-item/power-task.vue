<script lang="ts" setup>
  import { Popover, Icon, Progess } from '@/components';

  enum PowerStatus {
    '节电模式',
    '最长的续航',
    '更好的性能',
    '最佳性能',
  }

  const percent = ref(100);
</script>

<template>
  <Popover animation-dir="top" :left-margin="-165">
    <div class="task-bg-detail power-task">
      <div class="remaining-power">
        <Icon :width="70" :height="70">
          <img src="@/assets/images/homePage/taskBar-img/power.png" />
        </Icon>
        <span class="power-value">80%</span>
        <span class="power-full-tip">
          <span>剩下</span>
          <span>2 小时 24 分钟</span>
        </span>
      </div>
      <div class="power-curr-status">
        电池使用模式：{{
          PowerStatus[Math.round((percent / 100) * (Object.keys(PowerStatus).length / 2 - 1))]
        }}
      </div>
      <Progess
        :steps="['节点模式', '', '', '最佳性能']"
        :show-text="true"
        v-model="percent"
      ></Progess>
      <span class="power-setting">电池设置</span>
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
    display: flex;
    flex-direction: column;
    color: #fff;
    font-size: 14px;
    width: 365px !important;
    height: 250px !important;
    .remaining-power {
      display: flex;
      align-items: center;
      margin-left: 20px;
      margin-top: 10px;
      .power-value {
        margin-left: 20px;
        font-size: 50px;
        font-weight: 100;
      }

      .power-full-tip {
        width: 130px;
        margin-left: 20px;
        color: #9f9f9f;
        display: flex;
        flex-direction: column;
        > span {
          margin-bottom: 6px;
        }
      }
    }
    .power-curr-status {
      align-self: flex-start;
      margin-left: 20px;
      margin-top: 20px;
    }
    .power-setting {
      margin-top: 35px;
      margin-left: 20px;
      font-size: 14px;
      color: #99c6e9;
      cursor: pointer;
    }
  }
</style>
