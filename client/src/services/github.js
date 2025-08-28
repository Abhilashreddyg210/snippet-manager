export const exportToGist = async (snippet, token) => {
  const files = {
    [`${snippet.title}.${snippet.language}`]: {
      content: snippet.code
    }
  };

  const response = await fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: snippet.description || 'Exported from Code Snippet Manager',
      public: false,
      files: files
    })
  });

  return response.json();
};