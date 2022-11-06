<script lang="ts" setup>
  import { progessProps, progessEmits } from './progess';

  const props = defineProps(progessProps);
  const emits = defineEmits(progessEmits);
  const stepsLen = props.steps.length;
  const stepChild = reactive<HTMLElement[]>([]);

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

  const checkMouseTarIsSlider = (e: MouseEvent, fn: (tar: HTMLElement) => void) => {
    const tar = e.target as HTMLElement;
    if (tar.classList.contains('slider')) {
      fn(tar);
    }
  };

  const onSliderMouseEnter = (e: MouseEvent) => {
    checkMouseTarIsSlider(e, (tar) => {
      tar.classList.add('active');
    });
  };

  const onSliderMouseLeave = (e: MouseEvent) => {
    checkMouseTarIsSlider(e, (tar) => {
      tar.classList.remove('active');
    });
  };

  const onSliderMouseDown = (e: MouseEvent) => {
    checkMouseTarIsSlider(e, (tar) => {
      const x = e.clientX - parseInt(window.getComputedStyle(tar, null).left);
      tar.classList.add('focus');

      const ondocMouseMove = (e: MouseEvent) => {
        let moveX = e.clientX - x;
        const edgeX = props.width;

        if (moveX <= 0) {
          moveX = 0;
        } else if (moveX >= edgeX) {
          moveX = edgeX;
        }

        tar.style.left = moveX + 'px';
        emits('move');
        emits('update:modelValue', (moveX / props.width) * 100);
      };

      const ondocMouseUp = (e: MouseEvent) => {
        document.removeEventListener('mousemove', ondocMouseMove);
        document.removeEventListener('mouseup', ondocMouseUp);

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
    });
  };
</script>

<template>
  <div class="progess-wrapper">
    <div class="progess-line" :style="{ width: `${width}px` }">
      <div class="progess-section" v-if="stepsLen">
        <div
          class="progess-section-item"
          v-for="(item, index) in steps"
          :key="index"
          :style="{
            left: `${(width / (stepsLen - 1)) * index}px`,
          }"
        ></div>
      </div>
      <div class="progess-outer">
        <div class="progess-inner">
          <div
            class="slider"
            @mouseenter="onSliderMouseEnter($event)"
            @mouseleave="onSliderMouseLeave($event)"
            @mousedown.stop="onSliderMouseDown($event)"
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
    padding: 5px;
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
        .slider {
          position: absolute;
          top: -12px;
          left: v-bind('`${(props.modelValue / 100) * props.width}px`');
          width: 8px;
          height: 26px;
          background-color: #0078d7;
          border-radius: 4px;
          cursor: pointer;
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
    color: #7c7c7c;
    margin-top: 20px;
    font-size: 10px;
    .progess-step-item {
      position: absolute;
      white-space: nowrap;
    }
  }
</style>
