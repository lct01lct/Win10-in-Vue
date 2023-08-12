import { defineStore } from 'pinia';
import { ApplicationDesc } from '../api';

export const useDownloadAppStore = defineStore('download-app', () => {
  const downloadAppList = reactive<ApplicationDesc[]>([]);

  return { downloadAppList };
});
