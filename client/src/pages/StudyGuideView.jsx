import React from 'react';
import { ArrowLeft, BookOpen, Clock, Download, Share2 } from 'lucide-react';

const StudyGuideView = ({ material, onBack }) => {
  if (!material) return null;

  const { filename, summary, key_concepts, study_guide, created_at } = material;

  // Split key concepts if they are returned as a list string
  const conceptsList = key_concepts ? key_concepts.split('\n').filter(line => line.trim() !== '') : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 truncate w-64 md:w-auto">{filename}</h1>
            <div className="flex items-center text-xs text-gray-500 space-x-3">
              <span className="flex items-center"><Clock size={12} className="mr-1" /> {new Date(created_at).toLocaleDateString()}</span>
              <span className="flex items-center"><BookOpen size={12} className="mr-1" /> Study Guide</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-indigo-600 transition">
            <Share2 size={20} />
          </button>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col md:flex-row gap-8">
        {/* Left: Table of Contents / Sidebar (Desktop) */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <nav className="sticky top-24 space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">On this page</h3>
            <ul className="space-y-2">
              <li><a href="#summary" className="text-indigo-600 font-medium block border-l-2 border-indigo-600 pl-3">Summary</a></li>
              <li><a href="#key-concepts" className="text-gray-500 hover:text-gray-900 block border-l-2 border-transparent hover:border-gray-200 pl-3 transition">Key Concepts</a></li>
              <li><a href="#full-guide" className="text-gray-500 hover:text-gray-900 block border-l-2 border-transparent hover:border-gray-200 pl-3 transition">Full Study Guide</a></li>
            </ul>
          </nav>
        </div>

        {/* Center: Main Content */}
        <div className="flex-1 space-y-12 pb-20">
          {/* Summary Section */}
          <section id="summary" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
            <div className="bg-indigo-50 p-6 rounded-2xl text-gray-800 leading-relaxed">
              {summary || 'No summary available.'}
            </div>
          </section>

          {/* Key Concepts Section */}
          <section id="key-concepts" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Concepts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conceptsList.length > 0 ? (
                conceptsList.map((concept, idx) => {
                  const [term, ...defParts] = concept.includes(':') ? concept.split(':') : [concept, ''];
                  const definition = defParts.join(':');
                  return (
                    <div key={idx} className="bg-white p-5 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                      <span className="font-bold text-indigo-700 block mb-1">{term.replace(/^\*\*/, '').replace(/\*\*$/, '')}</span>
                      <p className="text-gray-600 text-sm leading-relaxed">{definition}</p>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 italic">No specific concepts identified.</p>
              )}
            </div>
          </section>

          {/* Full Study Guide Content */}
          <section id="full-guide" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Full Study Guide</h2>
            <div className="bg-white p-8 border border-gray-100 rounded-2xl shadow-sm text-gray-800 space-y-4 whitespace-pre-wrap leading-relaxed">
              {study_guide || 'No detailed guide available.'}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default StudyGuideView;
