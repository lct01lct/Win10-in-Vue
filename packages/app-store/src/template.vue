<script lang="ts" setup>
  import { ElMain, ElAside, ElContainer, ElMenu, ElMenuItem, ElButton } from 'element-plus';
  import { WinApp } from 'win';

  defineProps<{ apps: WinApp[] }>();
  const defaultActiveIndex = '0';

  const onBtnClick = (item: WinApp) => {
    item.open();
  };
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-active="defaultActiveIndex">
        <el-menu-item :index="String(index)" v-for="(item, index) in apps">
          <el-button @click="onBtnClick(item)">{{ item.name }}</el-button>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main></el-main>
  </el-container>
</template>

<style scoped></style>
