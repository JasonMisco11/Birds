export interface BirdAppearance {
  size: string;
  color: string[];
}

export interface Bird {
  _id: string;
  commonName: string;
  scientificName: string;
  description: string;
  habitat: string[];
  appearance: BirdAppearance;
  photos: string[];
}

export type BirdInput = Omit<Bird, '_id'> & { _id?: string };