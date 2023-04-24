import CommandError from '../../core/error';
import { Command } from '../../types';
import { currPointer } from '../../store';
import { useMatchUnequalCount } from '../../hooks';
import { folderApp } from '../../../folder';
import emptyFolderIcon from '../../../folder/img/empty-folder.ico';

export default {
  commandName: 'mkdir',
  type: 'post',
  effect(options, params) {
    if (options.length) {
      throw new CommandError('execute', useMatchUnequalCount('mkdir', 'option', 0, options.length));
    }

    if (params.length === 1) {
      const folderName = params[0];
      const isRepeat = currPointer.value!.children.find((item) => item.name === folderName);
      if (isRepeat) {
        throw new CommandError('execute', `子目录或文件 ${folderName} 已经存在。`);
      } else {
        currPointer.value!.addFolder(folderName);
        folderApp.createShortcut(emptyFolderIcon, folderName);
      }
    } else {
      throw new CommandError('execute', useMatchUnequalCount('mkdir', 'param', 1, options.length));
    }
  },
} as Command;
