import { commandMap } from '../commands';

export const useAlias = (alias: string, tarCommand: string) => {
  if (commandMap[alias]) {
    throw new Error(`Command: ${alias} already have existed!`);
  }
  const command = commandMap[tarCommand];

  if (command) {
    commandMap[alias] = command;
  } else {
    throw new Error(`Unable to find corresponding command: ${tarCommand}!`);
  }
};

export const fillSpace = (n: number) => {
  return Array(n)
    .fill(0)
    .reduce((prev) => prev + '&nbsp;', '');
};

export const matchUnequalCount = (
  commandName: string,
  field: 'param' | 'option',
  expectCount: number,
  realCount: number
) => {
  return `${commandName} 命令预期接收 ${expectCount} 个${
    field === 'option' ? '配置' : '参数'
  }，但获得了 ${realCount} 个`;
};
