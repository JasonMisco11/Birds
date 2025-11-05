import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Bird, BirdInput } from '../src/types';

interface BirdFormModalProps {
  bird?: Bird;
  onClose: () => void;
  onSubmit: ()  => void;
  onSave: (bird: BirdInput) => Promise<void>;
}

export const EditBirdModal: React.FC<BirdFormModalProps> = ({ bird, onClose, onSave }) => {
  const [formData, setFormData] = useState<BirdInput>({
    commonName: bird?.commonName || '',
    scientificName: bird?.scientificName || '',
    description: bird?.description || '',
    habitat: bird?.habitat || [],
    appearance: {
      size: bird?.appearance.size || '',
      color: bird?.appearance.color || [],
    },
    photos: bird?.photos || [],
  });
  
  const [habitatInput, setHabitatInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [photoInput, setPhotoInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.commonName || !formData.scientificName || !formData.description || !formData.appearance.size) {
      alert('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      alert('Failed to save bird');
    } finally {
      setLoading(false);
    }
  };

  const addItem = (field: 'habitat' | 'photos', value: string, clearFn: () => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      clearFn();
    }
  };

  const removeItem = (field: 'habitat' | 'photos', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addColor = () => {
    if (colorInput.trim()) {
      setFormData(prev => ({
        ...prev,
        appearance: {
          ...prev.appearance,
          color: [...prev.appearance.color, colorInput.trim()],
        },
      }));
      setColorInput('');
    }
  };

  const removeColor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        color: prev.appearance.color.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {bird ? 'Update Bird' : 'Create New Bird'}
          </h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Common Name *
            </label>
            <input
              type="text"
              value={formData.commonName}
              onChange={(e) => setFormData(prev => ({ ...prev, commonName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scientific Name *
            </label>
            <input
              type="text"
              value={formData.scientificName}
              onChange={(e) => setFormData(prev => ({ ...prev, scientificName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
            <input
              type="text"
              placeholder="e.g., Small, Medium, Large"
              value={formData.appearance.size}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                appearance: { ...prev.appearance, size: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Habitat</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={habitatInput}
                onChange={(e) => setHabitatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('habitat', habitatInput, () => setHabitatInput('')))}
                placeholder="Add habitat and press Enter"
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => addItem('habitat', habitatInput, () => setHabitatInput(''))}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.habitat.map((h, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {h}
                  <button type="button" onClick={() => removeItem('habitat', idx)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
                placeholder="Add color and press Enter"
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addColor}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.appearance.color.map((c, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {c}
                  <button type="button" onClick={() => removeColor(idx)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URLs</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={photoInput}
                onChange={(e) => setPhotoInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('photos', photoInput, () => setPhotoInput('')))}
                placeholder="Add photo URL and press Enter"
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => addItem('photos', photoInput, () => setPhotoInput(''))}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="space-y-1">
              {formData.photos.map((p, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className="flex-1 truncate text-gray-600">{p}</span>
                  <button type="button" onClick={() => removeItem('photos', idx)} className="text-red-500 hover:text-red-700">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : 'Save Bird'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};