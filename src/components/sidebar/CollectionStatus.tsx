import React from 'react';
import { Database, AlertCircle, CheckCircle } from 'lucide-react';
import { useDocuments } from '../../contexts/DocumentContext';

const CollectionStatus: React.FC = () => {
  const { documents } = useDocuments();
  
  const totalDocs = documents.length;
  const totalChunks = documents.reduce((sum, doc) => sum + doc.chunks, 0);
  const failedEmbeddings = documents.filter(doc => doc.status === 'failed').length;
  const processing = documents.filter(doc => doc.status === 'processing').length;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Collection Status</h3>
      
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 space-y-3 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-blue-500 transition-transform duration-200 hover:scale-110" />
            <span className="text-sm text-gray-700">Documents</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{totalDocs}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-green-500 transition-transform duration-200 hover:scale-110" />
            <span className="text-sm text-gray-700">Chunks</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{totalChunks}</span>
        </div>

        {failedEmbeddings > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-700">Failed</span>
            </div>
            <span className="text-sm font-semibold text-red-900">{failedEmbeddings}</span>
          </div>
        )}

        {processing > 0 && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-yellow-700">Processing</span>
              </div>
              <span className="text-sm font-semibold text-yellow-900">{processing}</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse shadow-sm"
                style={{ width: '60%' }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionStatus;