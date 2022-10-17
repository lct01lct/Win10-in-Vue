interface ITaskItem {
  tp: string;
  className: string;
  compName: string;
  comp: any;
}

const systemTaskIconList = [
  {
    tp: '/src/assets/images/homePage/taskBar-img/up-arrow.png',
    className: 'up-arrow',
    compName: 'ArrowTask',
  },
  {
    tp: '/src/assets/images/homePage/taskBar-img/power.png',
    className: 'power',
    compName: 'PowerTask',
  },
  {
    tp: '/src/assets/images/homePage/taskBar-img/wifi.png',
    className: 'wifi',
    compName: 'WifiTask',
  },
  {
    tp: '/src/assets/images/homePage/taskBar-img/volume.png',
    className: 'volume',
    compName: 'VolumeTask',
  },
  {
    className: 'Chinese',
  },
  {
    tp: '/src/assets/images/homePage/taskBar-img/sougou.png',
    className: 'sougou',
    compName: 'InputMethodTask',
  },
] as ITaskItem[];

const taskBgItemFile = import.meta.glob('./task-bg-item/*.vue', { eager: true });

Object.values(taskBgItemFile).forEach((file: any) => {
  const isFind = systemTaskIconList.find((item) => item.compName === file.default.name);
  if (isFind) {
    isFind.comp = file.default;
  }
});

export { systemTaskIconList };
