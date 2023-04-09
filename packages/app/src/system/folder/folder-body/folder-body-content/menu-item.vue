<script lang="ts" setup>
  import { PropType } from 'vue';
  import MenuItem from './menu-item.vue';
  import { Icon } from 'win10/src/components';
  import fileEmptyIcon from '../../../../assets/images/appPage/system-app/folder-app/file-empty.png';

  const { icon } = defineProps({
    name: {
      type: String,
      required: true,
    },
    children: {
      type: Array as PropType<any>,
      required: true,
    },
    leftOffset: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      default: fileEmptyIcon,
    },
  });
  const childrenVisible = ref<boolean>(false);
</script>

<template>
  <li class="menu-item" :style="{ marginTop: leftOffset ? 0 : 5 + 'px' }">
    <span @click="childrenVisible = !childrenVisible" v-if="children.length" class="toggle-btn">
      <span v-if="childrenVisible" class="iconfont icon-xiangxia"></span>
      <span v-else class="iconfont icon-xiangyou"></span>
    </span>

    <span class="menu-item-title" :style="{ marginLeft: 20 + leftOffset * 25 + 'px' }">
      {{ name }}
      <Icon class="menu-item-icon" :width="20" :height="20">
        <img :src="icon" alt="" />
      </Icon>
    </span>
  </li>
  <template v-if="children.length && childrenVisible">
    <MenuItem
      v-for="item in children"
      :key="item.name"
      :children="item.children"
      :name="item.name"
      :leftOffset="leftOffset + 1"
    ></MenuItem>
  </template>
</template>

<style scoped lang="scss">
  .menu-item {
    display: flex;
    align-items: center;
    padding: 4px 0;
    font-size: 13px;
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
      .menu-item-icon {
        position: absolute;
        top: -1px;
        left: -20px;
      }
    }
  }
</style>
