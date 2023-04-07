import bluetoothIcon from '@/assets/images/homePage/taskBar-img/bluetooth.png';
import winSecurityIcon from '@/assets/images/homePage/taskBar-img/win-security.png';
import QQSecurityIcon from '@/assets/images/homePage/taskBar-img/QQ-security.png';
import NAIDIAIcon from '@/assets/images/homePage/taskBar-img/Nvidia.png';

interface BgProcess {
  name: string;
  icon: string;
  trigger?: Function; // todo 触发方式未开发，可能有通知显示任务的参数
}

export const bgProesses = reactive<BgProcess[]>([
  { name: '蓝牙设备', icon: bluetoothIcon },
  { name: 'window 安全中心', icon: winSecurityIcon },
  { name: '电脑官家', icon: QQSecurityIcon },
  { name: 'NAIDIA 设置', icon: NAIDIAIcon },
]);

export const bgProessesLen = computed(() => bgProesses.length);

export const createBgProcesses = (bgProcess: BgProcess) => {
  bgProesses.push(bgProcess);
};
