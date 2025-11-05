import React, { useEffect, useState } from "react";
import { Bird } from "../src/types";
import { api } from "../src/api";
import BirdDetailModal from "./BirdDetailModal";
import EditBirdModal from "./EditBirdModal";

type Props = {
  birds: Bird[];
  onSelect: (bird: Bird) => void;
  onEdit: (bird: Bird) => void;
  onDelete: (id: string) => void;
};


export default function BirdTable() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Bird | null>(null);
  const [editing, setEditing] = useState<Bird | null>(null);

  async function fetchBirds() {
    try {
      setLoading(true);
      const data = await api.listBirds();
      setBirds(data);
    } catch (err) {
      console.error("Failed to load birds:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBirds();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this bird?")) return;
    await api.deleteBird(id);
    fetchBirds();
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Bird Records</h2>
        <button
          onClick={() => setEditing({} as Bird)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add Bird
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Common Name</th>
              <th className="p-2 border">Scientific Name</th>
              <th className="p-2 border hidden sm:table-cell">Size</th>
              <th className="p-2 border hidden md:table-cell">Colors</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {birds.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50">
                <td className="p-2 border">{b.commonName}</td>
                <td className="p-2 border italic">{b.scientificName}</td>
                <td className="p-2 border hidden sm:table-cell">{b.appearance.size}</td>
                <td className="p-2 border hidden md:table-cell">
                  {b.appearance.color.join(", ")}
                </td>
                <td className="p-2 border text-center">
                  <div className="flex justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => setSelected(b)}
                      className="px-2 py-1 border rounded text-blue-600 hover:bg-blue-50"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setEditing(b)}
                      className="px-2 py-1 border rounded text-yellow-600 hover:bg-yellow-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b._id!)}
                      className="px-2 py-1 border rounded text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!birds.length && (
          <p className="text-center py-6 text-gray-500">No birds found. Add one!</p>
        )}
      </div>

      {selected && (
        <BirdDetailModal bird={selected} onClose={() => setSelected(null)} />
      )}

      {editing && (
        <EditBirdModal
          bird={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            fetchBirds();
          }}
        />
      )}
    </div>
  );
}
