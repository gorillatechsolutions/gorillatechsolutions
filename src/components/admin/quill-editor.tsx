'use client';

import * as React from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const quillInstance = React.useRef<Quill | null>(null);

  React.useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link', 'image', 'video'],
            ['clean']
          ],
        },
      });

      const quill = quillInstance.current;
      
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          let html = quill.root.innerHTML;
          if (html === '<p><br></p>') {
            html = '';
          }
          onChange(html);
        }
      });
    }
  }, [onChange]);

  React.useEffect(() => {
    const quill = quillInstance.current;
    if (quill && value !== quill.root.innerHTML) {
      quill.clipboard.dangerouslyPasteHTML(value, 'silent');
    }
  }, [value]);

  return (
    <div className="bg-white prose">
      <div ref={editorRef} />
    </div>
  );
};

export default QuillEditor;
