'use client';

import * as React from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  const { quill, quillRef } = useQuill();

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill, onChange]);
  
  React.useEffect(() => {
    if (quill && value !== quill.root.innerHTML) {
        const delta = quill.clipboard.convert(value);
        quill.setContents(delta, 'silent');
    }
  }, [quill, value])

  return (
    <div className="bg-white">
      <div ref={quillRef} />
    </div>
  );
};

export default QuillEditor;
