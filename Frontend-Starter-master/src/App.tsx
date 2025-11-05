import React, { useEffect, useState } from "react";
import BirdTable from "../components/BirdTable";
import BirdDetailModal from "../components/BirdDetailModal";
import EditBirdModal from "../components/EditBirdModal";
import { Bird } from "./types"; // <-- Move your Bird interface here

const App: React.FC = () => {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);
  const [editingBird, setEditingBird] = useState<Bird | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://birdbackendinterview.onrender.com/bird")
      .then((res) => res.json())
      .then((data) => {
        setBirds(data);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this bird?")) return;
    await fetch(`https://birdbackendinterview.onrender.com/bird/${id}`, {
      method: "DELETE",
    });
    setBirds((prev) => prev.filter((b) => b._id !== id));
  }

  async function handleSave(updatedBird: Bird) {
    setEditingBird(null);
    setBirds((prev) => {
      const exists = prev.find((b) => b._id === updatedBird._id);
      return exists
        ? prev.map((b) => (b._id === updatedBird._id ? updatedBird : b))
        : [...prev, updatedBird];
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-5xl text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Bird Records Pp
        </h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          View, edit, and manage bird entries easily.
        </p>
      </header>

      <main className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-4 md:p-6 overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading...</div>
        ) : (
          <BirdTable
            birds={birds}
            onSelect={setSelectedBird}
            onEdit={setEditingBird}
            onDelete={handleDelete}
          />
        )}
      </main>

      {selectedBird && (
        <BirdDetailModal
          bird={selectedBird}
          onClose={() => setSelectedBird(null)}
        />
      )}

      {editingBird && (
        <EditBirdModal
          bird={editingBird}
          onClose={() => setEditingBird(null)}
          onSaved={handleSave}
        />
      )}
    </div>
  );
};

export default App;
