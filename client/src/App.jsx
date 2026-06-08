import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import StudyGuideView from './pages/StudyGuideView';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const handleSelectMaterial = (material) => {
    setSelectedMaterial(material);
    setCurrentView('study-guide');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedMaterial(null);
  };

  return (
    <div className="App min-h-screen">
      {currentView === 'dashboard' ? (
        <Dashboard onSelectMaterial={handleSelectMaterial} />
      ) : (
        <StudyGuideView 
          material={selectedMaterial} 
          onBack={handleBackToDashboard} 
        />
      )}
    </div>
  );
}

export default App;
