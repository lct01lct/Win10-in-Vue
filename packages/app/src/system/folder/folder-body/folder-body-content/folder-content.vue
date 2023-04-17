<script lang="ts" setup>
  import { Ref } from 'vue';
  import { Desc, Files, Folder, isFile } from 'win10/src/share/file';
  import { Icon } from 'win10/src/components';
  import { DISPLAY_FILE, EXPECT } from 'i18n';
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

  const onItemBblClick = (item: Folder | Files) => {
    if (isFile(item)) {
      // parse TODO:
      alert(`${DISPLAY_FILE}，${EXPECT}`);
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
    <table class="folder-content-table-wrapper">
      <thead class="folder-content-table-header">
        <td
          class="folder-content-table-header-item"
          v-for="item in headerItemsConfig"
          :class="item.className"
          :style="{ minWidth: item.width + 'px' }"
        >
          {{ item.title }}
        </td>
      </thead>

      <br />

      <tbody v-if="currPointer?.children.length">
        <tr
          v-for="item in currPointer?.children"
          :key="item.name"
          :class="selectedFoldersAndFiles.includes(item) && 'isActive'"
          @click.stop="onItemClick(item)"
          @dblclick.stop="onItemBblClick(item)"
        >
          <td class="folder-content-table-cell name">
            <Icon :height="20" :width="20" :style="{ marginRight: '5px' }">
              <img
                v-if="isFile(item)"
                src="./../../../../assets/images/appPage/system-app/folder-app/file-type/mp3.png"
              />
              <img
                v-else
                src="./../../../../assets/images/appPage/system-app/folder-app/file-empty.png"
                alt=""
              />
            </Icon>

            {{ item.name }}
          </td>
          <td>{{ item.createdAt }}</td>
          <td>{{ isFile(item) ? item.extension : '文件夹' }}</td>
          <td>{{ parseInt(item.size) + 'kb' }}</td>
        </tr>
      </tbody>

      <div v-else class="table--empty">此文件夹为空。</div>
    </table>
  </div>
</template>

<style scoped lang="scss">
  .folder-content-wrapper {
    flex: 1;

    .folder-content-table-wrapper {
      height: fit-content;
      padding: 10px;
      padding-left: 20px;

      color: #acacac;
      font-size: 13px;
      .folder-content-table-header {
        font-size: 12px;
        color: #4c607a;
        .folder-content-table-header-item {
          height: 24px;
          padding: 0;
          &:nth-child(n + 2) {
            border-left: 1px solid #e5e5e5;
          }
        }
      }

      .table--empty {
        margin-top: 10px;
        width: 100%;
        font-size: 13px;
        text-align: center;
      }

      .folder-content-table-cell.name {
        display: flex;
        align-items: center;
        color: #000;
      }

      .isActive {
        background-color: #cce8ff;
        border: 1px solid #99d1ff;
      }
    }
  }
</style>
