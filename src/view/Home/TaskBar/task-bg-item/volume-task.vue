<script lang="ts" setup>
  import { Popover, Icon, Progess } from '@/components';

  const percent = ref(50);
</script>

<template>
  <Popover animation-dir="top" :left-margin="-143">
    <div class="task-bg-detail volume-task">
      <div class="soundtrack-selector">
        扬声器 (Realtek(R) Audio)
        <Icon :width="14" :height="14">
          <img src="@/assets/images/homePage/taskBar-img/up-arrow.png" />
        </Icon>
      </div>
      <div class="volume-progess">
        <Icon :width="22" :height="22">
          <img src="@/assets/images/homePage/taskBar-img/volume.png" />
        </Icon>
        <Progess :width="230" type="percent" v-model="percent"></Progess>
        <div class="volume-value">{{ Math.round(percent) }}</div>
      </div>
    </div>
    <template #reference>
      <div class="system-task task-bg-item">
        <Icon :width="18" :height="18">
          <img src="@/assets/images/homePage/taskBar-img/volume.png" />
        </Icon>
      </div>
    </template>
  </Popover>
</template>

<style scoped lang="scss">
  .volume-task {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 360px;
    height: 100px;
    padding: 20px;
    font-weight: 300;
    .soundtrack-selector {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .volume-progess {
      display: flex;
      align-items: center;
      margin-top: 15px;
      .volume-value {
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
</style>
