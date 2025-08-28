import { marked } from 'marked';

const MarkdownPreview = ({ content }) => {
  const html = marked.parse(content || '');
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ 
        border: '1px solid #ddd', 
        padding: '1rem', 
        borderRadius: '4px',
        minHeight: '100px'
      }}
    />
  );
};

export default MarkdownPreview;