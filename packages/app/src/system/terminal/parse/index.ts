export const getAnswer = (iptVal: string) => {
  if (!iptVal) {
    return '';
  }
  return `'${iptVal}'不是内部或外部命令，也不是可运行的程序或批处理文件。`;
};

export const parse = () => {};
