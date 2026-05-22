'use client';

import { Folder, FileText, Pencil, Trash2 } from 'lucide-react';
import { ContextMenu } from 'radix-ui';
import { cn } from '@/lib/utils';
import type { FileSystemNode } from './types';

interface ItemCardProps {
  node: FileSystemNode;
  onOpen: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export function ItemCard({ node, onOpen, onRename, onDelete }: ItemCardProps) {
  const isFolder = node.type === 'folder';

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <button
          onClick={onOpen}
          className={cn(
            'group flex flex-col items-center gap-2.5 rounded-xl border border-border/60 bg-card p-3.5 text-center transition-all duration-150 w-full',
            'hover:border-border hover:bg-accent hover:shadow-sm',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'active:scale-[0.97]'
          )}
        >
          <div
            className={cn(
              'flex size-16 items-center justify-center rounded-xl transition-transform duration-150 group-hover:scale-105',
              isFolder
                ? 'bg-blue-50 dark:bg-blue-950/40'
                : 'bg-zinc-50 dark:bg-zinc-900/60'
            )}
          >
            {isFolder ? (
              <Folder className="size-9 text-blue-500" />
            ) : (
              <FileText className="size-9 text-zinc-400 dark:text-zinc-500" />
            )}
          </div>

          <span className="w-full truncate text-sm font-semibold leading-snug text-foreground">
            {node.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {isFolder ? 'Folder' : 'Text file'}
          </span>
        </button>
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content className="z-50 min-w-44 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg animate-in fade-in-0 zoom-in-95">
          <ContextMenu.Item
            onSelect={onOpen}
            className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-base text-foreground outline-none transition-colors hover:bg-accent focus:bg-accent"
          >
            {isFolder ? (
              <Folder className="size-3.5 text-blue-500" />
            ) : (
              <FileText className="size-3.5 text-muted-foreground" />
            )}
            {isFolder ? 'Open folder' : 'Open file'}
          </ContextMenu.Item>
          <ContextMenu.Separator className="my-1 h-px bg-border" />
          <ContextMenu.Item
            onSelect={onRename}
            className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-base text-foreground outline-none transition-colors hover:bg-accent focus:bg-accent"
          >
            <Pencil className="size-3.5 text-muted-foreground" />
            Rename
          </ContextMenu.Item>
          <ContextMenu.Item
            onSelect={onDelete}
            className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-base text-destructive outline-none transition-colors hover:bg-destructive/10 focus:bg-destructive/10"
          >
            <Trash2 className="size-3.5" />
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
