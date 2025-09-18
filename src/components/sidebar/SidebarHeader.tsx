import React from 'react';
import { FileText } from 'lucide-react';

const SidebarHeader: React.FC = () => {
  return (
    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 shadow-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white drop-shadow-sm">DocuMind</h1>
          <p className="text-sm text-white/80">AI Document Assistant</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;