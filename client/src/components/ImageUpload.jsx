import React, { useState } from 'react';
import api from '../api/axios';
import { Upload, ImageIcon, Loader2 } from 'lucide-react';

const ImageUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file first.');

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const response = await api.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setMessage('Upload successful!');
      setFile(null);
      if (onUploadSuccess) onUploadSuccess(response.data);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', borderRadius: '10px' }}>
      <form onSubmit={handleUpload}>
        <input 
          type="file" 
          id="fileInput"
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
          accept="image/*"
        />
        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
          <div style={{ marginBottom: '10px' }}>
            {file ? <ImageIcon size={48} color="#007bff" /> : <Upload size={48} color="#666" />}
          </div>
          <p>{file ? file.name : "Click to select an image"}</p>
        </label>

        <button 
          type="submit" 
          disabled={!file || uploading}
          style={{ 
            marginTop: '15px', 
            padding: '10px 20px', 
            backgroundColor: uploading ? '#ccc' : '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: file && !uploading ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: '15px auto 0'
          }}
        >
          {uploading ? <Loader2 className="animate-spin" size={18} /> : null}
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', color: message.includes('failed') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default ImageUpload;