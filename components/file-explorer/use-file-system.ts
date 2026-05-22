/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

import { useCallback, useEffect, useState } from 'react';
import type { FileSystemNode, FolderNode, TextFileNode } from './types';
import { INITIAL_FS, generateId } from './data';

const STORAGE_KEY = 'webbly-files-v1';

function findNode(folder: FolderNode, id: string): FileSystemNode | null {
  if (folder.id === id) return folder;
  for (const child of folder.children) {
    if (child.id === id) return child;
    if (child.type === 'folder') {
      const found = findNode(child, id);
      if (found) return found;
    }
  }
  return null;
}

function addNode(folder: FolderNode, parentId: string, node: FileSystemNode): FolderNode {
  if (folder.id === parentId) {
    return { ...folder, children: [...folder.children, node] };
  }
  return {
    ...folder,
    children: folder.children.map((c) =>
      c.type === 'folder' ? addNode(c, parentId, node) : c
    ),
  };
}

function removeNode(folder: FolderNode, nodeId: string): FolderNode {
  return {
    ...folder,
    children: folder.children
      .filter((c) => c.id !== nodeId)
      .map((c) => (c.type === 'folder' ? removeNode(c, nodeId) : c)),
  };
}

function patchNode(
  folder: FolderNode,
  nodeId: string,
  patch: Partial<FileSystemNode>
): FolderNode {
  return {
    ...folder,
    children: folder.children.map((c) => {
      if (c.id === nodeId) return { ...c, ...patch } as FileSystemNode;
      if (c.type === 'folder') return patchNode(c, nodeId, patch);
      return c;
    }),
  };
}

function getPath(
  folder: FolderNode,
  targetId: string,
  acc: FolderNode[] = []
): FolderNode[] | null {
  if (folder.id === targetId) return [...acc, folder];
  for (const c of folder.children) {
    if (c.type === 'folder') {
      const path = getPath(c, targetId, [...acc, folder]);
      if (path) return path;
    }
  }
  return null;
}

export type OpenedFile = { id: string; name: string; content: string };

export function useFileSystem() {
  const [root, setRoot] = useState<FolderNode>(INITIAL_FS);
  const [loaded, setLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState('root');
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['root']));
  const [openedFile, setOpenedFile] = useState<OpenedFile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setRoot(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(root));
  }, [root, loaded]);

  // If the selected folder gets deleted, fall back to root
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!findNode(root, selectedId)) setSelectedId('root');
  }, [root, selectedId]);

  const selectedFolder =
    (findNode(root, selectedId) as FolderNode | null) ?? root;
  const breadcrumb = getPath(root, selectedId) ?? [root];

  const createFolder = useCallback((parentId: string, name: string) => {
    const node: FolderNode = {
      id: generateId(),
      name: name.trim(),
      type: 'folder',
      children: [],
    };
    setRoot((r) => addNode(r, parentId, node));
  }, []);

  const createFile = useCallback((parentId: string, name: string) => {
    const trimmed = name.trim();
    const finalName = trimmed.endsWith('.txt') ? trimmed : `${trimmed}.txt`;
    const node: TextFileNode = {
      id: generateId(),
      name: finalName,
      type: 'text',
      content: '',
    };
    setRoot((r) => addNode(r, parentId, node));
  }, []);

  const deleteItem = useCallback((nodeId: string) => {
    setRoot((r) => removeNode(r, nodeId));
    setExpanded((prev) => {
      const next = new Set(prev);
      next.delete(nodeId);
      return next;
    });
  }, []);

  const renameItem = useCallback((nodeId: string, name: string) => {
    setRoot((r) => patchNode(r, nodeId, { name: name.trim() }));
  }, []);

  const saveContent = useCallback((fileId: string, content: string) => {
    setRoot((r) => patchNode(r, fileId, { content } as Partial<FileSystemNode>));
    setOpenedFile((f) => (f?.id === fileId ? { ...f, content } : f));
  }, []);

  const navigateTo = useCallback((folderId: string) => {
    setSelectedId(folderId);
    setExpanded((prev) => new Set([...prev, folderId]));
  }, []);

  const toggleFolder = useCallback((folderId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(folderId) ? next.delete(folderId) : next.add(folderId);
      return next;
    });
  }, []);

  const openTextFile = useCallback(
    (fileId: string) => {
      const node = findNode(root, fileId);
      if (node?.type === 'text') {
        setOpenedFile({ id: node.id, name: node.name, content: node.content });
      }
    },
    [root]
  );

  const closeTextFile = useCallback(() => setOpenedFile(null), []);

  return {
    root,
    selectedFolder,
    selectedId,
    breadcrumb,
    expanded,
    openedFile,
    createFolder,
    createFile,
    deleteItem,
    renameItem,
    saveContent,
    navigateTo,
    toggleFolder,
    openTextFile,
    closeTextFile,
  };
}
