import { CustomFile, Files, defineFileDefaultOption } from '../File';

import ExcelIcon from './img/excel-icon.png';

export class ExcelFile extends Files implements CustomFile {}

export interface ExcelFile {
  extension: 'xlsx';
}

defineFileDefaultOption(ExcelFile, {
  defaultIcon: ExcelIcon,
  extension: 'xlsx',
});
