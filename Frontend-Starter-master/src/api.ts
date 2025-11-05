import { Bird } from "./types";

const BASE = "https://birdbackendinterview.onrender.com";

async function handleResp(res: Response) {
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || res.statusText);
  }
  return res.json();
}

export const api = {
  listBirds: async (): Promise<Bird[]> => {
    const res = await fetch(`${BASE}/bird`);
    return handleResp(res);
  },
  getBird: async (id: string): Promise<Bird> => {
    const res = await fetch(`${BASE}/bird/${id}`);
    return handleResp(res);
  },
  createBird: async (bird: Bird): Promise<Bird> => {
    const res = await fetch(`${BASE}/bird`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bird),
    });
    return handleResp(res);
  },
  updateBird: async (id: string, bird: Bird): Promise<Bird> => {
    const res = await fetch(`${BASE}/bird/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bird),
    });
    return handleResp(res);
  },
  deleteBird: async (id: string) => {
    const res = await fetch(`${BASE}/bird/${id}`, { method: "DELETE" });
    return handleResp(res);
  },
};

export default api;