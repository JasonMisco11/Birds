import React from 'react';
import { Edit2, Trash2, Eye, Loader2 } from 'lucide-react';
import { Bird } from '../src/types';

interface BirdTableProps {
  birds: Bird[];
  loading: boolean;
  onView: (bird: Bird) => void;
  onSelect: (bird: Bird) => void;
  onEdit: (bird: Bird) => void;
  onDelete: (id: string) => void;
}

export const BirdTable: React.FC<BirdTableProps> = ({
  birds,
  loading,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Common Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 hidden sm:table-cell">
                Scientific Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">
                Size
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 hidden lg:table-cell">
                Habitat
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {birds.map((bird) => (
              <tr key={bird._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {bird.commonName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 italic hidden sm:table-cell">
                  {bird.scientificName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                  {bird.appearance.size}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                  {bird.habitat.slice(0, 2).join(', ')}
                  {bird.habitat.length > 2 && '...'}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(bird)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onEdit(bird)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(bird._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {birds.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No birds found. Click "Add New Bird" to create one.
        </div>
      )}
    </div>
  );
};