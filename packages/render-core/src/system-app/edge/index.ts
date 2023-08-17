import { WinApp } from '@/app';
import edgeAppIcon from './img/logo.png';
import Edge from './edge.vue';

export const edgeAppName = 'Edge';

export const edgeApp = new WinApp({
  name: edgeAppName,
  icon: edgeAppIcon,
  comp: Edge,
});

export const edgeAppDeskTopIcon = edgeApp.createShortcut(edgeAppIcon, edgeAppName);

export { edgeAppIcon };
