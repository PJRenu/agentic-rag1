import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useDocuments } from '../../contexts/DocumentContext';

interface SearchResult {
  id: number;
  title: string;
  content: string;
  source: string;
  similarity: number;
  metadata: {
    author?: string;
    date?: string;
    page?: number;
  };
}

const SearchPanel: React.FC = () => {
  const { documents } = useDocuments();
  const [query, setQuery] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [resultLimit, setResultLimit] = useState(10);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedResults, setExpandedResults] = useState<Set<number>>(new Set());

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);

    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate mock search results
    const mockResults: SearchResult[] = documents
      .filter(doc => 
        (!authorFilter || doc.name.toLowerCase().includes(authorFilter.toLowerCase())) &&
        (!titleFilter || doc.name.toLowerCase().includes(titleFilter.toLowerCase()))
      )
      .slice(0, resultLimit)
      .map((doc, index) => ({
        id: index,
        title: `Relevant section from ${doc.name}`,
        content: `This is a simulated search result showing content from ${doc.name} that matches your query "${query}". In a real implementation, this would show the actual matched content with highlighting.`,
        source: doc.name,
        similarity: Math.random() * 0.3 + 0.7,
        metadata: {
          author: `Author ${index + 1}`,
          date: doc.uploadDate.toLocaleDateString(),
          page: Math.floor(Math.random() * 50) + 1
        }
      }));

    setResults(mockResults);
    setIsSearching(false);
  };

  const toggleResultExpansion = (id: number) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedResults(newExpanded);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      {/* Search header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your semantic search query..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 hover:shadow-md"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!query.trim() || isSearching}
              className="group px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <span className="flex items-center space-x-2">
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>Search</span>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">Filters:</span>
            </div>
            
            <input
              type="text"
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              placeholder="Author"
              className="px-3 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            />
            
            <input
              type="text"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              placeholder="Title"
              className="px-3 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            />
            
            <select
              value={resultLimit}
              onChange={(e) => setResultLimit(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 transition-all duration-300 hover:border-purple-300"
            >
              <option value={5}>5 results</option>
              <option value={10}>10 results</option>
              <option value={20}>20 results</option>
              <option value={50}>50 results</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search results */}
      <div className="flex-1 overflow-y-auto p-6">
        {results.length === 0 && !isSearching ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Semantic Search
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Search through your documents using natural language. Find relevant content based on meaning, not just keywords.
            </p>
            {documents.length === 0 && (
              <p className="text-sm text-amber-600 mt-4">
                Upload some documents first to search through them!
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {results.length > 0 && (
              <div className="text-sm text-gray-600 mb-4">
                Found {results.length} results for "{query}"
              </div>
            )}
            
            {results.map((result) => (
              <div key={result.id} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-fadeIn">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 flex-1">
                      {result.title}
                    </h3>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="text-sm text-gray-500">
                        {Math.round(result.similarity * 100)}% match
                      </span>
                      <button
                        onClick={() => toggleResultExpansion(result.id)}
                        className="p-1 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 rounded transition-all duration-300 transform hover:scale-110"
                      >
                        {expandedResults.has(result.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">{result.source}</span>
                    {result.metadata.author && (
                      <span> • by {result.metadata.author}</span>
                    )}
                    {result.metadata.date && (
                      <span> • {result.metadata.date}</span>
                    )}
                    {result.metadata.page && (
                      <span> • Page {result.metadata.page}</span>
                    )}
                  </div>

                  <p className={`text-gray-700 ${
                    expandedResults.has(result.id) ? '' : 'line-clamp-3'
                  }`}>
                    {result.content}
                  </p>
                </div>
                
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Similarity: {(result.similarity * 100).toFixed(1)}%</span>
                    <button className="text-blue-600 hover:text-purple-600 transition-colors duration-300 hover:underline">
                      View in context
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;