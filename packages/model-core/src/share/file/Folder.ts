import {
  Files,
  addStorageUnit,
  showProperUnit,
  Desc,
  isFile,
  getBytes,
  isRepeatFile,
  reSetBinName,
  isFolder,
  createFile,
} from '.';
import { Middle } from './middle';
import type { InitFileOpt, BinType, Extension } from '.';
import { binData } from '../../config/bin-data';
import { hour, minute, todayStr } from '../time';
import { Base } from './middle';

export interface InitFolderOpt {
  name: string;
  children?: (InitFileOpt | InitFolderOpt)[];
  createdAt?: string;
}

export interface Folder extends Base {}

// 禁止在 computed 使用递归

@Middle()
export class Folder {
  private _name: string = '';
  size: string = '0KB';
  children: (Files | Folder)[] = [];
  parent?: Folder | Desc;
  createdAt: string;

  static getDDesc = () => Folder.findByPath('D:\\') as Desc;
  static getCDesc = () => Folder.findByPath('C:\\') as Desc;
  static getDeskTop = () => Folder.search('Desktop')[0] as Folder;

  constructor(initFolderOpt: InitFolderOpt, parent?: Folder | Desc) {
    const { name, children, createdAt } = initFolderOpt;

    this.name = name;
    this.parent = parent;
    this.createdAt = createdAt || `${todayStr} ${hour.value}:${minute.value}`;

    this.initChildren(children || []);
    this.initSize();
  }

  set name(newName) {
    if (this.name === newName) return;
    newName = newName.trim() || '新建文件夹';

    this._name = this.resolveName(
      newName,
      this.parent?.children.filter((item) => isFolder(item))
    );
  }

  get name() {
    return this._name;
  }

  private initChildren(children: (InitFileOpt | InitFolderOpt)[]) {
    children.forEach((item) => {
      if ((item as InitFileOpt).extension) {
        createFile(item as InitFileOpt, this);
        // this.children.push();
      } else {
        this.children.push(new Folder(item as InitFolderOpt, this));
      }
    });
  }

  private initSize() {
    this.size = showProperUnit(
      this.children.reduce((initVal, item) => {
        return addStorageUnit(initVal, item.size);
      }, '0KB')
    );
  }

  private resolveName(name: string, scope: Folder['children'] = []) {
    let _name = name;

    while (isRepeatFile(scope, _name)) {
      _name = reSetBinName(_name);
    }

    return _name;
  }

  addFolder(content: string | Folder = '新建文件夹') {
    const currPointerFolders = this.children.filter((item) => isFolder(item));

    if (isFolder(content)) {
      if (isOverMemory(this, content.size)) {
        throw new Error(`超出当前磁盘内存`);
      }

      content.name = this.resolveName(content.name, currPointerFolders);

      this.children.push(content);

      return content;
    } else {
      content = this.resolveName(content, currPointerFolders);
      const newFolder = new Folder({ name: content, children: [] }, this);
      this.children.push(newFolder);
      return newFolder;
    }
  }

  addFile(content: string | Files, size: string = '0KB') {
    if (isOverMemory(this, size)) {
      throw new Error(`超出当前磁盘内存`);
    }

    const resolveName = (name: string, extension: Extension = ''): string => {
      let _name = name;
      const scope = this.children.filter((item) => isFile(item) && item.extension === extension);
      while (isRepeatFile(scope, _name)) {
        _name = reSetBinName(_name);
      }
      return _name;
    };

    if (isFile(content)) {
      content.name = resolveName(content.name);

      this.children.push(content);

      return this;
    } else {
      const file = new Files(
        {
          name: '',
          extension: '',
          size,
        },
        this
      );
      file.fullName = content;
      file.name = resolveName(file.name, file.extension);
      this.children.push(file);

      return this;
    }
  }

  removeFolder(content: string | Folder) {
    let index = -1;
    if (content instanceof Folder) {
      index = this.children.findIndex((item) => item === content);
    } else {
      index = this.children.findIndex((item) => {
        if (item instanceof Folder) {
          return item.name === content;
        }
      });
    }

    const removedFolder = index > -1 && this.children.splice(index, 1);

    return removedFolder;
  }

  removeFile(content: string | Files) {
    let index = -1;
    if (content instanceof Files) {
      index = this.children.findIndex((item) => item === content);
    } else {
      index = this.children.findIndex((item) => {
        if (item instanceof Files) {
          return item.name === content;
        }
      });
    }

    const removedFile = index > -1 && this.children.splice(index, 1);

    return removedFile;
  }

  hasParentFolder(pointer: Folder | Desc) {
    let _pointer: Folder['parent'] = this;

    while (_pointer) {
      if (_pointer === pointer) {
        return true;
      } else {
        _pointer = _pointer.parent;
      }
    }

    return false;
  }

  get path(): string {
    return `${this.parent?.path}${this.name}\\`;
  }

  static search(keyword: string) {
    const result: BinType[] = [];

    const _search = (node: (Folder | Desc)[]) => {
      for (const item of node) {
        if (item.name.toLowerCase().match(keyword.toLowerCase())) result.push(item);
        if (!isFile(item)) _search(item.children as (Folder | Desc)[]);
      }
    };

    _search(binData as (Folder | Desc)[]);

    return result;
  }

  /**
   * @param query Query may be a path
   * @returns Folder
   */
  static findOne(query: string): Folder | null {
    let folderNode: Folder | null = null;
    try {
      new URL(query);

      folderNode = Desc.findByPath(query);
    } catch {
      folderNode = Desc.search(query)[0] as Folder | null;
    }

    return folderNode;
  }

  static findByPath(path: string): Folder | Desc | null {
    const idxs = path.split('\\').filter((item) => item);

    const tarDesc = binData.find((item) => item.name.match(/[A-Z]:/)![0] === idxs[0]);
    const foundPointers = new Set<Folder>([]);

    if (!tarDesc) {
      return null;
    }

    let i = 1;
    let pointer = tarDesc as Desc | Folder;

    while (i < idxs.length) {
      foundPointers.add(pointer);
      const tar = pointer.children.find((item) => {
        if (!foundPointers.has(pointer)) {
          return false;
        }

        return item.name === idxs[i];
      });

      if (tar) {
        pointer = tar as Folder;
        i++;
      } else {
        return null;
      }
    }

    return pointer;
  }
}

const isOverMemory = (curr: Folder | Desc, size: string): boolean => {
  let pointer: Folder | Desc = curr;
  while (pointer.parent) {
    pointer = pointer.parent;
  }

  if (getBytes(addStorageUnit(pointer.size, size)) > getBytes((pointer as Desc).size)) {
    return true;
  }
  return false;
};
