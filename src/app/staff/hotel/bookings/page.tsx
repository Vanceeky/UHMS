"use client";
import React, { useState, useEffect } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

import AvatarHelper from '@/lib/helpers/AvatarHelper';
import BadgeHelper from '@/lib/helpers/BadgeHelper';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { Search, Filter, Calendar, Eye, CheckCircle, Mail, Phone, CreditCard, User, Image, AlertCircle, XCircle, Send, Paperclip } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// --- 1. Sample Data ---

// Define the type for a booking
type Booking = {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  avatarFallback: string;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'rejected';
  checkIn: string;
  checkOut: string;
  roomType: string;
  nights: number;
  totalAmount: number;
  downpayment: number;
  remainingBalance: number;
  paymentRef: string;
  paymentReceiptUrl: string; // Using a mock URL
  guests: number;
};

const sampleBookings: Booking[] = [
  {
    id: 'BK-2025-513',
    guestName: 'John Doe',
    guestEmail: 'johndoe@email.com',
    guestPhone: '0945-6656-707',
    avatarFallback: 'JD',
    status: 'pending', // To show in pending tab
    checkIn: '2025-10-25',
    checkOut: '2025-10-27',
    roomType: 'Deluxe Suite',
    nights: 2,
    totalAmount: 3500,
    downpayment: 700,
    remainingBalance: 2800,
    paymentRef: '123456789',
    paymentReceiptUrl: 'https://via.placeholder.com/400x600.png?text=Mock+GCash+Receipt+1',
    guests: 2,
  },
  {
    id: 'BK-2025-514',
    guestName: 'Jane Smith',
    guestEmail: 'jane.smith@email.com',
    guestPhone: '0917-1234-567',
    avatarFallback: 'JS',
    status: 'pending', // To show in pending tab
    checkIn: '2025-10-26',
    checkOut: '2025-10-28',
    roomType: 'Standard Room',
    nights: 2,
    totalAmount: 2400,
    downpayment: 480,
    remainingBalance: 1920,
    paymentRef: '987654321',
    paymentReceiptUrl: 'https://via.placeholder.com/400x600.png?text=Mock+GCash+Receipt+2',
    guests: 1,
  },
  {
    id: 'BK-2025-515',
    guestName: 'Alice Johnson',
    guestEmail: 'alice.j@email.com',
    guestPhone: '0922-9876-543',
    avatarFallback: 'AJ',
    status: 'confirmed', // To show in confirmed tab
    checkIn: '2025-11-01',
    checkOut: '2025-11-04',
    roomType: 'Family Room',
    nights: 3,
    totalAmount: 6000,
    downpayment: 1200,
    remainingBalance: 4800,
    paymentRef: 'A1B2C3D4E5',
    paymentReceiptUrl: 'https://via.placeholder.com/400x600.png?text=Mock+GCash+Receipt+3',
    guests: 4,
  },
  {
    id: 'BK-2025-516',
    guestName: 'Robert Brown',
    guestEmail: 'rob.brown@email.com',
    guestPhone: '0933-1111-222',
    avatarFallback: 'RB',
    status: 'checked-in', // To show in checked-in tab
    checkIn: '2025-10-24',
    checkOut: '2025-10-26',
    roomType: 'Deluxe Suite',
    nights: 2,
    totalAmount: 3500,
    downpayment: 3500, // Paid in full
    remainingBalance: 0,
    paymentRef: 'F6G7H8I9J0',
    paymentReceiptUrl: 'https://via.placeholder.com/400x600.png?text=Mock+GCash+Receipt+4',
    guests: 2,
  },
  {
    id: 'BK-2025-517',
    guestName: 'Michael Davis',
    guestEmail: 'mike.davis@email.com',
    guestPhone: '0944-5555-666',
    avatarFallback: 'MD',
    status: 'checked-in', // To show in checked-in tab
    checkIn: '2025-10-25',
    checkOut: '2025-10-29',
    roomType: 'Standard Room',
    nights: 4,
    totalAmount: 4800,
    downpayment: 960,
    remainingBalance: 3840,
    paymentRef: 'K1L2M3N4O5',
    paymentReceiptUrl: 'https://via.placeholder.com/400x600.png?text=Mock+GCash+Receipt+5',
    guests: 2,
  },
  {
    id: 'BK-2025-518',
    guestName: 'Emily White',
    guestEmail: 'em.white@email.com',
    guestPhone: '0955-7777-888',
    avatarFallback: 'EW',
    status: 'checked-out', // To show in checked-out tab
    checkIn: '2025-10-20',
    checkOut: '2025-10-23',
    roomType: 'Family Room',
    nights: 3,
    totalAmount: 6000,
    downpayment: 6000, // Paid in full
    remainingBalance: 0,
    paymentRef: 'P6Q7R8S9T0',
    paymentReceiptUrl: 'https://via.placeholder.com/400x600.png?text=Mock+GCash+Receipt+6',
    guests: 3,
  },
];

// Helper for formatting currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
};

// Helper for formatting dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
};

const formatSimpleDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const Bookings = () => {
  // --- 2. Manage Tab State ---
  const [selectedTab, setSelectedTab] = useState('all');

  // --- 3. Manage Selected Booking for Sheet ---
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // --- 4. Manage Dialog States ---
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  // --- 5. Manage Checklist State ---
  const [checklist, setChecklist] = useState({
    payment: false,
    room: false,
    guest: false,
  });

  // Effect to reset checklist when a new booking is selected
  useEffect(() => {
    if (selectedBooking) {
      // Reset checklist
      setChecklist({ payment: false, room: false, guest: false });
    }
  }, [selectedBooking]);

  // Calculate if all checklist items are checked
  const allChecked = checklist.payment && checklist.room && checklist.guest;

  // --- 2. Filter Bookings Based on Tab ---
  const filteredBookings = sampleBookings.filter(booking => {
    if (selectedTab === 'all') return true;
    return booking.status === selectedTab;
  });

  // --- 6. Dynamic Tab Counts ---
  const getCount = (status: 'all' | Booking['status']) => {
    if (status === 'all') return sampleBookings.length;
    return sampleBookings.filter(b => b.status === status).length;
  };

  // --- Handlers to open dialogs ---
  const handleOpenReceipt = () => setIsReceiptOpen(true);
  const handleOpenReject = () => setIsRejectOpen(true);

  // --- Handlers for main actions ---
  const handleApprove = () => {
    if (!selectedBooking) return;
    alert(`Booking ${selectedBooking.id} approved!`);
    // In a real app, you would:
    // 1. Call an API to update the booking status to 'confirmed'
    // 2. Refresh the sampleBookings list (or refetch from API)
    // 3. Close the sheet
    setSelectedBooking(null);
  };

  const handleReject = () => {
    if (!selectedBooking) return;
    alert(`Booking ${selectedBooking.id} rejected!`);
    // In a real app, you would:
    // 1. Call an API to send email and update status to 'rejected'
    // 2. Refresh the sampleBookings list
    // 3. Close the rejection dialog
    // 4. Close the details sheet
    setIsRejectOpen(false);
    setSelectedBooking(null);
  };


  return (
    <div className='p-4 lg:p-8'>

      <div className="mb-6">
        <h1>Booking Management</h1>
        <p className="text-muted-foreground">Review, approve, and manage guest reservations</p>
      </div>

      {/* Search & Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by booking ID, or guest name..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* --- 2. Tabs (Updated) --- */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList className="grid grid-cols-5 w-full lg:w-auto">
          <TabsTrigger value="all">
            All ({getCount('all')})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({getCount('pending')})
          </TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmed ({getCount('confirmed')})
          </TabsTrigger>
          <TabsTrigger value="checked-in">
            Checked In ({getCount('checked-in')})
          </TabsTrigger>
          <TabsTrigger value="checked-out">
            Checked Out ({getCount('checked-out')})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* --- 2. Dynamic Booking List --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <Card
              key={booking.id}
              className="hover:shadow-lg transition-all group"
            >
              <CardContent className='p-5'>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AvatarHelper
                      name={booking.guestName}
                      imageUrl="" // You can add imageUrl if you have it
                      className='bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                    />
                    <div>
                      <div className="font-medium">{booking.guestName}</div>
                      <div className="text-sx text-muted-foreground font-mono">{booking.id}</div>
                    </div>
                  </div>
                  <BadgeHelper status={booking.status} />
                </div>

                <Separator className='mb-4' />

                <div className="space-y-2.5 mb-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className='w-4 h-4 text-muted-foreground' />
                    <span className="text-muted-foreground">Check-in:</span>
                    <span className="font-medium ml-auto">{formatSimpleDate(booking.checkIn)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Check-out:</span>
                    <span className="font-medium ml-auto">{formatSimpleDate(booking.checkOut)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Room:</span>
                    <span className="font-medium">{booking.roomType}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nights:</span>
                    <span className="font-medium">{booking.nights}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-medium">{formatCurrency(booking.totalAmount)}</span>
                  </div>

                  {/* --- 3. Connect Buttons to Sheet --- */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className='flex-1'
                      onClick={() => setSelectedBooking(booking)} // Open sheet
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Review
                    </Button>

                    {/* Only show "Approve" button on card if status is pending */}
                    {booking.status === 'pending' && (
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => setSelectedBooking(booking)} // Also open sheet
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-10">
            No bookings found for this status.
          </div>
        )}
      </div>

      {/* --- 3. Controlled Sheet --- */}
      <Sheet open={!!selectedBooking} onOpenChange={(isOpen) => !isOpen && setSelectedBooking(null)}>
        {/* Remove SheetTrigger, it's now controlled by state */}
        <SheetContent className='w-full sm:max-w-xl overflow-y-auto'>
          <SheetHeader>
            <SheetTitle>Booking Details</SheetTitle>
          </SheetHeader>

          {/* Render content only if a booking is selected */}
          {selectedBooking && (
            <div className="mt-6 space-y-6 m-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 mt-3">
                    <User className="w-5 h-5" />
                    Guest Information
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 mb-3'>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                        {selectedBooking.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg">{selectedBooking.guestName}</h3>
                      <BadgeHelper status={selectedBooking.status} />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Email:</span>
                      <span className="ml-auto">{selectedBooking.guestEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="ml-auto">{selectedBooking.guestPhone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 mt-3">
                    <Calendar className="w-5 h-5" />
                    Reservation Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-muted-foreground mb-1">Booking ID</div>
                      <div className="font-mono">{selectedBooking.id}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Room Type</div>
                      <div>{selectedBooking.roomType}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Check-In Date</div>
                      <div>{formatDate(selectedBooking.checkIn)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Check-Out Date</div>
                      <div>{formatDate(selectedBooking.checkOut)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Number of Guests</div>
                      <div>{selectedBooking.guests}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Total Nights</div>
                      <div>{selectedBooking.nights}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Card - only show if status is 'pending' or 'confirmed' */}
              {(selectedBooking.status === 'pending' || selectedBooking.status === 'confirmed') && (
                <Card className={selectedBooking.status === 'pending' ? 'border-amber-200 bg-amber-50' : 'border-green-200 bg-green-50'}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 mt-3">
                      <CreditCard className="w-5 h-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3 mb-3'>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Amount</span>
                      <span className="font-medium">{formatCurrency(selectedBooking.totalAmount)}</span>
                    </div>
                    <Separator />
                    <div className={`flex justify-between ${selectedBooking.status === 'confirmed' ? 'text-green-700' : 'text-amber-700'}`}>
                      <span className="font-medium">
                        {selectedBooking.status === 'confirmed' ? '✓' : '•'} Downpayment Paid (20%)
                      </span>
                      <span className="font-medium">{formatCurrency(selectedBooking.downpayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining Balance</span>
                      <span className={`font-medium ${selectedBooking.remainingBalance > 0 ? 'text-orange-600' : ''}`}>
                        {formatCurrency(selectedBooking.remainingBalance)}
                      </span>
                    </div>

                    <Separator />
                    <div className="bg-white p-3 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">GCash Reference Number</div>
                          <div className="font-mono text-sm">{selectedBooking.paymentRef}</div>
                        </div>
                        {/* --- 4. Connect Receipt Button --- */}
                        <Button
                          size="sm"
                          variant="outline"
                          className="ml-2 cursor-pointer"
                          onClick={handleOpenReceipt}
                        >
                          <Image className="w-4 h-4 mr-1" />
                          View Receipt
                        </Button>
                      </div>
                    </div>

                    {/* --- 5. Checklist Logic --- */}
                    {/* Only show checklist for 'pending' bookings */}
                    {selectedBooking.status === 'pending' && (
                      <>
                        <Separator />
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Verification Checklist</div>
                          <div className="space-y-1.5 text-sm">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id="check-payment"
                                checked={checklist.payment}
                                onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, payment: !!checked }))}
                              />
                              <Label htmlFor='check-payment' className='cursor-pointer'>Payment reference verified</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id="check-room"
                                checked={checklist.room}
                                onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, room: !!checked }))}
                              />
                              <Label htmlFor='check-room' className='cursor-pointer'>Room availability confirmed</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id="check-guest"
                                checked={checklist.guest}
                                onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, guest: !!checked }))}
                              />
                              <Label htmlFor='check-guest' className='cursor-pointer'>Guest information complete</Label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* --- 5. Checklist Warning --- */}
              {selectedBooking.status === 'pending' && !allChecked && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-700">
                    Please complete all verification checklist items before approving this booking.
                  </p>
                </div>
              )}

              {/* --- 4. & 5. Action Buttons --- */}
              {/* Only show actions for 'pending' bookings */}
              {selectedBooking.status === 'pending' && (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                    onClick={handleOpenReject}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Booking
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={!allChecked} // Disabled based on checklist
                    onClick={handleApprove}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Booking
                  </Button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>


      {/* --- 4. Controlled Receipt Dialog --- */}
      <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>GCash Payment Receipt</DialogTitle>
            <DialogDescription>
              Review the uploaded payment receipt for booking {selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Mock receipt image - in production this would load the actual uploaded image */}
            <div className="bg-muted rounded-lg p-8 text-center">
              <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
                {/* Use an img tag to show the mock receipt URL */}
                <img 
                  src={selectedBooking?.paymentReceiptUrl} 
                  alt={`Receipt for ${selectedBooking?.id}`} 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Verification Tip</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Verify that the reference number matches ({selectedBooking?.paymentRef}), the amount is correct ({formatCurrency(selectedBooking?.downpayment || 0)}),
                    and the transaction date is recent.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReceiptOpen(false)}>
              Close
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                // Mark payment as verified in checklist and close dialog
                setChecklist(prev => ({ ...prev, payment: true }));
                setIsReceiptOpen(false);
              }}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Verified
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* --- 4. Controlled Rejection Dialog --- */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-600" />
              Send Rejection Email
            </DialogTitle>
            <DialogDescription>
              This will send a rejection notification to {selectedBooking?.guestEmail} and cancel the booking.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Email preview card */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900">Important</p>
                    <p className="text-sm text-red-700 mt-1">
                      This action cannot be undone. The guest will receive an email notification with the details below.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <Label htmlFor="rejectTo" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  To
                </Label>
                <Input
                  id="rejectTo" disabled
                  className="mt-2 bg-muted"
                  value={selectedBooking?.guestEmail || ''} // Populate with selected guest email
                />
              </div>

              <div>
                <Label htmlFor="rejectSubject" className="flex items-center gap-2">
                  Subject *
                </Label>
                <Input
                  id="rejectSubject"
                  placeholder="e.g., Booking Cancellation - Unable to Process Your Reservation"
                  className="mt-2"
                  defaultValue={`Regarding your Booking: ${selectedBooking?.id}`}
                />
              </div>

              <div>
                <Label htmlFor="rejectMessage" className="flex items-center gap-2">
                  Message *
                </Label>
                <Textarea
                  id="rejectMessage"
                  placeholder="Dear [Guest Name],..."
                  className="mt-2 min-h-[180px]"
                  // Use defaultValue to pre-fill the template
                  defaultValue={
`Dear ${selectedBooking?.guestName},

We regret to inform you that we are unable to process your booking reservation (ID: ${selectedBooking?.id}) for the following reason:

[Provide detailed reason here]

If you have any questions, please feel free to contact us.

Best regards,
Hotel Management Team`
                  }
                />
              </div>

              <div>
                <Label htmlFor="rejectAttachment" className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  Attachment (Optional)
                </Label>
                <div className="mt-2">
                  <Input
                    id="rejectAttachment"
                    type="file" className="cursor-pointer"
                  />
                  {/* This part can be dynamic based on file selection */}
                  {/* <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                    <Paperclip className="w-3 h-3" />
                    test file
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsRejectOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleReject}
            >
              <Send className="w-4 h-4 mr-2" />
              Send & Reject Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Bookings