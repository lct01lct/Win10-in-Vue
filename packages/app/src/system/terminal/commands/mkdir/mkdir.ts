import CommandError from '../../core/error';
import { Command } from '../../types';
import { currPointer } from '../../store';
import { useMatchUnequalCount } from '../../hooks';

export default {
  commandName: 'mkdir',
  type: 'post',
  effect(options, params) {
    if (options.length) {
      throw new CommandError('execute', useMatchUnequalCount('mkdir', 'option', 0, options.length));
    }

    if (params.length === 1) {
      currPointer.value!.addFolder(params[0]);
    } else {
      throw new CommandError('execute', useMatchUnequalCount('mkdir', 'param', 1, options.length));
    }
  },
} as Command;
