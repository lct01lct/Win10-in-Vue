import { Command, Pointer } from '../../types';
import { currPointer } from '../../store';
import CommandError from '../../core/error';
import { Folder, isFolder } from 'model-core';

export default {
  commandName: 'cd',
  type: 'get',
  effect: (options, params) => {
    if (options.length) {
      new CommandError('execute', '系统找不到指定的路径。');
    }

    if (!params.length && currPointer.value) {
      return currPointer.value.path;
    }

    for (let i = 0; i < params.length; i++) {
      currPointer.value = matchPath(params[i]);
    }

    return '';
  },
} as Command;

const checkPathMatchTemplate = (path: string): boolean => {
  const template = ['..', '.'];

  return template.some((item) => item === path);
};

const matchPath = (path: string): Pointer => {
  const items = path.split('/').filter((item) => item);
  let tarPointer = currPointer.value!;

  // whether to match partical path
  if (checkPathMatchTemplate(items[0])) {
    items.forEach((item) => {
      const _current = currPointer.value;
      if (_current) {
        if (item === '.') {
          tarPointer = tarPointer;
        } else if (item === '..') {
          const parentPoniter = _current.parent;
          if (parentPoniter) {
            tarPointer = parentPoniter;
          }
        } else {
          const childrenPointer = _current.children;

          for (let i = 0; i < childrenPointer.length; i++) {
            const childPointer = childrenPointer[i];

            if (isFolder(childPointer)) {
              childPointer.path.includes(path);
              tarPointer = childPointer;
            }
          }

          throw new CommandError('execute', '系统找不到指定的路径。');
        }
      }
    });
  } else {
    const pointer = Folder.findByPath(tarPointer.path + path);

    if (pointer) {
      tarPointer = pointer;
    } else {
      throw new CommandError('execute', '系统找不到指定的路径。');
    }
  }

  return tarPointer;
};
