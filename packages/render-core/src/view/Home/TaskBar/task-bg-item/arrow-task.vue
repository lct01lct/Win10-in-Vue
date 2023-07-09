<script lang="ts" setup>
  import { Popover, Icon } from '@/components';
  import { bgProessesLen, bgProesses } from './arrow.task';

  const getWrapperStyle = () => {
    const len = bgProessesLen.value;
    const row = Math.ceil(len ** 0.5);
    const col = Math.floor(len / row) + (len % row ? 1 : 0);
    const size = 40;

    return {
      width: `${row * size + 1}px`,
      height: `${col * size + 1}px`,
    };
  };

  const onBgProcessClick = (trigger: Function | undefined) => {
    trigger && trigger();
  };
</script>

<template>
  <Popover animation-dir="top" :left-margin="-30">
    <div class="task-bg-detail arrow-task" :style="getWrapperStyle()">
      <div
        class="bg-process"
        v-for="item in bgProesses"
        :key="item.name"
        @click="onBgProcessClick(item.trigger)"
      >
        <Icon :width="18" :height="18">
          <img :src="item.icon" :alt="item.name" draggable="false" />
        </Icon>
      </div>
    </div>
    <template #reference>
      <div class="system-task task-bg-item">
        <Icon :width="18" :height="18">
          <img src="@/assets/images/homePage/taskBar-img/up-arrow.png" />
        </Icon>
      </div>
    </template>
  </Popover>
</template>

<style scoped lang="scss">
  .arrow-task {
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
    opacity: 0.5;
    .bg-process {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #373838;
      }
    }
  }
</style>
