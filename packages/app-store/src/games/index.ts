import { WinApp } from 'win';
import Game from './index.vue';

export const gameApp = new WinApp({
  comp: Game,
  icon: '',
  name: 'game',
});
