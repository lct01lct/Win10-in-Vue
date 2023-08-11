import { Desc, Folder } from '../share';
import { deskTopData } from './bin-data';

export const renameFolder = (query: string, newName: string) => {
  const folderNode = Desc.findOne(query);
  if (folderNode) {
    folderNode.name = newName;
  }

  return folderNode;
};
