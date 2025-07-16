'use client';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  return (
    <div className="bg-background">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          className="bg-white"
        />
    </div>
  );
};

export default QuillEditor;
