import CommandError from '../../core/error';
import { Command } from '../../types';
import { currPointer } from '../../store';
import { useMatchUnequalCount } from '../../hooks';
import { isFolder } from 'win10/src/share/file';

export default {
  commandName: 'rm',
  type: 'post',
  effect(options, params) {
    if (options.length) {
      throw new CommandError('execute', useMatchUnequalCount('mkdir', 'option', 0, options.length));
    }

    if (!params.length) {
      for (let i = currPointer.value!.children.length - 1; i >= 0; i--) {
        const itemPointer = currPointer.value!.children[i];
        if (isFolder(itemPointer)) {
          prohibitDelDesktop(itemPointer.name);
          currPointer.value!.removeFolder(itemPointer.name);
        }
      }
    } else {
      params.forEach((folderName) => {
        prohibitDelDesktop(folderName);
        currPointer.value?.removeFolder(folderName);
      });
    }
  },
} as Command;

export const prohibitDelDesktop = (str: string) => {
  if (str.toLowerCase() === 'desktop') {
    return new CommandError('execute', '禁止删除或移动 Desktop');
  }
};
