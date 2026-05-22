'use client';

import { useState } from 'react';
import { Dialog } from 'radix-ui';
import { Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RenameDialogProps {
  currentName: string;
  nodeType: 'folder' | 'text';
  onConfirm: (name: string) => void;
  onClose: () => void;
}

export function RenameDialog({ currentName, nodeType, onConfirm, onClose }: RenameDialogProps) {
  const [name, setName] = useState(currentName);

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    if (trimmed !== currentName) onConfirm(trimmed);
    else onClose();
  };

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-5 shadow-xl animate-in fade-in-0 zoom-in-95">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <Pencil className="size-4 text-primary" />
              </div>
              <Dialog.Title className="text-base font-semibold">
                Rename {nodeType === 'folder' ? 'Folder' : 'File'}
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon-xs">
                <X className="size-3.5" />
              </Button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="mb-4 text-sm text-muted-foreground">
            Enter a new name for &ldquo;{currentName}&rdquo;.
          </Dialog.Description>

          <form onSubmit={handleSubmit}>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">New name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={!name.trim()}>
                Rename
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
