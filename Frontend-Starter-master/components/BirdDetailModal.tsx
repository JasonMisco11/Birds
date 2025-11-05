import React from "react";
import { Bird } from "../src/types";

type Props = { bird: Bird | null; onClose: () => void };

export default function BirdDetailModal({ bird, onClose }: Props) {
  if (!bird) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40 px-2">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-semibold">{bird.commonName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <p className="italic text-gray-600">{bird.scientificName}</p>
        <p className="mt-3">{bird.description}</p>

        <div className="mt-4">
          <h3 className="font-medium">Habitat</h3>
          <ul className="list-disc pl-5">
            {bird.habitat.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Appearance</h3>
          <p>Size: {bird.appearance.size}</p>
          <p>Colors: {bird.appearance.color.join(", ")}</p>
        </div>

        {bird.photos?.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {bird.photos.map((p, i) => (
              <img
                key={i}
                src={p}
                alt={`${bird.commonName}-${i}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
