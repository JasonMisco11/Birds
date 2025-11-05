import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Bird, BirdInput } from './types'; // ✅ uses types.ts
import { api } from '../src/api';
import { BirdTable } from '../components/BirdTable';
import BirdDetailModal from '../components/BirdDetailModal';
import { EditBirdModal } from '../components/EditBirdModal';
import { Toast } from '../components/Toast';

export default function App() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);
  const [editingBird, setEditingBird] = useState<Bird | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const loadBirds = async () => {
    try {
      setLoading(true);
      const data = await api.getAllBirds();
      setBirds(data);
    } catch (error) {
      alert('Failed to load birds');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBirds();
  }, []);

  const handleCreate = async (bird: BirdInput) => {
    await api.createBird(bird);
    await loadBirds();
    setShowCreateModal(false);
    setToast('Bird created successfully!');
  };

  const handleUpdate = async (bird: BirdInput) => {
    if (editingBird) {
      await api.updateBird(editingBird._id, bird);
      await loadBirds();
      setEditingBird(null);
      setToast('Bird updated successfully!');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this bird?')) {
      await api.deleteBird(id);
      await loadBirds();
      setToast('Bird deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center sm:text-left">
          Bird Records Dashboard
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add Bird
        </button>
      </header>

      <main className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-4 md:p-6 overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading...</div>
        ) : (
          <BirdTable
                          birds={birds}
                          onSelect={setSelectedBird}
                          onEdit={setEditingBird}
                          onDelete={handleDelete} loading={false} onView={function (bird: Bird): void {
                              throw new Error('Function not implemented.');
                          } }          />
        )}
      </main>

      {selectedBird && (
        <BirdDetailModal bird={selectedBird} onClose={() => setSelectedBird(null)} />
      )}

      {editingBird && (
        <EditBirdModal
          initialData={editingBird}
          onSubmit={handleUpdate}
          onClose={() => setEditingBird(null)}
        />
      )}

      {showCreateModal && (
        <EditBirdModal
          onSubmit={handleCreate}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
