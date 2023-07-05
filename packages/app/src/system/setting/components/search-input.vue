<script lang="ts" setup>
  import { CSSProperties, computed, ref } from 'vue';

  const props = withDefaults(
    defineProps<{ width?: number; placeholder?: string; autofocus?: boolean }>(),
    { autofocus: false }
  );

  const iptStyle = computed<CSSProperties>(() => {
    const styles: CSSProperties = {};
    if (props.width) {
      styles.width = `${props.width}px`;
    }
    return styles;
  });
  const wrapperRef = ref<HTMLElement>();
  const onIptFocus = () => {
    wrapperRef.value!.style.borderColor = '#0078d7';
  };
  const onIptBlur = () => {
    wrapperRef.value!.style.borderColor = '#6a6a6a';
  };
</script>

<template>
  <div class="search-input" ref="wrapperRef">
    <input
      class="ipt"
      type="text"
      :style="iptStyle"
      :placeholder="placeholder"
      :autofocus="autofocus"
      @focus="onIptFocus"
      @blur="onIptBlur"
    />
    <img class="search-img" src="./../img/search.png" alt="" />
  </div>
</template>

<style scoped lang="scss">
  .search-input {
    border: 3px solid #6a6a6a;
    font-weight: 700;
    font-size: 14px;
    padding: 3px;
    display: flex;
    align-items: center;
    .ipt {
      height: 20px;
      outline: none;
      border: none;
    }
    .search-img {
      width: 16px;
      height: 16px;
    }
  }
</style>
