import { Photo } from './photo';

export interface Product {
  productCode: string;
  productName: string;
  flavor: string;
  category?: string;
  size: string;
  price: number;
  description: string;
  photos: Photo[];
}
