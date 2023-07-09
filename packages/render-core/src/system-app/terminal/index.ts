import { WinApp } from '@/app';
import Terminal from './terminal.vue';
import terminalIcon from './img/terminal-logo.png';

export const terminalAppName = '命令提示符';

export const terminalApp = new WinApp({
  name: terminalAppName,
  comp: Terminal,
  icon: terminalIcon,
}).createShortcut(terminalIcon, terminalAppName);

export { terminalIcon };
