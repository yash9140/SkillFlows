// Example: d:\SkillFlow\client\src\components\DocumentViewer.jsx
import React, { useState } from 'react';
import axios from 'axios';

function DocumentViewer({ filename, originalname }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarise = async () => {
    setLoading(true);
    setSummary('');
    const res = await axios.post('/documents/summarise', { filename });
    setSummary(res.data.summary);
    setLoading(false);
  };

  return (
    <div className="card p-3 mt-3">
      <h5>{originalname}</h5>
      {/* You can add a preview here */}
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

export default DocumentViewer;