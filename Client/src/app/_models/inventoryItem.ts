export interface InventoryItem {
    id: string;
    name: string;
    category?: string;
    status: string;
    stocks?: number;
    quantity?: number;
    price: number;
}