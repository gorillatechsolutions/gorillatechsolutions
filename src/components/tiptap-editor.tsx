
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { useCallback } from 'react';
import { Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, List, ListOrdered, Link as LinkIcon, Pilcrow, Image as ImageIcon, Youtube as YoutubeIcon } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';

const TiptapToolbar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }
  
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
  
  const addImage = useCallback(() => {
    const url = window.prompt('Image URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      })
    }
  }


  return (
    <div className="border border-input bg-transparent rounded-t-md p-1 flex flex-wrap items-center gap-1">
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} pressed={editor.isActive('heading', { level: 1 })}>
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} pressed={editor.isActive('heading', { level: 2 })}>
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} pressed={editor.isActive('heading', { level: 3 })}>
        <Heading3 className="h-4 w-4" />
      </Toggle>
       <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleParagraph().run()} pressed={editor.isActive('paragraph')}>
        <Pilcrow className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-6" />
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleBold().run()} pressed={editor.isActive('bold')}>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleItalic().run()} pressed={editor.isActive('italic')}>
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleStrike().run()} pressed={editor.isActive('strike')}>
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-6"/>
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleBulletList().run()} pressed={editor.isActive('bulletList')}>
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleOrderedList().run()} pressed={editor.isActive('orderedList')}>
        <ListOrdered className="h-4 w-4" />
      </Toggle>
       <Separator orientation="vertical" className="h-6"/>
       <Toggle size="sm" onPressedChange={setLink} pressed={editor.isActive('link')}>
        <LinkIcon className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onClick={addImage}>
        <ImageIcon className="h-4 w-4" />
      </Toggle>
       <Toggle size="sm" onClick={addYoutubeVideo} pressed={editor.isActive('youtube')}>
          <YoutubeIcon className="h-4 w-4" />
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
      Placeholder.configure({
        placeholder: 'Write your story here...',
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image,
      Youtube.configure({
        controls: false,
      }),
    ],
    content: content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl p-4 w-full focus:outline-none min-h-[400px]',
      },
    },
  });

  return (
    <div className="flex flex-col gap-0 h-full border border-input rounded-md">
      <TiptapToolbar editor={editor} />
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
