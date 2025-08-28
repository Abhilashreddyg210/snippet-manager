import { useState } from 'react';
import ReactSimpleCodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs'; // Import main prismjs package
import 'prismjs/themes/prism.css'; // Import prism theme

// Load specific language components
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-typescript';

const SnippetForm = ({ onSubmit, initialData = {}, loading = false }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [code, setCode] = useState(initialData.code || '');
  const [language, setLanguage] = useState(initialData.language || 'javascript');
  const [tags, setTags] = useState(initialData.tags ? initialData.tags.join(', ') : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const snippetData = {
      title,
      description,
      code,
      language,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    onSubmit(snippetData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '2rem', color: '#333' }}>
        {initialData._id ? 'Edit Snippet' : 'Create New Snippet'}
      </h2>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
          placeholder="Enter snippet title"
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
          placeholder="Describe what this code does"
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="typescript">TypeScript</option>
          <option value="php">PHP</option>
          <option value="c++">C++</option>
        </select>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Code *</label>
        <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
          <ReactSimpleCodeEditor
            value={code}
            onValueChange={setCode}
            highlight={code => highlight(code, languages[language], language)}
            padding={16}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", "Monaco", monospace',
              fontSize: '14px',
              lineHeight: '1.5',
              minHeight: '300px',
              width: '100%'
            }}
            placeholder="Write your code here..."
            required
          />
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
          placeholder="react, javascript, frontend"
        />
        <small style={{ color: '#666' }}>Separate tags with commas</small>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        style={{ 
          width: '100%', 
          padding: '1rem', 
          background: loading ? '#6c757d' : '#28a745', 
          color: 'white', 
          border: 'none',
          borderRadius: '4px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? '⏳ Saving...' : (initialData._id ? '💾 Update Snippet' : '✨ Create Snippet')}
      </button>
    </form>
  );
};

export default SnippetForm;