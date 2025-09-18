import React, { useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder, Trash2 } from 'lucide-react';
import { useDocuments } from '../../contexts/DocumentContext';

const FolderTree: React.FC = () => {
  const { documents, deleteDocument } = useDocuments();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Delete "${name}"? This action cannot be undone.`)) {
      deleteDocument(id);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Document Library</h3>
      
      <div className="space-y-1">
        <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          <button
            onClick={() => toggleFolder('root')}
            className="flex items-center space-x-1 transition-all duration-200 hover:scale-105"
          >
            {expandedFolders.has('root') ? (
              <ChevronDown className="w-4 h-4 text-purple-500 transition-transform duration-200" />
            ) : (
              <ChevronRight className="w-4 h-4 text-purple-500 transition-transform duration-200" />
            )}
            <Folder className="w-4 h-4 text-blue-500 transition-colors duration-200 hover:text-purple-500" />
            <span className="text-sm font-medium text-gray-700">All Documents</span>
          </button>
          <span className="text-xs text-gray-500">({documents.length})</span>
        </div>

        {expandedFolders.has('root') && (
          <div className="ml-4 space-y-1">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 group transition-all duration-200"
              >
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <File className="w-4 h-4 text-gray-400 flex-shrink-0 transition-colors duration-200 group-hover:text-blue-500" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-700 truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(doc.size)} • {doc.chunks} chunks</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(doc.id, doc.name)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 text-red-600 transition-all duration-300 transform hover:scale-110"
                  title="Delete document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            {documents.length === 0 && (
              <p className="text-sm text-gray-500 italic p-2">No documents uploaded yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderTree;