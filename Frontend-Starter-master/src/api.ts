import { Bird } from "../src/types";
import { BirdInput } from "./types";

const BASE_URL = 'https://birdbackendinterview.onrender.com';

export const api = {
  getAllBirds: async (): Promise<Bird[]> => {
    const response = await fetch(`${BASE_URL}/bird`);
    if (!response.ok) {
      throw new Error('Failed to fetch birds');
    }
    return response.json();
  },
  
  getBird: async (id: string): Promise<Bird> => {
    const response = await fetch(`${BASE_URL}/bird/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch bird');
    }
    return response.json();
  },
  
  createBird: async (bird: BirdInput): Promise<Bird> => {
    const response = await fetch(`${BASE_URL}/bird`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bird),
    });
    if (!response.ok) {
      throw new Error('Failed to create bird');
    }
    return response.json();
  },
  
  updateBird: async (id: string, bird: BirdInput): Promise<Bird> => {
    const response = await fetch(`${BASE_URL}/bird/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bird),
    });
    if (!response.ok) {
      throw new Error('Failed to update bird');
    }
    return response.json();
  },
  
  deleteBird: async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/bird/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete bird');
    }
  },
};