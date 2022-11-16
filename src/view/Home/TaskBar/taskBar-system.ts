import WinTask from './task-system-item/win-task/index.vue';
import SearchTask from './task-system-item/search-task/index.vue';

const systemTaskImgList = reactive([
  {
    tp: '/src/assets/images/homePage/taskBar-img/win-logo.png',
    tp1: '/src/assets/images/homePage/taskBar-img/win-logo-active.png',
    className: 'win-logo',
    show: true,
    contentComp: markRaw(WinTask),
  },
  {
    tp: '/src/assets/images/homePage/taskBar-img/search.png',
    tp1: '/src/assets/images/homePage/taskBar-img/search.png',
    className: 'search',
    show: true,
    contentComp: markRaw(SearchTask),
  },
  {
    tp: '/src/assets/images/homePage/taskBar-img/cortana.svg',
    tp1: '/src/assets/images/homePage/taskBar-img/cortana.svg',
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
