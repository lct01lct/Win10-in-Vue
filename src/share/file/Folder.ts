import { Files, addStorageUnit, showProperUnit, Desc, isFile } from '.';
import type { InitFileOpt, BinType } from '.';
import binData from '@/config/bin-data';

export interface InitFolderOpt {
  name: string;
  children: (InitFileOpt | InitFolderOpt)[];
}

class Folder {
  name: string;
  size: string = '0KB';
  children: (Files | Folder)[] = [];
  parent: Folder | Desc;

  constructor(initFolderOpt: InitFolderOpt, parent: Folder | Desc) {
    const { name, children } = initFolderOpt;

    this.name = name;
    this.parent = parent;

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

  get path(): string {
    return `${this.parent.path}${this.name}\\`;
  }

  static search(keyword: string) {
    const result: BinType[] = [];

    const _search = (node: (Folder | Desc)[]) => {
      for (const item of node) {
        if (item.name.match(keyword)) result.push(item);
        if (!isFile(item)) _search(item.children as (Folder | Desc)[]);
      }
    };

    _search(binData);

    return result;
  }

  static findByPath(path: string): BinType | null {
    const idxs = path.split('\\').filter((item) => item);

    const tarDesc = binData.find((item) => item.name.match(/[A-Z]:/)![0]);

    if (!tarDesc) {
      return null;
    }

    let i = 1;
    let pointer: Desc | Folder = tarDesc;

    while (i < idxs.length) {
      const tar = pointer.children.find((item) => item.name === idxs[i]);
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

export default Folder;
