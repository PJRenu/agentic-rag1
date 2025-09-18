import React, { useState } from 'react';
import { Brain, Zap } from 'lucide-react';
import { useDocuments } from '../../contexts/DocumentContext';

const ModelControls: React.FC = () => {
  const { addActivity } = useDocuments();
  const [embeddingModel, setEmbeddingModel] = useState('openai-text-embedding-3-small');
  const [inferenceModel, setInferenceModel] = useState('gpt-4-turbo');

  const embeddingModels = [
    { id: 'openai-text-embedding-3-small', name: 'OpenAI Text Embedding 3 Small', provider: 'OpenAI' },
    { id: 'openai-text-embedding-3-large', name: 'OpenAI Text Embedding 3 Large', provider: 'OpenAI' },
    { id: 'cohere-embed-english-v3', name: 'Cohere Embed English v3', provider: 'Cohere' },
  ];

  const inferenceModels = [
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
    { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' },
  ];

  const handleEmbeddingModelChange = (modelId: string) => {
    setEmbeddingModel(modelId);
    const model = embeddingModels.find(m => m.id === modelId);
    addActivity({
      id: Date.now(),
      type: 'model_change',
      message: `Embedding model changed to ${model?.name}`,
      timestamp: new Date()
    });
  };

  const handleInferenceModelChange = (modelId: string) => {
    setInferenceModel(modelId);
    const model = inferenceModels.find(m => m.id === modelId);
    addActivity({
      id: Date.now(),
      type: 'model_change',
      message: `Inference model changed to ${model?.name}`,
      timestamp: new Date()
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Model Settings</h3>
      
      <div className="space-y-3">
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Brain className="w-4 h-4" />
            <span>Embedding Model</span>
          </label>
          <select
            value={embeddingModel}
            onChange={(e) => handleEmbeddingModelChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 hover:shadow-md"
          >
            {embeddingModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.provider})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Zap className="w-4 h-4" />
            <span>Inference Model</span>
          </label>
          <select
            value={inferenceModel}
            onChange={(e) => handleInferenceModelChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 hover:shadow-md"
          >
            {inferenceModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.provider})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ModelControls;