import { Desc, Folder } from 'model-core';

export type Pointer = Folder | Desc;

export type Option = string;

export type Param = string;

export type Drive = string; // 驱动器：在哪个路径执行;

export interface Command {
  commandName: string; // 命令
  type: 'get' | 'post'; // 如果 type === 'get' 将会启用缓存查找
  effect: (options: Option[], params: Param[]) => string | void;
}
