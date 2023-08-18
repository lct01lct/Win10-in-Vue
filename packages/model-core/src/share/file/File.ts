import { hour, minute, todayStr } from '../time';
import { Desc } from './Desc';
import { Folder } from './Folder';
import { Base, Middle } from './middle';

export const extensions = ['docx', 'pptx', 'xlsx', 'txt', 'rtf', ''] as const;
export type Extension = (typeof extensions)[number];

export interface InitFileOpt {
  name: string;
  extension: Extension;
  size?: string;
  createdAt?: string;
}

export interface Files extends Base {}

Middle();
export class Files {
  private _name: string = '';
  extension: Extension;
  size: string;
  createdAt: string;
  parent: Folder | Desc;

  constructor(initFileOpt: InitFileOpt, parent: Folder | Desc) {
    const { name, extension, size, createdAt } = initFileOpt;
    this.name = name;
    this.extension = extension;
    this.size = size || '0KB';
    this.createdAt = createdAt || `${todayStr} ${hour.value}:${minute.value}`;
    this.parent = parent;
  }

  set name(newName) {
    if (!newName.trim()) {
      newName = '新建文件';
    }
    this._name = newName;
  }

  get name() {
    return this._name;
  }

  setName(newName: string) {
    this.name = newName;
  }

  get fullName() {
    return `${this.name}${this.extension ? `.${this.extension}` : ``}`;
  }

  set fullName(newFullName: string) {
    const name = newFullName.split('.')[0];
    const extension: Extension | string = newFullName.split('.')[1] || '';

    if (extensions.includes(extension as Extension)) {
      this.extension = extension as Extension;
      this.name = name;
    } else {
      throw new Error(`无法设置 .${extension} 的后缀名`);
    }
  }
}
