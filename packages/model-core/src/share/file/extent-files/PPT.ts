import { CustomFile, Files, defineFileDefaultOption } from '../File';
import PptIcon from './img/ppt-icon.png';

export class PptFile extends Files implements CustomFile {}

export interface PptFile {
  extension: 'pptx';
}

defineFileDefaultOption(PptFile, {
  defaultIcon: PptIcon,
  extension: 'pptx',
});
