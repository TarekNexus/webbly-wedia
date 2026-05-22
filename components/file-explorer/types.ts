export interface FolderNode {
  id: string;
  name: string;
  type: 'folder';
  children: FileSystemNode[];
}

export interface TextFileNode {
  id: string;
  name: string;
  type: 'text';
  content: string;
}

export type FileSystemNode = FolderNode | TextFileNode;
