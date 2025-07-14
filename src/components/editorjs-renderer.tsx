
'use client';

import React from 'react';
import type { OutputData, BlockToolData } from '@editorjs/editorjs';

interface EditorJSRendererProps {
  data: OutputData | string;
}

// A simple type guard to check if the data is a valid OutputData object
function isOutputData(data: any): data is OutputData {
    return typeof data === 'object' && data !== null && Array.isArray(data.blocks) && 'version' in data;
}

const renderers: { [key: string]: (data: BlockToolData, blockId: string) => React.ReactNode } = {
  header: (data, blockId) => {
    const Tag = `h${data.level}` as keyof JSX.IntrinsicElements;
    return <Tag key={blockId} dangerouslySetInnerHTML={{ __html: data.text }} />;
  },
  paragraph: (data, blockId) => {
    return <p key={blockId} dangerouslySetInnerHTML={{ __html: data.text }} />;
  },
  list: (data, blockId) => {
    const Tag = data.style === 'ordered' ? 'ol' : 'ul';
    return (
      <Tag key={blockId}>
        {data.items.map((item: string, index: number) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </Tag>
    );
  },
  quote: (data, blockId) => {
    return (
      <blockquote key={blockId}>
        <p dangerouslySetInnerHTML={{ __html: data.text }} />
        {data.caption && <cite dangerouslySetInnerHTML={{ __html: data.caption }} />}
      </blockquote>
    );
  },
  delimiter: (_data, blockId) => {
    return <hr key={blockId} />;
  },
  // Add other renderers as needed
};

const EditorJSRenderer: React.FC<EditorJSRendererProps> = ({ data }) => {
    let parsedData: OutputData | null = null;

    if (isOutputData(data)) {
        parsedData = data;
    } else if (typeof data === 'string') {
        try {
            // Attempt to parse if it's a stringified JSON
            const jsonData = JSON.parse(data);
            if (isOutputData(jsonData)) {
                parsedData = jsonData;
            }
        } catch (error) {
            // If parsing fails, it's likely plain text.
            // We'll wrap it in a simple block structure.
        }
        
        if (!parsedData) {
            parsedData = {
                time: Date.now(),
                blocks: [{ id: 'fallback-string', type: 'paragraph', data: { text: data } }],
                version: "2.30.2"
            };
        }
    }

    if (!parsedData || !Array.isArray(parsedData.blocks)) {
        console.warn("Invalid data passed to EditorJSRenderer", data);
        return <div className="text-red-500">Could not render content.</div>;
    }
  
  return (
    <>
      {parsedData.blocks.map((block) => {
        if (!block || typeof block.type !== 'string' || !block.data) {
            console.warn('Skipping malformed block:', block);
            return null;
        }

        const renderer = renderers[block.type];
        if (!renderer) {
          console.warn(`No renderer for block type: ${block.type}`);
          // Fallback to rendering a simple paragraph with stringified data
          return <p key={block.id || Math.random()}>{JSON.stringify(block.data)}</p>;
        }
        return renderer(block.data, block.id || Math.random().toString());
      })}
    </>
  );
};

export default EditorJSRenderer;
