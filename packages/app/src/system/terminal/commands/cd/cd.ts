import { Command } from '../../types';

const templates: string[] = ['cd [..]', 'cd [/d] [<drive>:][<path>]'];

const cd: Command = {
  commandName: 'cd',
  type: 'get',
  effect: (params, options) => {
    console.log(params, options);
    return 'cd';
  },
};

export default cd;
