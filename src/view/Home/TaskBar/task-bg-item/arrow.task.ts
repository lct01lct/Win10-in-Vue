interface BgProcess {
  name: string;
  icon: string;
  trigger?: Function; // todo 触发方式未开发，可能有通知显示任务的参数
}

export const bgProesses = reactive<BgProcess[]>([
  { name: '蓝牙设备', icon: '/src/assets/images/homePage/taskBar-img/bluetooth.png' },
  { name: 'window 安全中心', icon: '/src/assets/images/homePage/taskBar-img/win-security.png' },
  { name: '电脑官家', icon: '/src/assets/images/homePage/taskBar-img/QQ-security.png' },
  { name: 'NAIDIA 设置', icon: '/src/assets/images/homePage/taskBar-img/Nvidia.png' },
]);

export const bgProessesLen = computed(() => bgProesses.length);

export const registerBgProcesses = (bgProcess: BgProcess) => {
  bgProesses.push(bgProcess);
};
