// components/pos/MenuItemCard.tsx
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MenuItem } from '@/types/pos.types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddItem: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddItem }) => {
  const isOutOfStock = item.stock <= 0;

  return (
    <Card 
      className={`flex flex-col ${isOutOfStock ? 'opacity-50' : 'cursor-pointer transition-all hover:shadow-md'}`}
      onClick={() => !isOutOfStock && onAddItem(item)}
      aria-disabled={isOutOfStock}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="object-cover w-full h-full rounded-t-lg"
          />
        </AspectRatio>
        {item.isBestSeller && (
          <Badge className="absolute top-2 left-2">Best Seller</Badge>
        )}
      </CardHeader>
      
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{item.category}</p>
        <p 
          className={`text-sm font-medium mt-2 ${isOutOfStock ? 'text-red-500' : 'text-muted-foreground'}`}
        >
          {isOutOfStock ? 'Out of Stock' : `Stock: ${item.stock}`}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 flex justify-between items-center">
        <span className="text-lg font-bold">₱{item.price}</span>
        {/* The + button is removed, click the card to add */}
      </CardFooter>
    </Card>
  );
};