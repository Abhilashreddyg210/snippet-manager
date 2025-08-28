import { useState } from 'react';

const SnippetCard = ({ snippet, onEdit, onDelete, onToggleFavorite }) => {
  const [isFavoriting, setIsFavoriting] = useState(false);

  const handleToggleFavorite = async () => {
    setIsFavoriting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/snippets/${snippet._id}/favorite`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        onToggleFavorite(result); // Notify parent component
      } else {
        console.error('Failed to toggle favorite');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsFavoriting(false);
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '1rem', 
      margin: '1rem 0', 
      borderRadius: '5px',
      background: '#f9f9f9',
      position: 'relative'
    }}>
      {/* Favorite Button - Top Right Corner */}
      <button 
        onClick={handleToggleFavorite}
        disabled={isFavoriting}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '0.25rem',
          borderRadius: '50%',
          transition: 'all 0.2s ease',
          color: snippet.isFavorite ? '#ffd700' : '#666'
        }}
        title={snippet.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 215, 0, 0.1)';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'none';
          e.target.style.transform = 'scale(1)';
        }}
      >
        {isFavoriting ? '⏳' : (snippet.isFavorite ? '⭐' : '☆')}
      </button>

      {/* Header with Title and Language */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', paddingRight: '2rem' }}>
        <h3 style={{ margin: 0, color: '#333' }}>{snippet.title}</h3>
        <span style={{ 
          background: '#007bff', 
          color: 'white', 
          padding: '0.25rem 0.5rem', 
          borderRadius: '3px',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          {snippet.language}
        </span>
      </div>

      {/* Description */}
      {snippet.description && (
        <p style={{ margin: '0.5rem 0', color: '#666', fontStyle: 'italic' }}>{snippet.description}</p>
      )}
      
      {/* Code Block */}
      <div style={{ margin: '1rem 0' }}>
        <pre style={{ 
          background: '#2d2d2d', 
          color: '#fff', 
          padding: '1rem', 
          borderRadius: '3px',
          overflowX: 'auto',
          fontSize: '0.9rem',
          lineHeight: '1.4'
        }}>
          <code>{snippet.code}</code>
        </pre>
      </div>
      
      {/* Tags */}
      {snippet.tags && snippet.tags.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <strong style={{ color: '#333', marginRight: '0.5rem' }}>Tags:</strong> 
          {snippet.tags.map((tag, index) => (
            <span key={index} style={{ 
              background: '#6c757d', 
              color: 'white', 
              padding: '0.2rem 0.5rem', 
              margin: '0 0.25rem', 
              borderRadius: '3px',
              fontSize: '0.8rem',
              display: 'inline-block'
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Action Buttons */}
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => onEdit(snippet)}
          style={{ 
            padding: '0.5rem 1rem', 
            background: '#28a745', 
            color: 'white', 
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => e.target.style.background = '#218838'}
          onMouseLeave={(e) => e.target.style.background = '#28a745'}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(snippet._id)}
          style={{ 
            padding: '0.5rem 1rem', 
            background: '#dc3545', 
            color: 'white', 
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => e.target.style.background = '#c82333'}
          onMouseLeave={(e) => e.target.style.background = '#dc3545'}
        >
          Delete
        </button>
      </div>

      {/* Favorite Status Indicator */}
      {snippet.isFavorite && (
        <div style={{
          position: 'absolute',
          bottom: '0.5rem',
          right: '0.5rem',
          background: 'rgba(255, 215, 0, 0.2)',
          padding: '0.2rem 0.5rem',
          borderRadius: '3px',
          fontSize: '0.8rem',
          color: '#856404',
          fontWeight: 'bold'
        }}>
          ⭐ Favorite
        </div>
      )}
    </div>
  );
};

export default SnippetCard;