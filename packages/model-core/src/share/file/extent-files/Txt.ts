import { CustomFile, Files, defineFileDefaultOption } from '../File';

import TxtIcon from './img/document.png';

export class TxtFile extends Files implements CustomFile {}

export interface TxtFile {
  extension: 'txt';
}

defineFileDefaultOption(TxtFile, {
  defaultIcon: TxtIcon,
  extension: 'txt',
});
