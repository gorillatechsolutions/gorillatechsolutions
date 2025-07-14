
'use client';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const QuillEditor = ({ value, onChange, className }: QuillEditorProps) => {

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ],
    }), []);

    return (
        <div className={cn('bg-background', className)}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
            />
        </div>
    );
};

export default QuillEditor;
