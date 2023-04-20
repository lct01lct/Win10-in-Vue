export interface TerminalItem {
  input: string;
  output: string;
}

export interface Command {
  type: 'post' | 'get';
}

export const terminalList = reactive<TerminalItem[]>([]);
export const addNewTerminalItem = (item: TerminalItem) => {
  terminalList.push(item);

  // TODO: get container height
};

const queryCommandCache = {};
