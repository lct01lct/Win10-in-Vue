<script lang="ts" setup>
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
    },
    size: {
      type: Number,
      default: 18,
    },
  });

  const emits = defineEmits(['update:modelValue']);

  const value = ref(props.modelValue);

  const onRadioClick = () => {
    value.value = !value.value;
    emits('update:modelValue', value.value);
  };
</script>

<script lang="ts">
  export default {
    name: 'WinRadio',
  };
</script>

<template>
  <div class="win-radio-wrapper" @click="onRadioClick">
    <input type="checkbox" name="check" class="radio-original" />
    <span class="radio-inner" :style="{ width: size + 'px', height: size + 'px' }">
      <i class="iconfont icon-duigou" :style="{ fontSize: size + 'px' }" v-if="value"></i>
    </span>
    <span class="radio-label" v-if="label">{{ label }}</span>
  </div>
</template>

<style scoped lang="scss">
  .win-radio-wrapper {
    display: flex;
    align-items: center;
    .radio-original {
      opacity: 0;
    }
    .radio-inner {
      display: inline-block;
      margin-right: 10px;
      border: 3px solid #cfdeea;
      &:hover {
        border-color: #fff;
      }
    }
  }
</style>
