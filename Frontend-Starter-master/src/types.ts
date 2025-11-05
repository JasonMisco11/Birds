export type Bird = {
  _id: string;
  commonName: string;
  scientificName: string;
  description: string;
  habitat: string[];
  appearance: {
    size: string;
    color: string[];
  };
  photos: string[];
};
