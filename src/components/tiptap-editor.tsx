
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Toggle } from '@/components/ui/toggle';
import { Bold, Italic, Strikethrough, List, ListOrdered, Heading2, Link as LinkIcon, Pilcrow } from 'lucide-react';
import { Separator } from './ui/separator';
import { useCallback } from 'react';

const TiptapToolbar = ({ editor }: { editor: any }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-transparent rounded-t-md p-1 flex flex-wrap items-center gap-1">
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleBold().run()} pressed={editor.isActive('bold')}>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleItalic().run()} pressed={editor.isActive('italic')}>
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleStrike().run()} pressed={editor.isActive('strike')}>
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-6" />
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} pressed={editor.isActive('heading', { level: 2 })}>
        <Heading2 className="h-4 w-4" />
      </Toggle>
       <Toggle size="sm" onPressedChange={() => editor.chain().focus().setParagraph().run()} pressed={editor.isActive('paragraph')}>
        <Pilcrow className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleBulletList().run()} pressed={editor.isActive('bulletList')}>
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleOrderedList().run()} pressed={editor.isActive('orderedList')}>
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-6" />
       <Toggle size="sm" onClick={setLink} pressed={editor.isActive('link')}>
        <LinkIcon className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export const TiptapEditor = ({ content, onChange }: { content: string; onChange: (richText: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
            HTMLAttributes: {
                class: 'list-disc pl-4',
            },
        },
        orderedList: {
            HTMLAttributes: {
                class: 'list-decimal pl-4',
            },
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
            class: 'text-primary underline',
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'rounded-b-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px] border-t-0',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  
  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
