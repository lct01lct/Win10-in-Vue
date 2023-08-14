<script lang="ts" setup>
  import { Desc, Files, Folder, isFile } from 'model-core';
  import { Ref } from 'vue';
  import { Icon } from '@/components';

  const props = defineProps<{
    item: Files | Folder;
    headerItemsConfig: {
      title: string;
      width: number;
      className: string;
    }[];
  }>();
  const currPointer = inject<Ref<Folder | Desc>>('currPointer');

  const folderOrFileTempName = ref(props.item.name);
  const onTextareaEnter = () => {};
</script>

<template>
  <div class="folder-content-table-row">
    <td
      class="folder-content-table-cell name"
      :style="{ width: headerItemsConfig[0].width + 'px' }"
    >
      <Icon :height="20" :width="20" :style="{ marginRight: '4px' }">
        <img v-if="isFile(item)" src="../../img/file-type/mp3.png" />
        <img v-else src="../../img/file-empty.png" alt="" />
      </Icon>

      <span class="folder-name">{{ item.name }}</span>
      <!-- <win-textarea
        class="app-name-textarea"
        v-model="folderOrFileTempName"
        @enter="onTextareaEnter"
      ></win-textarea> -->
    </td>
    <td class="folder-content-table-cell" :style="{ width: headerItemsConfig[1].width + 'px' }">
      {{ item.createdAt }}
    </td>
    <td class="folder-content-table-cell" :style="{ width: headerItemsConfig[2].width + 'px' }">
      {{ isFile(item) ? item.extension : '文件夹' }}
    </td>
    <td class="folder-content-table-cell" :style="{ width: headerItemsConfig[3].width + 'px' }">
      {{ parseInt(item.size) + 'kb' }}
    </td>
  </div>
</template>

<style scoped lang="scss">
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
</style>
