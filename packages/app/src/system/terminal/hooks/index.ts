export const useAlias = (alias: string, tarCommand: string) => {};

export const useSpace = (n: number) => {
  return Array(n)
    .fill(0)
    .reduce((prev) => prev + '&nbsp;', '');
};

export const useMatchUnequalCount = (
  commandName: string,
  field: 'param' | 'option',
  expectCount: number,
  realCount: number
) => {
  return `${commandName} 命令预期接收 ${expectCount} 个${
    field === 'option' ? '配置' : '参数'
  }，但获得了 ${realCount} 个`;
};
