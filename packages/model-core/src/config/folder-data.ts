import { Desc } from '../share';

export const renameFolder = (query: string, newName: string) => {
  const folderNode = Desc.findOne(query);
  if (folderNode) {
    folderNode.name = newName;
  }

  return folderNode;
};

export const deleteFolder = (query: string) => {
  const folderNode = Desc.findOne(query);
  if (folderNode) {
    folderNode.parent.removeFolder(folderNode);
  }

  return folderNode;
};
