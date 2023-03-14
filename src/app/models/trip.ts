import { Rating } from './rating';

export interface Trip {
  id: string;
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  unitPrice: number;
  maxSlots: number;
  description: string;
  imageLink: string;
  rating: Rating[];
  images: string[];
}
