import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MaterialCard from '../components/MaterialCard';
import { Upload, X } from 'lucide-react';

const Dashboard = ({ onSelectMaterial }) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchMaterials = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/materials');
      const data = await response.json();
      if (Array.isArray(data)) {
        setMaterials(data);
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
    const interval = setInterval(fetchMaterials, 10000); // Poll every 10s for status updates
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setFile(null);
        setShowUploadModal(false);
        fetchMaterials();
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onUploadClick={() => setShowUploadModal(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Recent Study Materials</h2>
              <p className="text-gray-500">Your personalized library of academic resources.</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : materials.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-20 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No materials yet</h3>
                <p className="text-gray-500 mb-6">Upload your first lecture notes or textbook to get started.</p>
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Upload Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materials.map((material) => (
                  <MaterialCard 
                    key={material.id} 
                    material={material} 
                    onViewGuide={onSelectMaterial}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Material</h3>
            <form onSubmit={handleUpload}>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
                <input 
                  type="file" 
                  id="file-upload" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <label 
                  htmlFor="file-upload"
                  className="cursor-pointer"
                >
                  <Upload className="mx-auto h-10 w-10 text-indigo-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    {file ? file.name : 'Click to select or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF, Text or Markdown (max. 10MB)</p>
                </label>
              </div>
              <button 
                type="submit"
                disabled={uploading || !file}
                className={`w-full py-3 rounded-lg font-bold text-white transition ${
                  uploading || !file ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {uploading ? 'Processing...' : 'Generate Study Guide'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
