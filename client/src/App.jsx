import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './pages/Dashboard';
import StudyGuideView from './pages/StudyGuideView';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const handleStartStudying = () => {
    setCurrentView('dashboard');
  };

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
      {currentView === 'landing' && (
        <LandingPage onGetStarted={handleStartStudying} />
      )}
      {currentView === 'dashboard' && (
        <Dashboard onSelectMaterial={handleSelectMaterial} />
      )}
      {currentView === 'study-guide' && (
        <StudyGuideView 
          material={selectedMaterial} 
          onBack={handleBackToDashboard} 
        />
      )}
    </div>
  );
}

export default App;
