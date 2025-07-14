
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

const QuillEditor = ({ value, onChange, className }: QuillEditorProps) => {
    
    // This is a workaround for the React 18 strict mode issue with react-quill
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className={cn('bg-background h-full', className)}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                className="h-[calc(100%-42px)]" // Adjust height to fit toolbar
            />
        </div>
    );
};

export default QuillEditor;
