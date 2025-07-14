
'use client';

import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const QuillEditor = ({ value, onChange, className }: QuillEditorProps) => {
    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            className={className}
        />
    );
};

export default QuillEditor;
