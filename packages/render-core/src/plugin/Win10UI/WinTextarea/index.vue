<script lang="ts" setup>
  import { ref } from 'vue';

  type AutoFocusFn = (val: string) => [number, number];

  const props = withDefaults(
    defineProps<{
      modelValue: string;
      autoFocus?: boolean | AutoFocusFn;
    }>(),
    {
      autoFocus: true,
    }
  );

  const emits = defineEmits<{
    'update:modelValue': [value: string];
    enter: [value: string];
    input: [value: string];
  }>();

  const value = ref<string>(props.modelValue);
  const textareaRef = shallowRef<HTMLTextAreaElement>();

  const onInput = () => {
    if (value.value) {
      emits('update:modelValue', value.value);
    }
  };

  watch(value, (newVal) => {
    emits('update:modelValue', newVal);
  });

  const onFocus = (e: Event) => {
    const oTextArea = e.target as HTMLTextAreaElement;
    if (props.autoFocus === true) {
      oTextArea.select();
    } else if (typeof props.autoFocus === 'function') {
      const [start, end] = props.autoFocus(value.value);
      oTextArea.selectionStart = start;
      oTextArea.selectionEnd = end;
    }
  };

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    emits('enter', value.value);
  };

  defineOptions({
    name: 'WinTextarea',
  });

  onMounted(() => {
    textareaRef.value?.focus();
  });
</script>

<template>
  <div class="win-textarea" @click.stop @mousedown.stop @selectstart.stop>
    <span class="textarea-span">{{ value }}</span>
    <textarea
      class="textarea"
      v-model="value"
      @input="onInput"
      @keydown.enter="onEnter"
      @focus="onFocus"
      ref="textareaRef"
      >{{ value }}</textarea
    >
  </div>
</template>

<style scoped>
  .win-textarea {
    position: relative;
    min-width: 50px;
    border: 1px solid #000;
  }
  .textarea-span {
    padding: 0px 2px;
    display: block;
    min-height: 1.25em;
    line-height: 1.25em;
    white-space: pre-wrap;
    word-wrap: break-word;
    visibility: hidden;
  }
  .textarea {
    padding: 0px 2px;
    position: absolute;
    text-align: center;
    top: 0;
    left: 0;
    width: calc(100% - 2 * 2px);
    height: 100%;
    line-height: 1.25em;
    resize: none;
    outline: none;
    border: none;
    overflow: hidden;
    margin: 0;
  }
</style>
