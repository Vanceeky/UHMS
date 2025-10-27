// components/pos/PaymentDialog.tsx
import React, { useState, useMemo } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { OrderType, CheckedInGuest } from '@/types/pos.types';

interface PaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  orderType: OrderType;
  selectedGuest: CheckedInGuest | null;
  totalAmount: number;
  onPaymentSuccess: () => void;
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({
  isOpen,
  onOpenChange,
  orderType,
  selectedGuest,
  totalAmount,
  onPaymentSuccess
}) => {
  const [cashReceived, setCashReceived] = useState(0);

  const change = useMemo(() => {
    return cashReceived - totalAmount;
  }, [cashReceived, totalAmount]);

  const handlePayment = () => {
    // In a real app, you would send this to your backend API
    
    if (orderType === 'dine-in') {
      if (cashReceived < totalAmount) {
        toast.error("Error",{
          
          description: "Cash received is less than the total amount.",
        });
        return;
      }
      console.log('Processing cash payment...', { totalAmount, cashReceived, change });
      toast.success("Payment Successful (Dine-In)", {
        description: `Total: ₱${totalAmount}. Change: ₱${change.toFixed(2)}`,
      });
    }

    if (orderType === 'room-service') {
      console.log('Charging to room...', { guest: selectedGuest, totalAmount });
      toast.info("Charged to Room", {
        description: `₱${totalAmount} added to ${selectedGuest?.name}'s (Room ${selectedGuest?.roomNumber}) bill.`,
      });
    }

    // Reset state and close
    onPaymentSuccess();
    setCashReceived(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {orderType === 'dine-in' ? 'Process Payment' : 'Confirm Room Charge'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount:</span>
            <span>₱{totalAmount.toFixed(2)}</span>
          </div>
          
          <Separator />

          {orderType === 'dine-in' && (
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cash" className="text-right">
                  Cash Received
                </Label>
                <Input
                  id="cash"
                  type="number"
                  value={cashReceived || ''}
                  onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
                  className="col-span-3"
                />
              </div>
              <div className="flex justify-between items-center text-md">
                <span>Change:</span>
                <span className={change < 0 ? 'text-red-500' : 'text-green-600'}>
                  ₱{change.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {orderType === 'room-service' && selectedGuest && (
            <div className="space-y-2">
              <h4 className="font-medium">Charge Details</h4>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guest:</span>
                <span>{selectedGuest.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room:</span>
                <span>{selectedGuest.roomNumber}</span>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                This amount will be added to the guest's final bill upon check-out.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            type="button" 
            onClick={handlePayment}
            disabled={orderType === 'dine-in' && cashReceived < totalAmount}
          >
            {orderType === 'dine-in' ? 'Confirm Payment' : 'Charge to Room'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};