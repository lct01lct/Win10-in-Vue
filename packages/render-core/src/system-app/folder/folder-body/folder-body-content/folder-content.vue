<script lang="ts" setup>
  import { Ref } from 'vue';
  import { Desc, Files, Folder, isFile } from 'model-core';
  import { Icon } from '@/components';
  const currPointer = inject<Ref<Folder | Desc>>('currPointer');
  const setCurrPointer = inject<(currPointer: Folder | Desc) => void>('setCurrPointer');

  const headerItemsConfig = reactive([
    {
      title: '名称',
      width: 220,
      className: 'name',
    },
    {
      title: '修改日期',
      width: 180,
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

  const onItemDblClick = (item: Folder | Files) => {
    if (isFile(item)) {
      // parse TODO:
      alert(`当前功能暂未实现，敬请期待`);
    } else {
      if (item && setCurrPointer) {
        setCurrPointer(item);
      }
    }
  };

  const onItemClick = (item: Folder | Files) => {
    clearSelectedFoldersAndFiles();
    selectedFoldersAndFiles.push(item);
  };

  const selectedFoldersAndFiles = reactive<(Folder | Files)[]>([]);
  const clearSelectedFoldersAndFiles = () => (selectedFoldersAndFiles.length = 0);
</script>

<template>
  <div class="folder-content-wrapper" @click="clearSelectedFoldersAndFiles">
    <div class="folder-content-table-wrapper">
      <div class="folder-content-table-header">
        <td
          class="folder-content-table-header-item"
          v-for="item in headerItemsConfig"
          :class="item.className"
          :style="{ minWidth: item.width + 'px' }"
        >
          {{ item.title }}
        </td>
      </div>

      <div v-if="currPointer?.children.length">
        <div
          v-for="item in currPointer?.children"
          :key="item.name"
          :class="selectedFoldersAndFiles.includes(item) && 'isActive'"
          @click.stop="onItemClick(item)"
          @dblclick.stop="onItemDblClick(item)"
          class="folder-content-table-row"
        >
          <span
            class="folder-content-table-cell name"
            :style="{ width: headerItemsConfig[0].width + 'px' }"
          >
            <Icon :height="20" :width="20" :style="{ marginRight: '4px' }">
              <img v-if="isFile(item)" src="../../img/file-type/mp3.png" />
              <img v-else src="../../img/file-empty.png" alt="" />
            </Icon>

            <span class="folder-name">{{ item.name }}</span>
          </span>
          <span
            class="folder-content-table-cell"
            :style="{ minWidth: headerItemsConfig[1].width + 'px' }"
          >
            {{ item.createdAt }}
          </span>
          <span
            class="folder-content-table-cell"
            :style="{ minWidth: headerItemsConfig[2].width + 'px' }"
          >
            {{ isFile(item) ? item.extension : '文件夹' }}
          </span>
          <span
            class="folder-content-table-cell"
            :style="{ minWidth: headerItemsConfig[3].width + 'px' }"
          >
            {{ parseInt(item.size) + 'kb' }}
          </span>
        </div>
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
      padding: 10px;
      padding-left: 20px;
      height: fit-content;

      color: #acacac;
      font-size: 12px;
      .folder-content-table-header {
        font-size: 12px;
        color: #4c607a;
        margin-bottom: 10px;
        .folder-content-table-header-item {
          height: 16px;
          padding-left: 10px;
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
