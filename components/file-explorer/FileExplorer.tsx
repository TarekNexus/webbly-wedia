'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useFileSystem } from './use-file-system';
import { Sidebar } from './Sidebar';
import { MainPanel } from './MainPanel';
import { TextEditor } from './TextEditor';
import { CreateDialog } from './CreateDialog';
import { RenameDialog } from './RenameDialog';
import { DeleteDialog } from './DeleteDialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type DialogState =
  | { kind: 'create'; parentId: string; initialType?: 'folder' | 'text' }
  | { kind: 'rename'; nodeId: string; currentName: string; nodeType: 'folder' | 'text' }
  | { kind: 'delete'; nodeId: string; nodeName: string }
  | null;

export function FileExplorer() {
  const fs = useFileSystem();
  const [dialog, setDialog] = useState<DialogState>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCreate = (parentId: string, type?: 'folder' | 'text') =>
    setDialog({ kind: 'create', parentId, initialType: type });

  const handleRename = (nodeId: string, currentName: string, nodeType: 'folder' | 'text') =>
    setDialog({ kind: 'rename', nodeId, currentName, nodeType });

  const handleDelete = (nodeId: string, nodeName: string) =>
    setDialog({ kind: 'delete', nodeId, nodeName });

  const closeDialog = () => setDialog(null);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* ── Header ── */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur-sm z-20">
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          aria-label="Toggle sidebar"
          onClick={() => setSidebarOpen((o) => !o)}
        >
          <Menu className="size-4" />
        </Button>

        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Webbly Media"
            width={142}
            height={42}
            className="rounded-lg object-contain"
            priority
          />
         
        </div>
      </header>

      {/* ── Body ── */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar ── */}
        <aside
          className={cn(
            'fixed bottom-0 top-14 left-0 z-40 w-64 shrink-0 overflow-y-auto border-r bg-sidebar transition-transform duration-200 ease-in-out',
            'md:relative md:top-auto md:bottom-auto md:z-auto md:flex md:translate-x-0 md:flex-col',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex items-center justify-between px-3 py-2 md:hidden">
            <span className="text-xs font-semibold text-muted-foreground">Menu</span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="size-3.5" />
            </Button>
          </div>

          <Sidebar
            root={fs.root}
            selectedId={fs.selectedId}
            expanded={fs.expanded}
            onNavigate={(id) => {
              fs.navigateTo(id);
              setSidebarOpen(false);
            }}
            onToggle={fs.toggleFolder}
            onCreate={(parentId) => {
              handleCreate(parentId);
              setSidebarOpen(false);
            }}
            onRename={(nodeId, name, type) => {
              handleRename(nodeId, name, type);
              setSidebarOpen(false);
            }}
            onDelete={(nodeId, name) => {
              handleDelete(nodeId, name);
              setSidebarOpen(false);
            }}
          />
        </aside>

        {/* ── Main Panel ── */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <MainPanel
            folder={fs.selectedFolder}
            breadcrumb={fs.breadcrumb}
            onNavigate={fs.navigateTo}
            onOpenFile={fs.openTextFile}
            onCreate={handleCreate}
            onRename={handleRename}
            onDelete={handleDelete}
          />
        </main>
      </div>

      {/* ── Text Editor overlay ── */}
      {fs.openedFile && (
        <TextEditor
          file={fs.openedFile}
          onSave={fs.saveContent}
          onClose={fs.closeTextFile}
        />
      )}

      {/* ── Dialogs ── */}
      {dialog?.kind === 'create' && (
        <CreateDialog
          initialType={dialog.initialType}
          onConfirm={(type, name) => {
            if (type === 'folder') fs.createFolder(dialog.parentId, name);
            else fs.createFile(dialog.parentId, name);
            closeDialog();
          }}
          onClose={closeDialog}
        />
      )}

      {dialog?.kind === 'rename' && (
        <RenameDialog
          currentName={dialog.currentName}
          nodeType={dialog.nodeType}
          onConfirm={(name) => {
            fs.renameItem(dialog.nodeId, name);
            closeDialog();
          }}
          onClose={closeDialog}
        />
      )}

      {dialog?.kind === 'delete' && (
        <DeleteDialog
          nodeName={dialog.nodeName}
          onConfirm={() => {
            fs.deleteItem(dialog.nodeId);
            closeDialog();
          }}
          onClose={closeDialog}
        />
      )}
    </div>
  );
}
