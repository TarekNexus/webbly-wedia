'use client';

import { ChevronRight, FolderOpen, Plus, Folder, FileText } from 'lucide-react';
import { DropdownMenu } from 'radix-ui';
import { Button } from '@/components/ui/button';
import { ItemCard } from './ItemCard';
import { cn } from '@/lib/utils';
import type { FolderNode } from './types';

interface MainPanelProps {
  folder: FolderNode;
  breadcrumb: FolderNode[];
  onNavigate: (id: string) => void;
  onOpenFile: (id: string) => void;
  onCreate: (parentId: string, type?: 'folder' | 'text') => void;
  onRename: (nodeId: string, currentName: string, nodeType: 'folder' | 'text') => void;
  onDelete: (nodeId: string, nodeName: string) => void;
}

export function MainPanel({
  folder,
  breadcrumb,
  onNavigate,
  onOpenFile,
  onCreate,
  onRename,
  onDelete,
}: MainPanelProps) {
  const folders = folder.children.filter((c) => c.type === 'folder');
  const files = folder.children.filter((c) => c.type === 'text');

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-b bg-background/95 backdrop-blur px-4 py-2.5">
        {/* Breadcrumb */}
        <nav className="flex min-w-0 flex-1 items-center gap-0.5 text-base">
          {breadcrumb.map((node, i) => (
            <span key={node.id} className="flex items-center gap-0.5 min-w-0">
              {i > 0 && (
                <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/60" />
              )}
              <button
                onClick={() => onNavigate(node.id)}
                className={cn(
                  'max-w-35 truncate rounded px-1.5 py-0.5 transition-colors',
                  i === breadcrumb.length - 1
                    ? 'font-semibold text-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                {node.name}
              </button>
            </span>
          ))}
        </nav>

        {/* New button */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button size="sm" className="shrink-0 gap-1.5">
              <Plus className="size-3.5" />
              New
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={6}
              className="z-50 min-w-44 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg animate-in fade-in-0 zoom-in-95"
            >
              <DropdownMenu.Item
                onSelect={() => onCreate(folder.id, 'folder')}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-foreground outline-none transition-colors hover:bg-accent focus:bg-accent"
              >
                <Folder className="size-3.5 text-blue-500" />
                New Folder
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => onCreate(folder.id, 'text')}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-foreground outline-none transition-colors hover:bg-accent focus:bg-accent"
              >
                <FileText className="size-3.5 text-zinc-500" />
                New Text File
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {folder.children.length === 0 ? (
          <div className="flex h-56 flex-col items-center justify-center gap-3 text-muted-foreground">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/50">
              <FolderOpen className="size-8 opacity-40" />
            </div>
            <div className="text-center">
              <p className="text-base font-medium">This folder is empty</p>
              <p className="mt-0.5 text-sm text-muted-foreground/70">
                Create a folder or file to get started
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 gap-1.5"
              onClick={() => onCreate(folder.id)}
            >
              <Plus className="size-3.5" />
              Add something
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {folders.length > 0 && (
              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Folders
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                  {folders.map((node) => (
                    <ItemCard
                      key={node.id}
                      node={node}
                      onOpen={() => onNavigate(node.id)}
                      onRename={() => onRename(node.id, node.name, 'folder')}
                      onDelete={() => onDelete(node.id, node.name)}
                    />
                  ))}
                </div>
              </section>
            )}

            {files.length > 0 && (
              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Files
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                  {files.map((node) => (
                    <ItemCard
                      key={node.id}
                      node={node}
                      onOpen={() => onOpenFile(node.id)}
                      onRename={() => onRename(node.id, node.name, 'text')}
                      onDelete={() => onDelete(node.id, node.name)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
