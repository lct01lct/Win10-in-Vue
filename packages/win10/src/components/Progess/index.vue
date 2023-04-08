<script lang="ts" setup>
  import { progessProps, progessEmits } from './progess';

  const props = defineProps(progessProps);
  const emits = defineEmits(progessEmits);
  const stepsLen = props.steps.length;
  const stepChild = reactive<HTMLElement[]>([]);
  const progessWidth = ref((props.modelValue / 100) * props.width);
  const lineRef = ref<HTMLElement | null>(null);
  const sliderRef = ref<HTMLElement | null>(null);

  onMounted(async () => {
    await nextTick(); // 确保父元素更新完毕

    stepChild.forEach((dom, index) => {
      let leftOffset = 0;
      const leftVal = (props.width / (stepsLen - 1)) * index;
      if (index === stepsLen - 1) {
        leftOffset = Number(dom.clientWidth);
      } else if (index !== 0) {
        leftOffset = Number(dom.clientWidth) / 2;
      }

      dom.style.left = `${leftVal - leftOffset}px`;
    });
  });

  watch(progessWidth, (val) => {
    emits('update:modelValue', Math.round((val / props.width) * 100));
    emits('move', Math.round((val / props.width) * 100));
  });

  const onSliderMouseEnter = (e: MouseEvent) => {
    sliderRef.value!.classList.add('active');
  };

  const onSliderMouseLeave = (e: MouseEvent) => {
    sliderRef.value!.classList.remove('active');
  };

  const onSliderMouseDown = (e: MouseEvent) => {
    const tar = sliderRef.value!;
    let moveX = 0;
    const x = e.clientX - parseInt(window.getComputedStyle(tar, null).left);
    tar.classList.add('focus');

    const ondocMouseMove = (e: MouseEvent) => {
      moveX = e.clientX - x;
      const edgeX = props.width;

      if (moveX <= 0) {
        moveX = 0;
      } else if (moveX >= edgeX) {
        moveX = edgeX;
      }

      progessWidth.value = moveX;
    };

    const ondocMouseUp = (e: MouseEvent) => {
      document.removeEventListener('mousemove', ondocMouseMove);
      document.removeEventListener('mouseup', ondocMouseUp);
      progessWidth.value = handleMoveXByType(moveX);

      tar.classList.remove('focus');
      emits('down');
    };

    const cancelBubble = (e: Event) => {
      e.stopPropagation();
      document.removeEventListener('click', cancelBubble, true);
      document.removeEventListener('mousemove', ondocMouseMove);
    };

    document.addEventListener('mousemove', ondocMouseMove);
    document.addEventListener('mouseup', ondocMouseUp);
    document.addEventListener('click', cancelBubble, true);
  };

  const onWrapperClick = (e: MouseEvent) => {
    const lineOffsetX = lineRef.value!.getBoundingClientRect().left;
    progessWidth.value = handleMoveXByType(e.clientX - lineOffsetX);
  };

  const handleMoveXByType = (moveX: number) => {
    if (props.type === 'step') {
      const stepLen = props.width / (stepsLen - 1);

      moveX = Math.round(moveX / stepLen) * stepLen;
    }

    return moveX;
  };
</script>

<template>
  <div
    class="progess-wrapper"
    @click.stop="onWrapperClick($event)"
    @mouseenter="onSliderMouseEnter($event)"
    @mouseleave="onSliderMouseLeave($event)"
    :style="{ width: `${width}px` }"
  >
    <div class="progess-line" :style="{ width: `${width}px` }" ref="lineRef">
      <div class="progess-section" v-if="stepsLen">
        <div
          class="progess-section-item"
          v-for="(item, index) in steps"
          :key="index"
          :style="{
            left: `${(props.width / (stepsLen - 1)) * index}px`,
          }"
        ></div>
      </div>
      <div class="progess-outer">
        <div class="progess-inner" :style="{ width: `${progessWidth}px` }">
          <div
            class="slider"
            @mousedown.stop="onSliderMouseDown($event)"
            @click.stop
            ref="sliderRef"
            :style="{ left: `${progessWidth}px` }"
          ></div>
        </div>
      </div>
    </div>
    <div class="progess-steps" v-if="showText">
      <div
        class="progess-step-item"
        v-for="(item, index) in steps"
        :key="index"
        :ref="(el) => stepChild[index] = (el as HTMLElement)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .progess-wrapper {
    padding: 5px 0;
    cursor: pointer;
    margin: 20px;
  }
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
        background-color: #0078d7;
        .slider {
          position: absolute;
          top: -12px;
          left: v-bind('`${(props.modelValue / 100) * props.width}px`');
          width: 8px;
          height: 26px;
          background-color: #0078d7;
          border-radius: 4px;
        }

        .slider.active {
          background-color: #fff;
        }

        .slider.focus {
          background-color: #767676;
        }
      }
    }
  }
  .progess-steps {
    position: relative;
    display: flex;
    color: #9f9f9f;
    margin-top: 20px;
    font-size: 10px;
    .progess-step-item {
      position: absolute;
      white-space: nowrap;
    }
  }
</style>
