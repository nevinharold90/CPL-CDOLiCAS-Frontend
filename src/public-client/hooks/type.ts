export interface Book {
  id: string;
  title: string;
  author: string;
  callNumber: string;
  category: string;
  available: boolean;
  // New fields for list view
  coverUrl?: string;
  materialType: string;
  publicationDetails: string;
  rating: number; // 0–5
}