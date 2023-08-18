import { hour, minute, todayStr } from '../time';
import { Desc } from './Desc';
import { Folder } from './Folder';
import { Base, Middle } from './middle';
import FileDefaultIcon from './extent-files/img/document.png';

export const extensions = ['docx', 'pptx', 'xlsx', 'txt', 'rtf', ''] as const;
export type Extension = (typeof extensions)[number];

export interface InitFileOpt {
  name: string;
  extension?: Extension;
  size?: string;
  createdAt?: string;
}

export interface CustomFile {
  parser?: <T>(data: T) => void;
}

export interface Files extends Base, CustomFile, CustomFileDefaultOption {}

@Middle()
export class Files implements CustomFile {
  private _name: string = '';

  size: string;
  createdAt: string;
  parent?: Folder | Desc;
  icon: string;

  constructor(initFileOpt: InitFileOpt, parent?: Folder | Desc) {
    const { name, size, createdAt } = initFileOpt;
    this.name = name;
    this.size = size || '0KB';
    this.createdAt = createdAt || `${todayStr} ${hour.value}:${minute.value}`;
    this.parent = parent;
    this.icon = this.defaultIcon;
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

defineFileDefaultOption(Files, { defaultIcon: FileDefaultIcon, extension: '' });

export interface CustomFileDefaultOption {
  extension: Extension;
  defaultIcon: string;
}
export function defineFileDefaultOption(
  CustomFile: typeof Files,
  { defaultIcon, extension }: CustomFileDefaultOption
) {
  const prototype = CustomFile.prototype;
  if (defaultIcon) {
    Reflect.defineProperty(prototype, 'defaultIcon', {
      value: defaultIcon,
      writable: true,
      configurable: false,
      enumerable: true,
    });
  }

  if (extension) {
    Reflect.defineProperty(prototype, 'extension', {
      value: extension,
      writable: false,
      configurable: false,
      enumerable: true,
    });
  }
}
