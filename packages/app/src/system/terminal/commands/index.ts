import type { Command } from '../types';
const modules = import.meta.glob<{
  default: Command;
}>('./**/**.ts', { eager: true });

const commandMap: Record<Command['commandName'], Command> = {};

for (const module in modules) {
  const _command = modules[module].default;
  commandMap[_command.commandName] = _command;
}

export { commandMap };
