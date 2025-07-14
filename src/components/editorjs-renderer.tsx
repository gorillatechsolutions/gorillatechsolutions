
'use client';

import React from 'react';
import type { OutputData, BlockToolData } from '@editorjs/editorjs';

interface EditorJSRendererProps {
  data: OutputData | string;
}

// A simple type guard to check if the data is OutputData
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
  delimiter: (blockId) => {
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
            // Fallback for content that might have been saved as a string
            const jsonData = JSON.parse(data);
            if (isOutputData(jsonData)) {
                parsedData = jsonData;
            }
        } catch (error) {
            // If parsing fails, treat it as plain text
            return <div dangerouslySetInnerHTML={{ __html: data }} />;
        }
    }

    if (!parsedData) {
        // Fallback for malformed but not stringified content
        return <div>Invalid content format</div>;
    }
  
  return (
    <>
      {parsedData.blocks.map((block) => {
        const renderer = renderers[block.type];
        return renderer ? renderer(block.data, block.id) : null;
      })}
    </>
  );
};

export default EditorJSRenderer;
