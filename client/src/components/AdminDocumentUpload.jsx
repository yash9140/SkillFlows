// Example: d:\SkillFlow\client\src\components\AdminDocumentUpload.jsx
import React, { useState } from 'react';
import axios from 'axios';

function AdminDocumentUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setSuccess(false);
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('/documents/upload', formData);
      setSuccess(true);
      setFile(null);
    } catch {
      alert('Upload failed');
    }
    setUploading(false);
  };

  return (
    <div className="card p-3 mb-4">
      <h5>Upload Document</h5>
      <input type="file" accept=".pdf,.docx,.txt" onChange={handleChange} className="form-control mb-2" />
      <button className="btn btn-primary" onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {success && <div className="text-success mt-2">Uploaded successfully!</div>}
    </div>
  );
}

export default AdminDocumentUpload;