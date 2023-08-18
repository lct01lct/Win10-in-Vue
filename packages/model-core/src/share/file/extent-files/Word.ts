import { CustomFile, Files, defineFileDefaultOption } from '../File';
import WordIcon from './img/word-icon.png';

export class WordFile extends Files implements CustomFile {}

export interface WordFile {
  extension: 'docx';
}

defineFileDefaultOption(WordFile, { defaultIcon: WordIcon, extension: 'docx' });
