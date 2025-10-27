// lib/mock-data.ts
import { MenuItem, CheckedInGuest } from '@/types/pos.types';

export const MENU_ITEMS: MenuItem[] = [
  { id: 'm1', name: 'Filipino Breakfast', category: 'Breakfast', price: 380, stock: 20, imageUrl: 'https://via.placeholder.com/300x200?text=Filipino+Breakfast', isBestSeller: true },
  { id: 'm2', name: 'Continental Breakfast', category: 'Breakfast', price: 450, stock: 15, imageUrl: 'https://via.placeholder.com/300x200?text=Continental+Breakfast', isBestSeller: false },
  { id: 'm3', name: 'American Breakfast', category: 'Breakfast', price: 520, stock: 10, imageUrl: 'https://via.placeholder.com/300x200?text=American+Breakfast', isBestSeller: false },
  { id: 'm4', name: 'Pancake Stack', category: 'Breakfast', price: 280, stock: 25, imageUrl: 'https://via.placeholder.com/300x200?text=Pancake+Stack', isBestSeller: false },
  { id: 'm5', name: 'Grilled Chicken', category: 'Main Course', price: 480, stock: 12, imageUrl: 'https://via.placeholder.com/300x200?text=Grilled+Chicken', isBestSeller: true },
  { id: 'm6', name: 'Beef Steak', category: 'Main Course', price: 680, stock: 8, imageUrl: 'https://via.placeholder.com/300x200?text=Beef+Steak', isBestSeller: false },
  { id: 'm7', name: 'Seafood Pasta', category: 'Main Course', price: 520, stock: 14, imageUrl: 'https://via.placeholder.com/300x200?text=Seafood+Pasta', isBestSeller: false },
  { id: 'm8', name: 'Pork Chop', category: 'Main Course', price: 420, stock: 10, imageUrl: 'https://via.placeholder.com/300x200?text=Pork+Chop', isBestSeller: false },
  { id: 'm9', name: 'Calamari', category: 'Appetizers', price: 350, stock: 30, imageUrl: 'https://via.placeholder.com/300x200?text=Calamari', isBestSeller: false },
  { id: 'm10', name: 'House Iced Tea', category: 'Drinks', price: 120, stock: 50, imageUrl: 'https://via.placeholder.com/300x200?text=Iced+Tea', isBestSeller: false },
  { id: 'm11', name: 'Cheesecake', category: 'Desserts', price: 250, stock: 15, imageUrl: 'https://via.placeholder.com/300x200?text=Cheesecake', isBestSeller: true },
];

export const CHECKED_IN_GUESTS: CheckedInGuest[] = [
  { id: 'g1', name: 'John Doe', roomNumber: '101' },
  { id: 'g2', name: 'Jane Smith', roomNumber: '102 (Suite)' },
  { id: 'g3', name: 'Robert Brown', roomNumber: '205' },
  { id: 'g4', name: 'Emily Davis', roomNumber: '310 (Deluxe)' },
];