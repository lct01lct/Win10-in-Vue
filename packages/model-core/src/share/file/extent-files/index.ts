import { PptFile } from './PPT';
import { RtfFile } from './Rtf';
import { TxtFile } from './Txt';
import { WordFile } from './Word';
import { ExcelFile } from './Excel';
import { Files, InitFileOpt } from '../File';
import { Folder } from '../Folder';
import { Desc } from '../Desc';

// If the extension of the file is' ', it will be created by Files Class

export const CustomFileList = [PptFile, RtfFile, TxtFile, WordFile, ExcelFile, Files];

export const createFile = (option: InitFileOpt, parent?: Folder | Desc) => {
  const ext = option.extension;
  const map = CustomFileList.reduce((map, CustomFile) => {
    return map.set(CustomFile.prototype.extension, CustomFile), map;
  }, new Map<InitFileOpt['extension'], typeof Files>([]));

  const CustomFile = map.get(ext);

  if (CustomFile) {
    return new CustomFile(option, parent);
  }
  return new Files(option, parent);
};

export { PptFile, RtfFile, TxtFile, WordFile, ExcelFile };
