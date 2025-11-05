import React, { useEffect, useState } from "react";
import { Bird } from "./../src/types";
import { api } from './../src/api';

type Props = {
  bird: Bird | null;
  onClose: () => void;
  onSaved: (bird: Bird) => void;
};
onSaved(form);


export default function EditBirdModal({ bird, onClose, onSaved }: Props) {
  const [form, setForm] = useState<Bird | null>(bird);

  useEffect(() => setForm(bird), [bird]);

  if (!form) return null;

  function updateField<K extends keyof Bird>(k: K, v: Bird[K]) {
    setForm((prev) => (prev ? ({ ...prev, [k]: v } as Bird) : prev));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!form) return;
      if (!form._id) {
        // create
        await api.createBird({ ...form, _id: undefined as unknown as string }); // backend assigns id
      } else {
        await api.updateBird(form._id, form);
      }
      onSaved();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <form onSubmit={handleSave} className="bg-white w-full max-w-xl p-6 rounded shadow">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">{form._id ? "Edit Bird" : "Create Bird"}</h3>
          <button type="button" onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3">
          <input className="border p-2" value={form.commonName} onChange={(e) => updateField("commonName", e.target.value)} placeholder="Common Name" />
          <input className="border p-2" value={form.scientificName} onChange={(e) => updateField("scientificName", e.target.value)} placeholder="Scientific Name" />
          <textarea className="border p-2" value={form.description} onChange={(e) => updateField("description", e.target.value)} placeholder="Description" />
          <input className="border p-2" value={form.habitat.join(", ")} onChange={(e) => updateField("habitat", e.target.value.split(",").map(s => s.trim()))} placeholder="Habitat (comma separated)" />
          <input className="border p-2" value={form.appearance.size} onChange={(e) => updateField("appearance", { ...form.appearance, size: e.target.value })} placeholder="Size" />
          <input className="border p-2" value={form.appearance.color.join(", ")} onChange={(e) => updateField("appearance", { ...form.appearance, color: e.target.value.split(",").map(s => s.trim()) })} placeholder="Colors (comma separated)" />
          <input className="border p-2" value={form.photos.join(", ")} onChange={(e) => updateField("photos", e.target.value.split(",").map(s => s.trim()))} placeholder="Photo URLs (comma separated)" />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" className="px-4 py-2 rounded border" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Save</button>
        </div>
      </form>
    </div>
  );
}
