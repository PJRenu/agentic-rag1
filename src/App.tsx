import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import { DocumentProvider } from './contexts/DocumentContext';
import { ChatProvider } from './contexts/ChatContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <DocumentProvider>
      <ChatProvider>
        <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/50 to-purple-50/50 flex overflow-hidden">
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          <MainPanel sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>
      </ChatProvider>
    </DocumentProvider>
  );
}

export default App;