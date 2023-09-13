import { Product } from "./product";

export interface Order {    
    id: number;
    transaction_id: string;
    customer: string;
    products: Product[];
    date: Date;
    number_of_items: number;
    total_amount: number;
    status: string;
  }