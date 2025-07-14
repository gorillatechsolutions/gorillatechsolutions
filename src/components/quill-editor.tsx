
'use client';

import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

const QuillEditor = ({ value, onChange, className }: QuillEditorProps) => {
    return (
        <div className={cn('h-full w-full flex flex-col', className)}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                className="flex-1 h-full [&>.ql-container]:border-0 [&>.ql-toolbar]:border-x-0 [&>.ql-toolbar]:border-t-0"
            />
        </div>
    );
};

export default QuillEditor;
