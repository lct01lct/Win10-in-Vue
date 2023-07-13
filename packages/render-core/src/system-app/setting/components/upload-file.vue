<script lang="ts" setup>
  defineProps<{ accept?: string }>();

  const fileIptRef = shallowRef<HTMLInputElement>();
  const emits = defineEmits<{
    change: [file: File];
  }>();

  const onFileIptChange = () => {
    const oFile = fileIptRef.value;

    if (oFile) {
      const file = oFile.files?.[0];
      if (file) {
        emits('change', file);
      }
    }
  };

  const onWrapperClick = () => {
    fileIptRef.value?.click();
  };
</script>

<template>
  <input type="file" ref="fileIptRef" style="display: none" @change="onFileIptChange" />
  <div class="upload-file" @click="onWrapperClick">
    <slot></slot>
  </div>
</template>

<style scoped>
  .upload-file {
    display: inline-block;
  }
</style>
