import { CustomFile, Files, defineFileDefaultOption } from '../File';
import RtfIcon from './img/rtf-icon.png';

export class RtfFile extends Files implements CustomFile {}

export interface RtfFile {
  extension: 'rtf';
}

defineFileDefaultOption(RtfFile, { defaultIcon: RtfIcon, extension: 'rtf' });
