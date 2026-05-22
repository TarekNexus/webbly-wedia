'use client';

import { AlertDialog } from 'radix-ui';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteDialogProps {
  nodeName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteDialog({ nodeName, onConfirm, onClose }: DeleteDialogProps) {
  return (
    <AlertDialog.Root open onOpenChange={(open) => !open && onClose()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in-0" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-5 shadow-xl animate-in fade-in-0 zoom-in-95">
          <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-destructive/10">
            <Trash2 className="size-5 text-destructive" />
          </div>
          <AlertDialog.Title className="mb-1 text-base font-semibold">
            Delete &ldquo;{nodeName}&rdquo;?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 text-sm text-muted-foreground">
            This action cannot be undone. All contents inside this item will be permanently deleted.
          </AlertDialog.Description>
          <div className="flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button variant="destructive" size="sm" onClick={onConfirm} className="gap-1.5">
                <Trash2 className="size-3.5" />
                Delete
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
