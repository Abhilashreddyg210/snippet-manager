const Statistics = ({ snippets }) => {
  const stats = {
    total: snippets.length,
    byLanguage: snippets.reduce((acc, snippet) => {
      acc[snippet.language] = (acc[snippet.language] || 0) + 1;
      return acc;
    }, {}),
    recent: snippets.slice(-5)
  };

  return (
    <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '8px' }}>
      <h3>📊 Your Statistics</h3>
      <p>Total Snippets: <strong>{stats.total}</strong></p>
      <div>
        <h4>By Language:</h4>
        {Object.entries(stats.byLanguage).map(([lang, count]) => (
          <div key={lang} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{lang}:</span>
            <span>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;