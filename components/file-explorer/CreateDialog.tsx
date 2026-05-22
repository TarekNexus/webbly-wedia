'use client';

import { useState } from 'react';
import { Dialog } from 'radix-ui';
import { Folder, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CreateDialogProps {
  initialType?: 'folder' | 'text';
  onConfirm: (type: 'folder' | 'text', name: string) => void;
  onClose: () => void;
}

export function CreateDialog({ initialType = 'folder', onConfirm, onClose }: CreateDialogProps) {
  const [type, setType] = useState<'folder' | 'text'>(initialType);
  const [name, setName] = useState('');

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!name.trim()) return;
    onConfirm(type, name);
  };

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-5 shadow-xl animate-in fade-in-0 zoom-in-95">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold">Create New</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon-xs">
                <X className="size-3.5" />
              </Button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="sr-only">
            Choose a type and enter a name to create a new folder or text file.
          </Dialog.Description>

          <div className="mb-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType('folder')}
              className={cn(
                'flex items-center gap-2.5 rounded-lg border p-3 text-sm transition-all text-left',
                type === 'folder'
                  ? 'border-primary bg-primary/5 font-medium text-foreground ring-1 ring-primary'
                  : 'border-border text-muted-foreground hover:border-foreground/30 hover:bg-accent hover:text-foreground'
              )}
            >
              <Folder
                className={cn('size-5 shrink-0', type === 'folder' ? 'text-blue-500' : 'text-muted-foreground')}
              />
              Folder
            </button>
            <button
              type="button"
              onClick={() => setType('text')}
              className={cn(
                'flex items-center gap-2.5 rounded-lg border p-3 text-sm transition-all text-left',
                type === 'text'
                  ? 'border-primary bg-primary/5 font-medium text-foreground ring-1 ring-primary'
                  : 'border-border text-muted-foreground hover:border-foreground/30 hover:bg-accent hover:text-foreground'
              )}
            >
              <FileText
                className={cn('size-5 shrink-0', type === 'text' ? 'text-zinc-500' : 'text-muted-foreground')}
              />
              Text File
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              {type === 'folder' ? 'Folder name' : 'File name'}
            </label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={type === 'folder' ? 'e.g. My Folder' : 'e.g. notes.txt'}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring transition-shadow"
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={!name.trim()}>
                Create
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
