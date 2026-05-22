# WebblyFiles — Mini File Explorer

A mini file explorer web application built for **Webbly Media (Sweden)** as a frontend engineering task. Users can manage folders and files in a simple hierarchical structure, similar to a basic desktop file manager.

---

## Features

- **Folder & File Tree** — hierarchical sidebar tree view with expand/collapse support
- **Nested Folders** — unlimited depth folder nesting
- **Create** — add new folders or text files inside any folder via toolbar or right-click menu
- **Rename** — update the name of any folder or file
- **Delete** — remove a folder or file; deleting a folder removes all of its contents
- **Navigate** — click folders in the sidebar or main panel to open them; breadcrumb trail for context
- **Text Editor** — click any text file to open a full-screen editor with live unsaved-changes indicator and Ctrl+S / Cmd+S save shortcut
- **Persistent Storage** — file system state is saved to `localStorage` and survives page refreshes
- **Right-click Context Menus** — rename, delete, and create options on every item
- **Responsive Design** — sidebar collapses to a slide-in drawer on mobile

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org) | App Router, React Server & Client Components |
| [TypeScript](https://www.typescriptlang.org) | Type safety throughout |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [Shadcn ui](https://ui.shadcn.com) | Accessible Dialog, AlertDialog, ContextMenu, DropdownMenu primitives |
| [Lucide React](https://lucide.dev) | Icons |


No backend required — all data lives in the browser via `localStorage`.

---

## Getting Started

### Prerequisites

- Node.js 
- npm / pnpm

### Installation

```bash
git clone  https://github.com/TarekNexus/Webbly-Media 
cd Webbly-Media
npm install
```

### Development

```bash
npm run dev
```

Open [https://webbly-media.vercel.app](https://webbly-media.vercel.app) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## Project Structure

```
webbly-media/
├── app/
│   ├── globals.css           # Tailwind  + Satoshi font + CSS variables
│   ├── layout.tsx            # Root layout with font setup
│   └── page.tsx              # Entry point — renders <FileExplorer />
│
├── components/
│   ├── file-explorer/
│   │   ├── types.ts           # FolderNode, TextFileNode, FileSystemNode types
│   │   ├── data.ts            # Initial file system data + generateId()
│   │   ├── use-file-system.ts # State management hook (CRUD + localStorage)
│   │   ├── FileExplorer.tsx   # Root layout component, dialog state
│   │   ├── Sidebar.tsx        # Left panel container
│   │   ├── TreeNode.tsx       # Recursive sidebar tree with context menu
│   │   ├── MainPanel.tsx      # Content area with breadcrumb + New dropdown
│   │   ├── ItemCard.tsx       # Grid card with context menu
│   │   ├── TextEditor.tsx     # Full-screen text file editor
│   │   ├── CreateDialog.tsx   # Create folder/file dialog
│   │   ├── RenameDialog.tsx   # Rename dialog
│   │   └── DeleteDialog.tsx   # Delete confirmation dialog
│   └── ui/
│       └── button.tsx         # shadcn/ui Button component
│
└── public/
    └── logo.png              # Webbly Media logo
```

---

## Usage

### Creating items
Click the **New** button in the toolbar and choose **New Folder** or **New Text File**. You can also right-click any folder in the sidebar or main panel and select **New item**.

### Renaming
Right-click any file or folder → **Rename**, or use the context menu card in the main panel.

### Deleting
Right-click → **Delete**. A confirmation dialog appears before any deletion. Deleting a folder removes all of its contents permanently.

### Editing text files
Click any text file card to open the full-screen editor. The editor shows an **Unsaved** badge when there are pending changes. Press **Ctrl+S** (or **Cmd+S** on Mac) or click **Save** to persist.

---


