import React from 'react';
import { Settings } from 'lucide-react';

const SettingsButton: React.FC = () => {
  const handleSettings = () => {
    // Settings modal would open here
    console.log('Open settings modal');
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <button
        onClick={handleSettings}
        className="group w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-purple-100 hover:to-blue-100 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md"
      >
        <Settings className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
        <span className="text-sm font-medium">Settings</span>
      </button>
    </div>
  );
};

export default SettingsButton;