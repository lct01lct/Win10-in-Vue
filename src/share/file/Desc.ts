import { InitFileOpt, InitFolderOpt, Folder } from '.';

export interface InitDescOpt {
  name: string;
  memory: string;
  children: (InitFileOpt | InitFolderOpt)[];
}

class Desc extends Folder {
  memory: string;

  constructor(initDescOpt: InitDescOpt) {
    const { name, memory, children } = initDescOpt;
    super({ name, children }, null);
    this.memory = memory;
  }
}

export default Desc;
