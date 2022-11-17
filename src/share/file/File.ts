export type Extension = 'mp4' | 'mp3' | 'html' | 'txt' | 'js' | 'ts' | 'css' | '';
export const extensions: Extension[] = ['mp4', 'mp3', 'html', 'txt', 'js', 'ts', 'css', ''];

export interface InitFileOpt {
  name: string;
  extension: Extension;
  size: string;
}

class Files {
  name: string;
  extension: Extension;
  size: string;

  constructor(initFileOpt: InitFileOpt) {
    const { name, extension, size } = initFileOpt;
    this.name = name;
    this.extension = extension;
    this.size = size;
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

export default Files;
