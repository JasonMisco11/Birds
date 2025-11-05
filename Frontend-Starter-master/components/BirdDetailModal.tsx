import React,{useState} from "react";
import { Bird } from "./../src/types";

type Props = { bird: Bird | null; onClose: () => void };

export default function BirdDetailModal({ bird, onClose }: Props) {
  if (!bird) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white max-w-2xl w-full p-6 rounded shadow">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{bird.commonName}</h2>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <p className="mt-2 italic">{bird.scientificName}</p>
        <p className="mt-4">{bird.description}</p>

        <div className="mt-4">
          <h3 className="font-medium">Habitat</h3>
          <ul className="list-disc pl-6">
            {bird.habitat.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Appearance</h3>
          <p>Size: {bird.appearance.size}</p>
          <p>Colors: {bird.appearance.color.join(", ")}</p>
        </div>

        {bird.photos?.length ? (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {bird.photos.map((p, i) => (
              // simple image thumbnails
              <img key={i} src={p} alt={`${bird.commonName}-${i}`} className="w-full h-32 object-cover rounded" />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
