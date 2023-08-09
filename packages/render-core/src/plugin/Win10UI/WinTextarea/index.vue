<script lang="ts" setup>
  import { ref } from 'vue';

  const props = defineProps<{
    modelValue?: string;
  }>();

  const emits = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  const value = ref(props.modelValue);

  const onChange = () => {
    if (value.value) {
      emits('update:modelValue', value.value);
    }
  };

  const onFocus = (e: Event) => {
    (e.target as HTMLTextAreaElement).select();
  };

  defineOptions({
    name: 'WinTextarea',
  });
</script>

<template>
  <div class="win-textarea" @click.stop>
    <span class="textarea-span">{{ value }}</span>
    <textarea
      class="textarea"
      v-model="value"
      @change="onChange"
      autofocus
      @focus="onFocus"
    ></textarea>
  </div>
</template>

<style scoped>
  .win-textarea {
    position: relative;
    width: 100px;
    border: 1px solid #000;
  }
  .textarea-span {
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
