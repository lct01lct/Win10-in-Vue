import WinTask from './task-system-item/win-task/index.vue';
import SearchTask from './task-system-item/search-task/index.vue';
import winTp from '@/assets/images/homePage/taskBar-img/win-logo.png';
import winTp1 from '@/assets/images/homePage/taskBar-img/win-logo-active.png';
import searchTp from '@/assets/images/homePage/taskBar-img/search.png';
import searchTp1 from '@/assets/images/homePage/taskBar-img/search.png';
import cortanaTp from '@/assets/images/homePage/taskBar-img/cortana.svg';
import cortanaTp1 from '@/assets/images/homePage/taskBar-img/cortana.svg';

const systemTaskImgList = reactive([
  {
    tp: winTp,
    tp1: winTp1,
    className: 'win-logo',
    show: true,
    contentComp: markRaw(WinTask),
  },
  {
    tp: searchTp,
    tp1: searchTp1,
    className: 'search',
    show: true,
    contentComp: markRaw(SearchTask),
  },
  {
    tp: cortanaTp,
    tp1: cortanaTp1,
    className: 'cortana',
    show: true,
    contentComp: '',
  },
]);

const sysytmTaskIconMouseenterHandler = (index: number) => {
  systemTaskImgList[index].show = !systemTaskImgList[index].show;
};

const sysytmTaskIconMouseleaveHandler = (index: number) => {
  systemTaskImgList[index].show = !systemTaskImgList[index].show;
};

export { systemTaskImgList, sysytmTaskIconMouseenterHandler, sysytmTaskIconMouseleaveHandler };
