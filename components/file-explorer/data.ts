import type { FolderNode } from './types';

export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export const INITIAL_FS: FolderNode = {
  id: 'root',
  name: 'My Drive',
  type: 'folder',
  children: [
    {
      id: 'fd-documents',
      name: 'Documents',
      type: 'folder',
      children: [
        {
          id: 'ft-readme',
          name: 'README.txt',
          type: 'text',
          content:
            'Welcome to WebblyFiles!\n\nThis is a sample text file.\nClick any text file to view and edit its content.\n\nFeatures:\n- Create folders and text files\n- Rename items\n- Delete items (with all their contents)\n- Edit and save text content\n- Right-click any item for more options',
        },
        {
          id: 'ft-notes',
          name: 'Meeting Notes.txt',
          type: 'text',
          content:
            'Meeting Notes — Q2 2026\n\n• Discussed project timeline and milestones\n• Reviewed latest design mockups from the team\n• Assigned action items to team members\n• Next meeting scheduled for next week\n\nAction Items:\n- [ ] Update roadmap document\n- [ ] Share mockups with stakeholders\n- [ ] Schedule follow-up call',
        },
      ],
    },
    {
      id: 'fd-projects',
      name: 'Projects',
      type: 'folder',
      children: [
        {
          id: 'fd-platform',
          name: 'Webbly Platform',
          type: 'folder',
          children: [
            {
              id: 'ft-roadmap',
              name: 'Roadmap.txt',
              type: 'text',
              content:
                'Webbly Platform Roadmap 2026\n============================\n\nQ1: Core infrastructure & API\nQ2: User onboarding & dashboard\nQ3: Analytics & reporting\nQ4: Mobile application\n\nKey priorities:\n- Performance optimization\n- Security hardening\n- Developer experience',
            },
          ],
        },
        {
          id: 'fd-design',
          name: 'Design System',
          type: 'folder',
          children: [],
        },
      ],
    },
    {
      id: 'fd-personal',
      name: 'Personal',
      type: 'folder',
      children: [
        {
          id: 'ft-todo',
          name: 'Todo.txt',
          type: 'text',
          content:
            'My Todo List\n============\n\n[x] Set up Next.js project\n[x] Configure Tailwind CSS\n[ ] Complete file explorer task\n[ ] Review design feedback\n[ ] Update documentation\n[ ] Deploy to production',
        },
      ],
    },
  ],
};
