
import { useState } from 'react';
import { Popover } from '@headlessui/react';
import { Comment } from '@/types/comment';

interface CommentMarkerProps {
  comment: Comment;
  onStatusChange: (id: string, status: Comment['status']) => void;
  isSelected?: boolean;
  onSelect: () => void;
}

const statusColors = {
  open: 'bg-blue-500',
  resolved: 'bg-green-500',
  'needs review': 'bg-yellow-500'
};

export const CommentMarker = ({ comment, onStatusChange, isSelected, onSelect }: CommentMarkerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Popover className="absolute" style={{
      left: `${comment.position.x}%`,
      top: `${comment.position.y}%`,
      transform: 'translate(-50%, -50%)'
    }}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`group relative w-6 h-6 rounded-full ${statusColors[comment.status]} 
              shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${open || isHovered || isSelected ? 'ring-2 ring-white' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            aria-label={`Comment by ${comment.profiles?.name || 'Unknown user'}: ${comment.content.substring(0, 50)}${comment.content.length > 50 ? '...' : ''}`}
          >
            {(open || isHovered) && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-50
                animate-fade-in">
                {comment.content.substring(0, 20)}...
              </span>
            )}
          </Popover.Button>
          
          <Popover.Panel className="absolute z-10 w-64 px-4 mt-2 transform -translate-x-1/2 left-1/2">
            <div className="bg-white rounded-lg shadow-lg p-4 animate-fade-in">
              <p className="text-sm text-gray-600 mb-3">{comment.content}</p>
              <div className="flex gap-2">
                <select
                  value={comment.status}
                  onChange={(e) => onStatusChange(comment.id, e.target.value as Comment['status'])}
                  className="text-xs border rounded px-2 py-1"
                >
                  <option value="open">Open</option>
                  <option value="resolved">Resolved</option>
                  <option value="needs review">Needs Review</option>
                </select>
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};
