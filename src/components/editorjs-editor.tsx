
'use client';

import React, { memo, useEffect, useRef } from 'react';
import EditorJS, { type OutputData } from '@editorjs/editorjs';

// Define tool types to avoid TypeScript errors with dynamic imports
type ToolConstructable = new (config: any) => any;
type Tool = ToolConstructable | any; // Allow for dynamic imports

// Define the editor tools configuration in a separate object
const EDITOR_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph configuration.
    // paragraph: Paragraph,
    header: async () => {
        const Header = (await import('@editorjs/header')).default;
        return Header as Tool;
    },
    list: async () => {
        const List = (await import('@editorjs/list')).default;
        return List as Tool;
    },
    quote: async () => {
        const Quote = (await import('@editorjs/quote')).default;
        return Quote as Tool;
    },
    delimiter: async () => {
        const Delimiter = (await import('@editorjs/delimiter')).default;
        return Delimiter as Tool;
    },
};

interface EditorProps {
    data?: OutputData;
    onChange: (data: OutputData) => void;
    holder: string;
}

const EditorjsEditor = ({ data, onChange, holder }: EditorProps) => {
    //add a reference to editor
    const ref = useRef<EditorJS | null>(null);

    //initialize editorjs
    useEffect(() => {
        //initialize editor if we don't have a reference
        if (!ref.current) {
            const editor = new EditorJS({
                holder: holder,
                tools: EDITOR_TOOLS,
                data,
                async onChange(api, event) {
                    const savedData = await api.saver.save();
                    onChange(savedData);
                },
                placeholder: 'Start writing your story...',
            });
            ref.current = editor;
        }

        //add a return function handle cleanup
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
                ref.current = null;
            }
        };
    }, []);

    return <div id={holder} className='prose max-w-full' />;
};

export default memo(EditorjsEditor);
