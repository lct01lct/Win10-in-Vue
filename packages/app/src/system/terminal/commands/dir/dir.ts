import CommandError from '../../core/error';
import type { Command } from '../../types';
import { currPointer } from '../../store';
import { useSpace } from '../../hooks';

export default {
  commandName: 'dir',
  type: 'get',
  effect(options, params) {
    if (options.length || params.length) {
      throw new CommandError('execute', '找不到文件');
    } else {
      return currPointer.value!.children.reduce((prev, curr) => {
        return `${prev}${curr.createdAt} ${useSpace(6)} ${curr.name} ${useSpace(6)} ${
          curr.size
        }<br />`;
      }, '');
    }
  },
} as Command;
