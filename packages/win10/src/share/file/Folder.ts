import {
  Files,
  addStorageUnit,
  showProperUnit,
  Desc,
  isFile,
  getBytes,
  isRepeatFolder,
  isRepeatFile,
} from '.';
import type { InitFileOpt, BinType } from '.';
import { binData } from '@/config/bin-data';
import { hour, minute, todayStr } from '@/share/time';

export interface InitFolderOpt {
  name: string;
  children: (InitFileOpt | InitFolderOpt)[];
  createdAt?: string;
}

// 禁止在 computed 使用递归

class Folder {
  name: string;
  size: string = '0KB';
  children: (Files | Folder)[] = [];
  parent: Folder | Desc;
  createdAt: string;

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
      if (isRepeatFolder(this.children, name)) {
        name = reSetBinName(name);
      }
      return name;
    };

    if (content instanceof Folder) {
      if (isOverMemory(this, content.size)) return `超出当前磁盘内存`;

      content.name = resolveName(content.name);

      this.children.push(content);
    } else {
      content = resolveName(content);

      this.children.push(new Folder({ name: content, children: [] }, this));
    }
  }

  addFile(content: string | Files, size: string = '0KB') {
    if (isOverMemory(this, size)) {
      return `超出当前磁盘内存`;
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
    } else {
      const file = new Files({
        name: '',
        extension: '',
        size,
      });
      file.fullName = content;
      file.name = resolveName(file.name);
      this.children.push(file);
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
        pointer = tar as unknown as Folder;
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

const reSetBinName = (name: string) => {
  return `${name} - 副本`;
};

export default Folder;
