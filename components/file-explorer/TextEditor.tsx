/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Save, FileText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TextEditorProps {
  file: { id: string; name: string; content: string };
  onSave: (id: string, content: string) => void;
  onClose: () => void;
}

export function TextEditor({ file, onSave, onClose }: TextEditorProps) {
  const [content, setContent] = useState(file.content);
  const [saved, setSaved] = useState(true);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setContent(file.content);
    setSaved(true);
    setJustSaved(false);
  }, [file.id]);

  const handleSave = () => {
    onSave(file.id, content);
    setSaved(true);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleChange = (val: string) => {
    setContent(val);
    setSaved(false);
    setJustSaved(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Back">
          <ArrowLeft className="size-4" />
        </Button>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <FileText className="size-4 text-zinc-500" />
          </div>
          <span className="truncate text-sm font-semibold">{file.name}</span>
          {!saved && (
            <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              Unsaved
            </span>
          )}
          {justSaved && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <Check className="size-3" />
              Saved
            </span>
          )}
        </div>

        <p className="hidden text-xs text-muted-foreground sm:block">
          Ctrl+S to save
        </p>

        <Button
          size="sm"
          onClick={handleSave}
          disabled={saved}
          className="shrink-0 gap-1.5"
        >
          <Save className="size-3.5" />
          Save
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <textarea
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Start writing..."
          autoFocus
          spellCheck
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
              e.preventDefault();
              handleSave();
            }
          }}
          className="h-full w-full flex-1 resize-none bg-background p-6 font-mono text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground md:p-10 lg:p-16"
        />
      </div>
    </div>
  );
}
