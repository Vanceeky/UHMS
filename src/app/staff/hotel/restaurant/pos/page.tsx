// pages/point-of-sale.tsx (or wherever your page is)
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, Plus, Minus, Trash2, XCircle, Hotel
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  RadioGroup, RadioGroupItem
} from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Our custom types and components
import { OrderItem, MenuItem, CheckedInGuest, OrderType } from '@/types/pos.types';
import { MENU_ITEMS, CHECKED_IN_GUESTS } from '@/lib/pos-mock-data';
import { MenuItemCard } from '@/components/pos/MenuItemCard';
import { PaymentDialog } from '@/components/pos/PaymentDialog';

// Get unique categories for tabs
const categories = ['All', ...new Set(MENU_ITEMS.map(item => item.category))];

const PointOfSale = () => {
  // State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [checkedInGuests, setCheckedInGuests] = useState<CheckedInGuest[]>(CHECKED_IN_GUESTS);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  // ----- Computed Values -----
  
  const selectedGuest = useMemo(() => {
    return checkedInGuests.find(guest => guest.id === selectedGuestId) || null;
  }, [selectedGuestId, checkedInGuests]);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchTerm]);

  const { totalItems, totalPrice } = useMemo(() => {
    const totalItems = orderItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return { totalItems, totalPrice };
  }, [orderItems]);

  // ----- Event Handlers -----

  const handleAddItem = (itemToAdd: MenuItem) => {
    // Check stock
    const itemInMenu = menuItems.find(item => item.id === itemToAdd.id);
    if (!itemInMenu || itemInMenu.stock <= 0) {
      toast.warning("Out of Stock",{ description: `${itemToAdd.name} is currently unavailable.` });
      return;
    }

    const existingItem = orderItems.find(item => item.id === itemToAdd.id);

    if (existingItem) {
      // Check if adding another exceeds stock
      if (existingItem.quantity >= itemInMenu.stock) {
        toast.warning("Stock Limit Reached", {description: `You cannot add more ${itemToAdd.name}.` });
        return;
      }
      // Increment quantity
      setOrderItems(orderItems.map(item =>
        item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Add new item to order
      setOrderItems([...orderItems, { ...itemToAdd, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    const itemInMenu = menuItems.find(item => item.id === itemId);
    if (!itemInMenu) return;

    // If new quantity is 0 or less, remove it
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    // Check stock limit
    if (newQuantity > itemInMenu.stock) {
      toast.warning("Stock Limit Reached",{description: `Only ${itemInMenu.stock} ${itemInMenu.name} available.` });
      setOrderItems(orderItems.map(item =>
        item.id === itemId ? { ...item, quantity: itemInMenu.stock } : item
      ));
      return;
    }

    // Update quantity
    setOrderItems(orderItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (itemId: string) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
    setSelectedGuestId(null);
  };

  const handleProceedToPayment = () => {
    if (orderItems.length === 0) {
      toast.info( "Empty Order", { description: "Please add items to the order first." });
      return;
    }
    if (orderType === 'room-service' && !selectedGuestId) {
      toast.info("No Guest Selected", {description: "Please select a guest and room."});
      return;
    }
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = () => {
    // This function runs after a successful payment
    // 1. Deduct stock
    const newMenuItems = menuItems.map(menuItem => {
      const orderItem = orderItems.find(oi => oi.id === menuItem.id);
      if (orderItem) {
        return { ...menuItem, stock: menuItem.stock - orderItem.quantity };
      }
      return menuItem;
    });
    setMenuItems(newMenuItems);
    
    // 2. Clear the order
    handleClearOrder();
  };
  
  // Reset guest selection if switching back to dine-in
  useEffect(() => {
    if (orderType === 'dine-in') {
      setSelectedGuestId(null);
    }
  }, [orderType]);


  return (
    <>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        
        {/* Left Column: Menu */}
        <div className="w-1/2 flex flex-col p-4">
          <header className="mb-4">
            <h1 className="text-2xl font-bold">Restaurant POS</h1>
            {/* Search Bar */}
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search menu items..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </header>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="overflow-x-auto h-auto justify-start">
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Menu Grid */}
          <ScrollArea className="flex-1 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-2">
              {filteredMenuItems.length > 0 ? (
                filteredMenuItems.map(item => (
                  <MenuItemCard 
                    key={item.id} 
                    item={item} 
                    onAddItem={handleAddItem} 
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-muted-foreground mt-10">
                  No menu items found.
                </p>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Middle Column: Current Order */}
        <div className="w-1/4 bg-white dark:bg-gray-800 p-4 border-l border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Current Order</h2>
          
          {/* Order Type Toggle */}
          <RadioGroup 
            defaultValue="dine-in" 
            className="grid grid-cols-2 gap-4 mb-4"
            value={orderType}
            onValueChange={(value: OrderType) => setOrderType(value)}
          >
            <div>
              <RadioGroupItem value="dine-in" id="dine-in" className="peer sr-only" />
              <Label
                htmlFor="dine-in"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <XCircle className="mb-2 h-6 w-6" />
                Dine-In
              </Label>
            </div>
            <div>
              <RadioGroupItem value="room-service" id="room-service" className="peer sr-only" />
              <Label
                htmlFor="room-service"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Hotel className="mb-2 h-6 w-6" />
                Room Service
              </Label>
            </div>
          </RadioGroup>

          {/* Room Service Guest Selector */}
          {orderType === 'room-service' && (
            <div className="mb-4">
              <Label htmlFor="guest-select">Select Guest / Room</Label>
              <Select
                value={selectedGuestId || ''}
                onValueChange={(value) => setSelectedGuestId(value)}
              >
                <SelectTrigger id="guest-select" className="w-full">
                  <SelectValue placeholder="Select a checked-in guest..." />
                </SelectTrigger>
                <SelectContent>
                  {checkedInGuests.length > 0 ? (
                    checkedInGuests.map(guest => (
                      <SelectItem key={guest.id} value={guest.id}>
                        {guest.name} - (Room {guest.roomNumber})
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-center text-sm text-muted-foreground">
                      No checked-in guests found.
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Order Items List */}
          <ScrollArea className="flex-1 -mx-4">
            <div className="px-4">
              {orderItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <p>No items in order.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">₱{item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="w-16 text-right font-medium">
                        ₱{item.price * item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-500 hover:text-red-600"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Right Column: Billing */}
        <div className="w-1/4 p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Billing</h2>
          <div className="flex-1 space-y-4">
            <div className="flex justify-between text-lg">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>₱{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleProceedToPayment}
            >
              {orderType === 'dine-in' ? 'Proceed to Payment' : 'Charge to Room'}
            </Button>
            <Button 
              className="w-full" 
              variant="outline" 
              size="lg"
              onClick={handleClearOrder}
            >
              Clear Order
            </Button>
          </div>
        </div>
      </div>
      

      {/* Payment Dialog */}
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        orderType={orderType}
        selectedGuest={selectedGuest}
        totalAmount={totalPrice}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default PointOfSale;