<script lang="ts" setup>
  import { Ref } from 'vue';
  import { BinType } from 'win10/src/share/file';
  const showFoldersAndFiles = inject<Ref<BinType>>('showFoldersAndFiles');
</script>

<template>
  <div class="folder-content-wrapper">
    <div class="table-wrapper">
      <thead class="table-header">
        <td>名称</td>
        <td>修改日期</td>
        <td>类型</td>
        <td>大小</td>
      </thead>
      <tbody></tbody>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .folder-content-wrapper {
    flex: 1;

    .table-wrapper {
      .table-header {
        font-size: 12px;
        color: #9f9f9f;
      }
    }
  }
</style>
