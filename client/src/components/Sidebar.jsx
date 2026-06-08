import React from 'react';
import { Home, Library, PenTool, Calendar, Settings } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', active: true },
    { icon: <Library size={20} />, label: 'My Library' },
    { icon: <PenTool size={20} />, label: 'Quizzes' },
    { icon: <Calendar size={20} />, label: 'Schedule' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold text-indigo-600 mb-8 px-2">Study Buddy AI</div>
      <nav className="flex-1 space-y-1">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition ${
              item.active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
