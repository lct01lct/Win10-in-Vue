import CommandError from './error';
import HandleCommand from './handleCommand';

export const getAnswer = (drive: string, iptVal: string) => {
  try {
    if (iptVal) {
      return new HandleCommand(drive, iptVal).complie().execute().answer;
    } else {
      return '';
    }
  } catch (e: unknown) {
    const _e = e as CommandError;
    return _e.message || '';
  }
};
