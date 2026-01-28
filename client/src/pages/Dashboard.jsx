import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import ImageUpload from '../components/ImageUpload';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const fetchImages = async () => {
    try {
      const response = await api.get('/images');
      setImages(response.data);
    } catch (err) {
      console.error('Failed to fetch images');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h1>Image Manager</h1>
        <button onClick={handleLogout} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <ImageUpload onUploadSuccess={fetchImages} />

      <h2 style={{ marginTop: '40px' }}>Your Gallery</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {images.map((img) => (
          <div key={img.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
            <img 
              src={`http://localhost:5000/uploads/${img.filename}`} 
              alt={img.original_name} 
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <div style={{ padding: '10px', fontSize: '12px' }}>
              <p style={{ margin: 0, fontWeight: 'bold', truncate: 'true' }}>{img.original_name}</p>
            </div>
          </div>
        ))}
      </div>
      {images.length === 0 && <p>No images uploaded yet.</p>}
    </div>
  );
};

export default Dashboard;