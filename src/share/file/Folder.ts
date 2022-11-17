import { Files, addStorageUnit, showProperUnit } from '.';
import type { InitFileOpt } from '.';

export interface InitFolderOpt {
  name: string;
  children: (InitFileOpt | InitFolderOpt)[];
}

class Folder {
  name: string;
  size: string = '0KB';
  children: (Files | Folder)[] = [];
  parent: Folder | null = null;

  constructor(initFolderOpt: InitFolderOpt, parent: Folder | null) {
    const { name, children } = initFolderOpt;

    this.name = name;
    this.initChildren(children);
    this.initSize();
    this.parent = parent;
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
}

export default Folder;
