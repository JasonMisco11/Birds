import React from "react";
import { Bird } from "./../src/types";
import { api } from './../src/api';
type Props = {
  birds: Bird[];
  loading: boolean;
  onView: (b: Bird) => void;
  onEdit: (b: Bird) => void;
  onDeleted: (id: string) => void;
};

export default function BirdTable({ birds, loading, onView, onEdit, onDeleted }: Props) {
  async function handleDelete(id: string) {
    if (!confirm("Delete this bird?")) return;
    try {
      await api.deleteBird(id);
      onDeleted(id);
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-2 text-left">Common</th>
            <th className="p-2 text-left">Scientific</th>
            <th className="p-2 text-left">Habitat</th>
            <th className="p-2 text-left">Size</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {birds.map((b) => (
            <tr key={b._id} className="border-t">
              <td className="p-2">{b.commonName}</td>
              <td className="p-2 italic">{b.scientificName}</td>
              <td className="p-2">{b.habitat.join(", ")}</td>
              <td className="p-2">{b.appearance.size}</td>
              <td className="p-2 flex gap-2 justify-center">
                <button className="px-2 py-1 rounded border" onClick={() => onView(b)}>View</button>
                <button className="px-2 py-1 rounded border" onClick={() => onEdit(b)}>Edit</button>
                <button className="px-2 py-1 rounded bg-red-600 text-white" onClick={() => handleDelete(b._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
