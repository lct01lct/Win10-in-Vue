import { commandMap } from '../commands';
import { deleteCache, getCache, setCache } from '../store';
import { Drive, Option, Param } from '../types';
import CommandError from './error';

class HandleCommand {
  answer: string = '';
  private drive: Drive;
  private prompt: string;
  private options: Option[] = [];
  private params: Param[] = [];
  private commandName: string = '';

  constructor(drive: Drive, iptVal: string) {
    this.drive = drive;
    this.prompt = iptVal;
  }

  private isOption(val: string): val is Option {
    const condition: boolean[] = [!!val[1], val.startsWith('-'), val[1] !== '-'];
    return !condition.includes(false);
  }

  private resolveOption(val: string) {
    return val
      .slice(1)
      .split('')
      .map((item) => `-${item}`);
  }

  complie() {
    const drive = this.drive;
    const prompt = this.prompt;
    const product = prompt
      .trim()
      .split(' ')
      .filter((item) => item);

    const commandName = product[0]!; // 外部已经处理过空字符串
    this.commandName = commandName;
    const options = this.options;
    const params = this.params;

    for (let i = 1; i < product.length; i++) {
      const item = product[i];
      this.isOption(item) ? options.push(...this.resolveOption(item)) : params.push(item);
    }

    return this;
  }

  execute() {
    const commandName = this.commandName;
    const command = commandMap[commandName];

    // Whether to use cache
    if (command) {
      const commandName = this.commandName;
      const command = commandMap[commandName];
      const cacheRes = getCache(this.drive, commandName);

      if (command.type === 'get' && cacheRes) {
        this.answer = cacheRes.effect(this.options, this.params) || '';
      } else {
        this.answer = command.effect(this.options, this.params) || '';
        if (command.type === 'get') {
          setCache(this.drive, this.prompt, command);
        } else {
          deleteCache(this.drive);
        }
      }
    } else {
      new CommandError(
        'execute',
        `'${this.prompt}'不是内部或外部命令，也不是可运行的程序或批处理文件。`
      );
    }

    return this;
  }
}

export default HandleCommand;
