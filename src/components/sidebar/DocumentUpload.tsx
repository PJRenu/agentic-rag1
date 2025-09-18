import React, { useCallback, useState } from 'react';
import { Upload, FolderPlus, File, Loader2 } from 'lucide-react';
import { useDocuments } from '../../contexts/DocumentContext';

const DocumentUpload: React.FC = () => {
  const { addDocuments } = useDocuments();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = useCallback(async (files: FileList | File[]) => {
    setUploading(true);
    setProgress(0);

    const fileArray = Array.from(files);
    
    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      
      // Simulate upload progress
      await new Promise(resolve => setTimeout(resolve, 500));
      
      addDocuments([{
        id: Date.now() + i,
        name: file.name,
        type: file.type || 'unknown',
        size: file.size,
        uploadDate: new Date(),
        status: 'processed',
        chunks: Math.floor(Math.random() * 20) + 5
      }]);
      
      setProgress(((i + 1) / fileArray.length) * 100);
    }

    setTimeout(() => {
      setUploading(false);
      setProgress(0);
    }, 500);
  }, [addDocuments]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Upload Documents</h3>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver 
            ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-purple-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {uploading ? (
          <div className="space-y-2">
            <Loader2 className="w-8 h-8 text-blue-600 mx-auto animate-spin" />
            <p className="text-sm text-gray-600">Uploading...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 text-purple-400 mx-auto transition-colors duration-300" />
            <p className="text-sm text-gray-600">Drop files here or click to browse</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <label className="group flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          <File className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-sm">Files</span>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
        </label>
        
        <label className="group flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:from-indigo-700 hover:to-pink-700 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          <FolderPlus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-sm">Folder</span>
          <input
            type="file"
            webkitdirectory="true"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
        </label>
      </div>
    </div>
  );
};

export default DocumentUpload;