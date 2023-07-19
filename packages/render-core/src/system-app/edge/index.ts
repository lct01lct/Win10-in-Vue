import { WinApp } from '@/app';
import edgeAppIcon from './img/logo.png';
import Edge from './edge.vue';

export const edgeAppName = 'Edge';

export const edgeApp = new WinApp({
  name: edgeAppName,
  icon: edgeAppIcon,
  comp: Edge,
}).createShortcut(edgeAppIcon, edgeAppName);

export { edgeAppIcon };
