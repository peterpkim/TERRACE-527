
export interface Room {
  id: string;
  name: string;
  type: 'glamping' | 'pension';
  isNew?: boolean;
  isCoupleRecommended?: boolean;
  description: string;
  priceRange: string;
  maxPeople: number;
  features: string[];
  imageUrl: string;
}

export interface Activity {
  id: string;
  title: string;
  category: 'indoor' | 'outdoor';
  description: string;
  imageUrl: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}
