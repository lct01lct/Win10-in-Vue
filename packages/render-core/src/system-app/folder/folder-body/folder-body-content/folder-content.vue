<script lang="ts" setup>
  import { Ref } from 'vue';
  import { Desc, Folder } from 'model-core';
  import FolderContentItem from './folder-content-item.vue';
  import {
    openWrapperContextMenu,
    wrapperContextmenuOptions,
  } from './contextmenu/wrapper-contextmenu';

  import { clearSelectedFoldersAndFiles } from '../../folder';

  const currPointer = inject<Ref<Folder | Desc>>('currPointer');

  const headerItemsConfig = reactive([
    {
      title: '名称',
      width: 220,
      className: 'name',
    },
    {
      title: '修改日期',
      width: 160,
      className: 'modified-date',
    },
    {
      title: '类型',
      width: 80,
      className: 'type',
    },
    {
      title: '大小',
      width: 80,
      className: 'size',
    },
  ]);

  const onWrapperContextmenu = (event: MouseEvent) => {
    clearSelectedFoldersAndFiles();
    openWrapperContextMenu({
      props: {
        options: wrapperContextmenuOptions,
        event,
      },
    });
  };
</script>

<template>
  <div
    class="folder-content-wrapper"
    @click="clearSelectedFoldersAndFiles()"
    @contextmenu.stop="onWrapperContextmenu"
  >
    <div class="folder-content-table-wrapper" @contextmenu.stop>
      <div class="folder-content-table-header">
        <td
          class="folder-content-table-header-item"
          v-for="item in headerItemsConfig"
          :class="item.className"
          :style="{ width: item.width + 'px' }"
        >
          {{ item.title }}
        </td>
      </div>

      <div v-if="currPointer?.children.length">
        <FolderContentItem
          v-for="item in currPointer?.children"
          :key="item.name"
          :item="item"
          :header-items-config="headerItemsConfig"
          :class="item.isFocus && 'isActive'"
          class="folder-content-table-row"
        ></FolderContentItem>
      </div>
      <div v-else class="table--empty">此文件夹为空。</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .folder-content-wrapper {
    flex: 1;

    .folder-content-table-wrapper {
      display: grid;
      margin: 10px;
      height: fit-content;
      color: #acacac;
      font-size: 12px;
      .folder-content-table-header {
        font-size: 12px;
        color: #4c607a;
        margin-bottom: 10px;
        .folder-content-table-header-item {
          height: 16px;
          padding-left: 5px;
          &:nth-child(n + 2) {
            border-left: 1px solid #e5e5e5;
          }
        }
      }

      .folder-content-table-row {
        height: 20px;
        display: flex;
        align-items: center;
        border: 1px solid transparent;
      }

      .folder-content-table-cell.name {
        padding-left: 10px;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        color: #000;
      }

      .folder-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 190px;
      }

      .isActive {
        background-color: #cce8ff;
        border: 1px solid #99d1ff;
      }
    }
  }

  .table--empty {
    color: #acacac;
    margin-top: 10px;
    font-size: 12px;
    text-align: center;
  }
</style>
