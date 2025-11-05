import React, { useEffect, useState } from "react";
import { Bird } from "./types";
import { api } from "./api";
import BirdTable from '../components/BirdTable';
import BirdDetailModal from "../components/BirdDetailModal";
import EditBirdModal from "../components/EditBirdModal";
import Toast from "../components/Toast";

export default function App() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Bird | null>(null);
  const [editing, setEditing] = useState<Bird | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const data = await api.listBirds();
      setBirds(data);
    } catch (err) {
      console.error(err);
      setToastMsg("Failed to load birds");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Bird Directory</h1>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="mb-4 flex justify-end">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={() => setEditing({ // empty template for create
              _id: "",
              commonName: "",
              scientificName: "",
              description: "",
              habitat: [],
              appearance: { size: "", color: [] },
              photos: []
            })}
          >
            Add Bird
          </button>
        </div>

        <BirdTable
          birds={birds}
          loading={loading}
          onView={(b) => setSelected(b)}
          onEdit={(b) => setEditing(b)}
          onDeleted={(id) => {
            setBirds((prev) => prev.filter((x) => x._id !== id));
            setToastMsg("Deleted bird");
          }}
        />
      </main>

      <BirdDetailModal bird={selected} onClose={() => setSelected(null)} />
      <EditBirdModal
        bird={editing}
        onClose={() => setEditing(null)}
        onSaved={async () => {
          await load();
          setEditing(null);
          setToastMsg("Saved bird");
        }}
      />

      <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
    </div>
  );
}
