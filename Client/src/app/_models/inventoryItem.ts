import { Product } from "./product";

export interface InventoryItem extends Product {   
    status: string;
    stocks?: number;
    quantity?: number;
    brand?: string;
}