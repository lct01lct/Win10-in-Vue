<script lang="ts" setup>
  import { PropType } from 'vue';
  import MenuItem from './menu-item.vue';
  import { Icon } from 'win10/src/components';
  import fileEmptyIcon from '../../img/file-empty.png';
  import { isFile } from 'win10/src/share/file';
  import { Pointer } from '../../types';

  const props = withDefaults(
    defineProps<{
      item: Pointer;
      leftOffset: number;
      icon?: string;
      isExpand?: boolean;
    }>(),
    {
      icon: fileEmptyIcon,
      isExpand: false,
    }
  );
  const childrenVisible = ref<boolean>(props.isExpand);
  const setCurrPointer = inject<(pointer: Pointer) => void>('setCurrPointer');
</script>

<template>
  <li
    class="menu-item"
    :style="{ marginTop: leftOffset ? 0 : 2 + 'px' }"
    @click="setCurrPointer?.(item)"
  >
    <span
      @click.stop="childrenVisible = !childrenVisible"
      v-if="item.children.filter((item) => !isFile(item)).length"
      class="toggle-btn"
      :style="{ marginLeft: leftOffset * 10 + 'px' }"
    >
      <span v-if="childrenVisible" class="iconfont icon-xiangxia"></span>
      <span v-else class="iconfont icon-xiangyou"></span>
    </span>
    <span v-else :style="{ marginLeft: 17 + leftOffset * 10 + 'px' }"></span>

    <span class="menu-item-title">
      <Icon class="menu-item-icon" :width="20" :height="20">
        <img :src="icon" alt="" />
      </Icon>
      {{ item.name.toLowerCase() === 'desktop' && !leftOffset ? '快速访问' : item.name }}
    </span>
  </li>
  <template v-if="item.children.length && childrenVisible">
    <template v-for="item2 in item.children">
      <MenuItem
        v-if="!isFile(item2)"
        :key="item2.name"
        :item="item2"
        :leftOffset="leftOffset + 1"
      ></MenuItem>
    </template>
  </template>
</template>

<style scoped lang="scss">
  .menu-item {
    display: flex;
    align-items: center;
    padding: 3px 0;
    font-size: 12px;
    list-style: none;
    white-space: nowrap;

    &:hover {
      background-color: #e5f3ff;
    }

    .toggle-btn {
      padding-left: 5px;
      color: #404040;
      font-weight: 700;
      .iconfont {
        font-size: 12px;
      }
      &:hover {
        color: #3eccf8;
      }
    }

    .menu-item-title {
      position: relative;
      display: flex;
      align-items: center;
    }
  }
</style>
