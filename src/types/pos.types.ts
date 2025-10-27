// types/pos.types.ts

export interface MenuItem {
  id: string;
  name: string;
  category: 'Breakfast' | 'Main Course' | 'Appetizers' | 'Drinks' | 'Desserts';
  price: number;
  stock: number;
  imageUrl: string;
  isBestSeller: boolean;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface CheckedInGuest {
  id: string;
  name: string;
  roomNumber: string;
}

export type OrderType = 'dine-in' | 'room-service';