import { InitFileOpt, InitFolderOpt, Folder } from '.';
import { Middle, Base } from './middle';

export interface InitDescOpt {
  name: string;
  memory: string;
  children: (InitFileOpt | InitFolderOpt)[];
}

export interface Desc extends Base {}

Middle();
export class Desc extends Folder {
  memory: string;

  constructor(initDescOpt: InitDescOpt) {
    const { name, memory, children } = initDescOpt;
    super({ name, children }, null as any);
    this.memory = memory;
  }

  get path() {
    return `${this.name.match(/[A-Z]:/)![0]}\\\\`;
  }
}
