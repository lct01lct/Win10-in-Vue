<script lang="ts" setup>
  import { progessProps } from './progess';

  const props = defineProps(progessProps);

  const getLineStyles = () => {
    return { width: `${props.width}px` };
  };

  const progessValue = ref(props.modelValue);

  const stepsLen = props.steps.length;
</script>

<template>
  <div class="progess-wrapper">
    <div class="progess-line" :style="getLineStyles()">
      <div class="progess-outer">
        <div class="progess-inner">
          <div class="slider"></div>
        </div>
      </div>
    </div>
    <div class="progess-steps" v-if="showText">
      <div class="progess-step-item" v-for="(item, index) in steps" :key="index">{{ item }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .progess-line {
    height: 3px;
    background-color: #59595a;

    .progess-outer {
      width: 100%;
      height: 100%;
      .progess-inner {
        height: 100%;
        position: relative;
        .slider {
          position: absolute;
          width: 8px;
          height: 26px;
          background-color: #0078d7;
          border-radius: 4px;
          top: -12px;
        }
      }
    }
  }
  .progess-steps {
    display: flex;
    color: #7c7c7c;
    margin-top: 20px;
    font-size: 10px;
  }
</style>
