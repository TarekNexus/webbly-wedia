'use client';

import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  FileText,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react';
import { ContextMenu } from 'radix-ui';
import { cn } from '@/lib/utils';
import type { FolderNode, FileSystemNode } from './types';

interface TreeNodeProps {
  node: FileSystemNode;
  depth: number;
  selectedId: string;
  expanded: Set<string>;
  onNavigate: (id: string) => void;
  onToggle: (id: string) => void;
  onCreate: (parentId: string) => void;
  onRename: (nodeId: string, currentName: string, nodeType: 'folder' | 'text') => void;
  onDelete: (nodeId: string, nodeName: string) => void;
  isRoot?: boolean;
}

export function TreeNode({
  node,
  depth,
  selectedId,
  expanded,
  onNavigate,
  onToggle,
  onCreate,
  onRename,
  onDelete,
  isRoot,
}: TreeNodeProps) {
  const isFolder = node.type === 'folder';
  const isExpanded = isFolder && expanded.has(node.id);
  const isSelected = selectedId === node.id;
  const folder = node as FolderNode;

  const handleRowClick = () => {
    if (isFolder) {
      onNavigate(node.id);
      if (!isExpanded) onToggle(node.id);
    }
  };

  const handleChevron = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(node.id);
  };

  return (
    <div>
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <button
            onClick={handleRowClick}
            style={{ paddingLeft: `${depth * 14 + 8}px` }}
            className={cn(
              'group flex w-full items-center gap-1.5 rounded-md py-2 pr-2 text-base transition-colors text-left select-none',
              isSelected && isFolder
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
            )}
          >
            <span
              onClick={handleChevron}
              className={cn(
                'flex size-4 shrink-0 items-center justify-center rounded',
                isFolder
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'pointer-events-none opacity-0'
              )}
            >
              {isFolder &&
                (isExpanded ? (
                  <ChevronDown className="size-3" />
                ) : (
                  <ChevronRight className="size-3" />
                ))}
            </span>

            {isFolder ? (
              isExpanded ? (
                <FolderOpen className="size-4 shrink-0 text-blue-500" />
              ) : (
                <Folder className="size-4 shrink-0 text-blue-500" />
              )
            ) : (
              <FileText className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
            )}

            <span className="truncate leading-none">{node.name}</span>
          </button>
        </ContextMenu.Trigger>

        <ContextMenu.Portal>
          <ContextMenu.Content className="z-50 min-w-40 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg animate-in fade-in-0 zoom-in-95">
            {isFolder && (
              <ContextMenu.Item
                onSelect={() => onCreate(node.id)}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-base text-foreground outline-none transition-colors hover:bg-accent focus:bg-accent"
              >
                <Plus className="size-3.5 text-muted-foreground" />
                New item
              </ContextMenu.Item>
            )}
            {!isRoot && (
              <>
                {isFolder && <ContextMenu.Separator className="my-1 h-px bg-border" />}
                <ContextMenu.Item
                  onSelect={() => onRename(node.id, node.name, node.type)}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-base text-foreground outline-none transition-colors hover:bg-accent focus:bg-accent"
                >
                  <Pencil className="size-3.5 text-muted-foreground" />
                  Rename
                </ContextMenu.Item>
                <ContextMenu.Item
                  onSelect={() => onDelete(node.id, node.name)}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-base text-destructive outline-none transition-colors hover:bg-destructive/10 focus:bg-destructive/10"
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </ContextMenu.Item>
              </>
            )}
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>

      {isFolder && isExpanded && folder.children.length > 0 && (
        <div>
          {folder.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              expanded={expanded}
              onNavigate={onNavigate}
              onToggle={onToggle}
              onCreate={onCreate}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
