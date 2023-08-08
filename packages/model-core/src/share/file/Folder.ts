import {
  Files,
  addStorageUnit,
  showProperUnit,
  Desc,
  isFile,
  getBytes,
  isRepeatFile,
  reSetBinName,
} from '.';
import type { InitFileOpt, BinType } from '.';
import { binData } from '../../config/bin-data';
import { hour, minute, todayStr } from '../time';

export interface InitFolderOpt {
  name: string;
  children: (InitFileOpt | InitFolderOpt)[];
  createdAt?: string;
}

// 禁止在 computed 使用递归

export class Folder {
  name: string;
  size: string = '0KB';
  children: (Files | Folder)[] = [];
  parent: Folder | Desc;
  createdAt: string;

  static getDDesc = () => Folder.findByPath('D:\\') as Desc;
  static getCDesc = () => Folder.findByPath('C:\\') as Desc;
  static getDeskTop = () => Folder.search('Desktop')[0] as Folder;

  constructor(initFolderOpt: InitFolderOpt, parent: Folder | Desc) {
    const { name, children, createdAt } = initFolderOpt;

    this.name = name;
    this.parent = parent;
    this.createdAt = createdAt || `${todayStr} ${hour.value}:${minute.value}`;

    this.initChildren(children);
    this.initSize();
  }

  private initChildren(children: (InitFileOpt | InitFolderOpt)[]) {
    children.forEach((item) => {
      if ((item as InitFileOpt).extension) {
        this.children.push(new Files(item as InitFileOpt));
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

  addFolder(content: string | Folder = '新建文件夹') {
    const resolveName = (name: string): string => {
      let _name = name;

      while (isRepeatFile(this.children, _name)) {
        _name = reSetBinName(_name);
      }

      return _name;
    };

    if (content instanceof Folder) {
      if (isOverMemory(this, content.size)) {
        throw new Error(`超出当前磁盘内存`);
      }

      content.name = resolveName(content.name);

      this.children.push(content);

      return content;
    } else {
      content = resolveName(content);
      const newFolder = new Folder({ name: content, children: [] }, this);
      this.children.push(newFolder);
      return newFolder;
    }
  }

  addFile(content: string | Files, size: string = '0KB') {
    if (isOverMemory(this, size)) {
      throw new Error(`超出当前磁盘内存`);
    }

    const resolveName = (name: string): string => {
      if (isRepeatFile(this.children, name)) {
        name = reSetBinName(name);
      }
      return name;
    };

    if (content instanceof Files) {
      content.name = resolveName(content.name);

      this.children.push(content);

      return content;
    } else {
      const file = new Files({
        name: '',
        extension: '',
        size,
      });
      file.fullName = content;
      file.name = resolveName(file.name);
      this.children.push(file);

      return file;
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

    index > -1 && this.children.splice(index, 1);
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

    index > -1 && this.children.splice(index, 1);
  }

  hasParentFolder(pointer: Folder | Desc) {
    let _pointer: Folder | Desc = this;

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
    return `${this.parent.path}${this.name}\\`;
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

  if (getBytes(addStorageUnit(pointer.size, size)) > getBytes((pointer as Desc).memory)) {
    return true;
  }
  return false;
};
