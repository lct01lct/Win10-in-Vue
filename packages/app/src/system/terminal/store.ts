import { Command, Drive, Pointer } from './types';

export interface TerminalItem {
  input: string;
  output: string;
  drive: string;
}

export const terminalList = reactive<TerminalItem[]>([]);
export const addNewTerminalItem = (item: TerminalItem) => {
  terminalList.push(item);
};

// cache

type PromptVal = string;
type DriveMap = Map<PromptVal, Command>;

const queryCommandCache = new Map<Drive, DriveMap>();

export const deleteCache = (drive: Drive) => {
  if (queryCommandCache.has(drive)) {
    queryCommandCache.delete(drive);
  }
};

export const setCache = (drive: Drive, prompt: PromptVal, res: Command) => {
  let driveCache = queryCommandCache.get(drive);

  if (!driveCache) {
    driveCache = new Map<PromptVal, Command>();
  }

  let resCache = driveCache.get(prompt);

  if (!resCache) {
    resCache = res;
  }
};

export const getCache = (drive: Drive, prompt: PromptVal) => {
  return queryCommandCache.get(drive)?.get(prompt);
};

export const currPointer = ref<Pointer>();
