import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DocumentList() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/documents/list').then(res => {
      setDocs(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading documents...</div>;

  return (
    <div>
      <h5>Available Documents</h5>
      {docs.length === 0 && <div>No documents found.</div>}
      {docs.map(doc => (
        <DocumentViewer key={doc._id} doc={doc} />
      ))}
    </div>
  );
}

function DocumentViewer({ doc }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarise = async () => {
    setLoading(true);
    setSummary('');
    try {
      const res = await axios.post('/documents/summarise', { filename: doc.filename });
      setSummary(res.data.summary);
    } catch {
      setSummary('Failed to summarize.');
    }
    setLoading(false);
  };

  return (
    <div className="card p-3 mb-3">
      <div className="fw-bold">{doc.originalname}</div>
      <button className="btn btn-warning my-2" onClick={handleSummarise} disabled={loading}>
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Summarising...
          </>
        ) : (
          'Summarise with AI'
        )}
      </button>
      {summary && (
        <div className="alert alert-info mt-3">
          <strong>Summary:</strong>
          <div>{summary}</div>
        </div>
      )}
    </div>
  );
}

export default DocumentList;