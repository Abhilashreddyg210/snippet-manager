import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { snippetsAPI } from '../services/api';
import SnippetCard from '../components/SnippetCard/SnippetCard';
import SnippetForm from '../components/Forms/SnippetForm';

const Dashboard = () => {
  const { user } = useAuth();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

  useEffect(() => {
    if (user) {
      fetchSnippets();
    }
  }, [user]);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const response = await snippetsAPI.getAll();
      setSnippets(response.data);
    } catch (error) {
      setError('Failed to fetch snippets');
      console.error('Error fetching snippets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSnippet = async (snippetData) => {
    try {
      await snippetsAPI.create(snippetData);
      setShowForm(false);
      fetchSnippets(); // Refresh the list
    } catch (error) {
      setError('Failed to create snippet');
      console.error('Error creating snippet:', error);
    }
  };

  const handleUpdateSnippet = async (snippetData) => {
    try {
      await snippetsAPI.update(editingSnippet._id, snippetData);
      setEditingSnippet(null);
      fetchSnippets(); // Refresh the list
    } catch (error) {
      setError('Failed to update snippet');
      console.error('Error updating snippet:', error);
    }
  };

  const handleDeleteSnippet = async (snippetId) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      try {
        await snippetsAPI.delete(snippetId);
        fetchSnippets(); // Refresh the list
      } catch (error) {
        setError('Failed to delete snippet');
        console.error('Error deleting snippet:', error);
      }
    }
  };

  if (!user) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Dashboard</h2>
        <p>Please log in to view your snippets.</p>
      </div>
    );
  }

  if (showForm) {
    return (
      <SnippetForm 
        onSubmit={handleCreateSnippet}
        loading={loading}
      />
    );
  }

  if (editingSnippet) {
    return (
      <SnippetForm 
        onSubmit={handleUpdateSnippet}
        initialData={editingSnippet}
        loading={loading}
      />
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Your Snippets</h2>
        <button 
          onClick={() => setShowForm(true)}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#007bff', 
            color: 'white', 
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        >
          + New Snippet
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {loading ? (
        <p>Loading snippets...</p>
      ) : snippets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#f8f9fa', borderRadius: '5px' }}>
          <h3>No snippets yet</h3>
          <p>Create your first code snippet to get started!</p>
          <button 
            onClick={() => setShowForm(true)}
            style={{ 
              padding: '0.75rem 1.5rem', 
              background: '#28a745', 
              color: 'white', 
              border: 'none',
              borderRadius: '4px',
              marginTop: '1rem'
            }}
          >
            Create Your First Snippet
          </button>
        </div>
      ) : (
        <div>
          {snippets.map(snippet => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              onEdit={setEditingSnippet}
              onDelete={handleDeleteSnippet}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;