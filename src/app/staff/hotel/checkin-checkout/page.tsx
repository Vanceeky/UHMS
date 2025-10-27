"use client";

import React, { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from '@/components/staff/StatsCard';
import { 
  Clock, 
  CalendarDays, 
  Users, 
  LogOut, 
  LogIn, 
  Search, 
  Calendar, 
  Home,
  Receipt, // Added
  ChevronRight, // Added
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AvatarHelper from '@/lib/helpers/AvatarHelper';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import CheckInOutPanel from '@/components/staff/CheckInOutPanel';
import { Button } from '@/components/ui/button'; // Added
import { cn } from "@/lib/utils"; 

// --- Mock Data and Type ---

const MOCK_BOOKINGS = [
  {
    id: 'BK-2025-513',
    guestName: 'John Doe',
    guestEmail: 'johndoe@email.com',
    guestPhone: '0945-6656-707',
    avatarFallback: 'JD',
    status: 'confirmed', 
    checkIn: '2025-10-27', // Today
    checkOut: '2025-10-29',
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
    status: 'confirmed', 
    checkIn: '2025-10-27', // Today
    checkOut: '2025-10-28',
    roomType: 'Standard Room',
    nights: 1,
    totalAmount: 1200,
    downpayment: 240,
    remainingBalance: 960,
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
    status: 'confirmed', 
    checkIn: '2025-10-29', // Upcoming (in 2 days)
    checkOut: '2025-11-01',
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
    status: 'checked-in', // To show in check-out tab
    checkIn: '2025-10-25',
    checkOut: '2025-10-27', // Due for check-out today
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
    status: 'checked-in', // To show in check-out tab
    checkIn: '2025-10-26',
    checkOut: '2025-10-29', // Due for check-out in 2 days
    roomType: 'Standard Room',
    nights: 3,
    totalAmount: 3600,
    downpayment: 720,
    remainingBalance: 2880,
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
    status: 'checked-out', // Will not show in either tab
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

type Booking = typeof MOCK_BOOKINGS[0];

// --- Helper Functions ---

// Hardcoded "today" for consistent filtering with mock data
const getToday = () => {
  const today = new Date("2025-10-27T12:00:00");
  today.setHours(0, 0, 0, 0);
  return today;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const isToday = (dateString: string) => {
  const today = getToday();
  const targetDate = new Date(dateString);
  targetDate.setMinutes(targetDate.getMinutes() + targetDate.getTimezoneOffset());
  targetDate.setHours(0, 0, 0, 0);
  return today.getTime() === targetDate.getTime();
};

// --- Main Component ---

const CheckInOutManagement = () => {
  // --- State ---
  const [allBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState("checkin"); 
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("today"); 
  const [roomFilter, setRoomFilter] = useState("all");

  // --- Filtering Logic ---
  useEffect(() => {
    const today = getToday();
    const in3Days = new Date(today);
    in3Days.setDate(today.getDate() + 3);
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()) + 1); 

    const filtered = allBookings.filter(booking => {
      if (activeTab === 'checkin') {
        if (booking.status !== 'confirmed') return false;
      } else { 
        if (booking.status !== 'checked-in') return false;
      }

      const targetDateStr = activeTab === 'checkin' ? booking.checkIn : booking.checkOut;
      const targetDate = new Date(targetDateStr);
      targetDate.setMinutes(targetDate.getMinutes() + targetDate.getTimezoneOffset());
      targetDate.setHours(0, 0, 0, 0);

      if (dateFilter === 'today') {
        if (targetDate.getTime() !== today.getTime()) return false;
      } else if (dateFilter === '3days') {
        if (targetDate < today || targetDate > in3Days) return false;
      } else if (dateFilter === 'week') {
        if (targetDate < today || targetDate > endOfWeek) return false;
      }

      if (roomFilter !== 'all' && booking.roomType !== roomFilter) {
        return false;
      }

      const search = searchTerm.toLowerCase();
      if (search &&
        !booking.guestName.toLowerCase().includes(search) &&
        !booking.id.toLowerCase().includes(search) &&
        !booking.guestPhone.includes(search)
      ) {
        return false;
      }
      return true;
    });

    setFilteredBookings(filtered);

    if (selectedBooking) {
      const isSelectedInList = filtered.some(b => b.id === selectedBooking.id);
      if (!isSelectedInList) {
        setSelectedBooking(null);
      }
    }
  }, [activeTab, searchTerm, dateFilter, roomFilter, allBookings, selectedBooking]);


  // --- Render ---
  return (
    <div className='p-2 lg:p-4'>

      <div className="mb-6">
        <h1>Check-In/Out Management</h1>
        <p className="text-muted-foreground">Review, approve, and manage guest check-ins and check-outs</p>
      </div>

      {/* Stats Cards (unchanged) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Check-in Today"
          value="2"
          subtitle="Ready to process"
          icon={<CalendarDays className="w-8 h-8 text-blue-600" />}
          gradientFrom="from-blue-50"
          gradientTo="to-white"
          sub_color="text-blue-600"
        />
        <StatsCard
          title="Upcoming (3 Days)"
          value="1"
          subtitle="Arrivals soon"
          icon={<Clock className="w-8 h-8 text-purple-600" />}
          gradientFrom="from-purple-50"
          gradientTo="to-white"
          sub_color="text-purple-600"
        />
        <StatsCard
          title="Currently In-House"
          value="2"
          subtitle="Active guests"
          icon={<Users className="w-8 h-8 text-green-600" />}
          gradientFrom="from-green-50"
          gradientTo="to-white"
          sub_color="text-green-600"
        />
        <StatsCard
          title="Check-Out Today"
          value="1"
          subtitle="Ready to depart"
          icon={<LogOut className="w-8 h-8 text-rose-600" />}
          gradientFrom="from-rose-50"
          gradientTo="to-white"
          sub_color="text-rose-600"
        />
      </div>


      {/* Main Content - Fixed height container */}
      <div className="flex-1 flex gap-4 overflow-hidden h-[calc(100vh-280px)]">
        
        {/* --- Left Column: Booking List --- */}
        <Card className='flex-1 flex flex-col overflow-hidden pt-3'>
          <CardHeader className='pb-3 pt-0'>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className='grid grid-cols-2 w-full'>
                <TabsTrigger value="checkin" className='gap-2'>
                  <LogIn className='h-4 w-4' />
                  Check-In
                </TabsTrigger>
                <TabsTrigger value="checkout" className='gap-2'>
                  <LogOut className='h-4 w-4' />
                  Check-Out
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder='Search by name, booking ID, or phone...'
                  className='pl-9 h-9'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-32 h-9">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="3days">Next 3 Days</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>

              <Select value={roomFilter} onValueChange={setRoomFilter}>
                <SelectTrigger className="w-40 h-9">
                  <Home className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rooms</SelectItem>
                  <SelectItem value="Standard Room">Standard Room</SelectItem>
                  <SelectItem value="Deluxe Suite">Deluxe Suite</SelectItem>
                  <SelectItem value="Family Room">Family Room</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          {/* --- Scrollable Booking List --- */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            <AnimatePresence>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => {
                  const percentPaid = (booking.downpayment / booking.totalAmount * 100).toFixed(0);
                  const isCheckInToday = isToday(booking.checkIn);
                  const isCheckOutToday = isToday(booking.checkOut);

                  return (
                    <motion.div
                      key={booking.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      onClick={() => setSelectedBooking(booking)}
                      className={cn(
                        "bg-white rounded-lg shadow border transition-all cursor-pointer",
                        selectedBooking?.id === booking.id ? "border-green-500 shadow-md bg-green-50" : "border-transparent hover:shadow-md"
                      )}
                    >
                      <div className="p-4">
                        {/* Top Row: Avatar, Name, Badge */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <AvatarHelper name={booking.avatarFallback} />
                            <div className='flex flex-col truncate'>
                              <span className="font-semibold text-sm truncate">{booking.guestName}</span>
                              <span className="text-xs text-muted-foreground font-mono">{booking.id}</span>
                            </div>
                          </div>
                          {activeTab === 'checkin' && isCheckInToday && (
                            <Badge variant="default" className="bg-blue-100 text-blue-700">Today</Badge>
                          )}
                           {activeTab === 'checkout' && isCheckOutToday && (
                            <Badge variant="default" className="bg-rose-100 text-rose-700">Today</Badge>
                          )}
                        </div>

                        {/* Middle Row: Details Grid */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Home className="w-4 h-4" />
                            <span className="truncate">{booking.roomType}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{booking.nights} night(s)</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{booking.guests} guest(s)</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Receipt className="w-4 h-4" />
                            <span className={cn(
                              percentPaid === '100' ? "text-green-600" : "text-orange-600"
                            )}>{percentPaid}% Paid</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row: Action Button */}
                      {activeTab === 'checkin' ? (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation(); // Don't trigger the div's click
                            setSelectedBooking(booking);
                          }}
                          className="w-full justify-between rounded-t-none bg-green-600 hover:bg-green-700"
                        >
                          <span className="flex items-center gap-2">
                            <LogIn className="w-4 h-4" />
                            Check In
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking(booking);
                          }}
                          className="w-full justify-between rounded-t-none bg-purple-600 hover:bg-purple-700"
                        >
                          <span className="flex items-center gap-2">
                            <LogOut className="w-4 h-4" />
                            Check Out
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      )}
                    </motion.div>
                  )
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-10 flex flex-col items-center justify-center h-full text-center text-muted-foreground"
                >
                  <CalendarDays className="w-12 h-12 mb-4 text-gray-400" />
                  <p className="font-semibold">No Bookings Found</p>
                  <p className="text-sm">Try adjusting your filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* --- Right Column: Details Panel --- */}
        <CheckInOutPanel 
          booking={selectedBooking} 
          onClose={() => setSelectedBooking(null)} 
        />

      </div>
    </div>
  )
}

export default CheckInOutManagement;

