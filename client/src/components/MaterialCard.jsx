import React from 'react';
import { BookOpen, MoreVertical, FileText, FileCheck } from 'lucide-react';

const MaterialCard = ({ material, onViewGuide }) => {
  const { id, filename, file_type, status, created_at } = material;
  
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${status === 'completed' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
            {status === 'completed' ? <BookOpen size={24} /> : <FileText size={24} />}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 truncate w-40" title={filename}>{filename}</h3>
            <p className="text-sm text-gray-500">{getTimeAgo(created_at)} • {status}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={20} />
        </button>
      </div>
      <div className="mt-4 flex space-x-2">
        <button 
          onClick={() => onViewGuide(material)}
          disabled={status !== 'completed'}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            status === 'completed' 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          View Guide
        </button>
        <button className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition">
          Take Quiz
        </button>
      </div>
    </div>
  );
};

export default MaterialCard;
