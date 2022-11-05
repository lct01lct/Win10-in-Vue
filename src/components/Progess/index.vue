<script lang="ts" setup>
  import { progessProps } from './progess';

  const props = defineProps(progessProps);

  const getLineStyles = () => {
    return { width: `${props.width}px` };
  };

  const progessValue = ref(props.modelValue);

  const stepsLen = props.steps.length;

  const getSectionStyles = (index: number) => ({
    left: `${(props.width / (stepsLen - 1)) * index}px`,
  });

  const getStepStyles = (index: number) => {
    const leftVal = (props.width / (stepsLen - 1)) * index;

    return {
      left: `${leftVal}px`,
    };
  };

  const children = [];
</script>

<template>
  <div class="progess-wrapper">
    <div class="progess-line" :style="getLineStyles()">
      <div class="progess-section" v-if="stepsLen">
        <div
          class="progess-section-item"
          v-for="(item, index) in steps"
          :key="index"
          :style="getSectionStyles(index)"
        ></div>
      </div>
      <div class="progess-outer">
        <div class="progess-inner">
          <div class="slider"></div>
        </div>
      </div>
    </div>
    <div class="progess-steps" v-if="showText">
      <div
        class="progess-step-item"
        v-for="(item, index) in steps"
        :key="index"
        :style="getStepStyles(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .progess-line {
    position: relative;
    height: 3px;
    background-color: #59595a;
    .progess-section {
      position: relative;
      .progess-section-item {
        position: absolute;
        top: 10px;
        width: 1px;
        height: 4px;
        background-color: #59595a;
      }
    }

    .progess-outer {
      width: 100%;
      height: 100%;
      .progess-inner {
        height: 100%;
        position: relative;
        .slider {
          position: absolute;
          top: -12px;
          left: 50px;
          width: 8px;
          height: 26px;
          background-color: #0078d7;
          border-radius: 4px;
        }
      }
    }
  }
  .progess-steps {
    position: relative;
    display: flex;
    color: #7c7c7c;
    margin-top: 20px;
    font-size: 10px;
    .progess-step-item {
      position: absolute;
    }
  }
</style>
