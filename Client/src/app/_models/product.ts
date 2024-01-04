import { Photo } from './photo';

export interface Product {
  id: number;
  productCode: string;
  productName: string;
  flavor: string;
  category?: string;
  size: string;
  price: number;
  description: string;
  photoUrl: string;
  photos: Photo[];
}
