import { WinApp } from '@/app';
import Camera from './camera.vue';
import CameraLogo from './img/camera-logo.png';

export const cameraAppName = '相机';

export const cameraApp = new WinApp({
  name: cameraAppName,
  comp: Camera,
  icon: CameraLogo,
});

export { CameraLogo };
