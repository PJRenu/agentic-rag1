import React from 'react';
import { Clock, Upload, Settings, Trash2 } from 'lucide-react';
import { useDocuments } from '../../contexts/DocumentContext';

const ActivityTimeline: React.FC = () => {
  const { activities } = useDocuments();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload':
        return <Upload className="w-4 h-4 text-green-500" />;
      case 'model_change':
        return <Settings className="w-4 h-4 text-blue-500" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
      
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {activities.length > 0 ? (
          activities.slice(0, 10).map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 transform hover:scale-[1.02]">
              <div className="flex-shrink-0 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">{activity.message}</p>
                <p className="text-xs text-gray-500">{formatTime(activity.timestamp)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic p-2">No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default ActivityTimeline;