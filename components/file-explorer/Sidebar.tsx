'use client';

import { TreeNode } from './TreeNode';
import type { FolderNode } from './types';

interface SidebarProps {
  root: FolderNode;
  selectedId: string;
  expanded: Set<string>;
  onNavigate: (id: string) => void;
  onToggle: (id: string) => void;
  onOpenFile: (fileId: string) => void;
  onCreate: (parentId: string) => void;
  onRename: (nodeId: string, currentName: string, nodeType: 'folder' | 'text') => void;
  onDelete: (nodeId: string, nodeName: string) => void;
}

export function Sidebar({
  root,
  selectedId,
  expanded,
  onNavigate,
  onToggle,
  onOpenFile,
  onCreate,
  onRename,
  onDelete,
}: SidebarProps) {
  return (
    <nav className="flex flex-col gap-0.5 p-2 pb-6">
      <p className="px-2 pb-1.5 pt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Explorer
      </p>
      <TreeNode
        node={root}
        depth={0}
        selectedId={selectedId}
        expanded={expanded}
        onNavigate={onNavigate}
        onToggle={onToggle}
        onOpenFile={onOpenFile}
        onCreate={onCreate}
        onRename={onRename}
        onDelete={onDelete}
        isRoot
      />
    </nav>
  );
}
