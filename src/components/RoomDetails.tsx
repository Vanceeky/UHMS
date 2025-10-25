"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Users,
  Upload,
  CreditCard,
  Info,
} from "lucide-react";
import RoomSearchCard from "@/components/RoomSearchCard";
import { format, differenceInDays } from "date-fns";

type SearchData = {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
};

interface Room {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  amenities: string[];
  maxAdults: number;
  maxChildren: number;
  extraAdultFee: number;
  extraChildFee: number;
}

const sampleRoomResponse: Room = {
  id: 1,
  name: "Deluxe Room",
  price: 3500,
  description: "A spacious and luxurious room with a view of the city skyline.",
  image: "/deluxe-room-1.jpg",
  amenities: ["Wi-Fi", "TV", "Air Conditioning", "Coffee Maker"],
  maxAdults: 2,
  maxChildren: 1,
  extraAdultFee: 1000,
  extraChildFee: 500,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};

export default function RoomDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const [room, setRoom] = useState<Room | null>(null);
  const [searchData, setSearchData] = useState<SearchData | null>(null);

  useEffect(() => {
    setRoom(sampleRoomResponse);
  }, [id]);

  let nights = 0;
  let extraAdults = 0;
  let extraChildren = 0;
  let basePrice = 0;
  let extraCost = 0;
  let totalCost = 0;
  let downpayment = 0;
  let remainingBalance = 0;

  if (room && searchData) {
    nights = differenceInDays(searchData.checkOut, searchData.checkIn);

    // Limit adults to maxAdults
    const validAdults = Math.min(searchData.adults, room.maxAdults);

    extraAdults =
      searchData.adults > room.maxAdults
        ? searchData.adults - room.maxAdults
        : 0;
    extraChildren =
      searchData.children > room.maxChildren
        ? searchData.children - room.maxChildren
        : 0;

    basePrice = room.price * nights;
    extraCost =
      (extraAdults * room.extraAdultFee + extraChildren * room.extraChildFee) *
      nights;
    totalCost = basePrice + extraCost;
    downpayment = totalCost * 0.2;
    remainingBalance = totalCost * 0.8;

    // update adults with fixed max occupancy
    searchData.adults = validAdults;
  }

  if (!room) return <div>Loading...</div>;

  return (
    <main>
      <div className="min-h-screen pt-4 bg-white">
        {/* Room Search */}
        <div className="py-6 px-4">
          <RoomSearchCard
            roomId={String(room.id)}
            roomName={room.name}
            maxAdults={room.maxAdults}
            maxChildren={room.maxChildren}
            pricePerNight={room.price}
            onSearchComplete={setSearchData}
          />
        </div>

        {/* Main Content */}
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Reservation Summary */}
            <div className="space-y-6">
              <Card className="bg-white shadow-md rounded-2xl pt-4">
                <CardHeader>
                  <CardTitle>Reservation Summary</CardTitle>
                </CardHeader>
                <CardContent className="mb-3">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="my-3 text-xl font-semibold">{room.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-sm px-3 py-1 bg-muted rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Occupancy Policy */}
                  <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex items-center  justify-betweengap-2 mb-3">
                        
                            <Info className="w-4 h-4 mr-2 text-[#2A4B7C]" />
                            <h4 className="text-[#2A4B7C]">Occupancy Policy</h4>
                


                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">Base Adults</div>
                        <div>{room.maxAdults}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Base Children</div>
                        <div>{room.maxChildren}  </div>
                      </div>
                      <div className="text-muted-foreground">
                        <div><span className="text-[#2A4B7C]">+ {formatCurrency(room.extraChildFee)}</span> / night for Extra Child Fee</div>
                      </div>

                    </div>
                  </div>

                  <Separator className="my-3" />

                  {/* Booking Details */}
                  <div className="my-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Check-In
                        </div>
                        <div>
                          {searchData
                            ? format(searchData.checkIn, "EEE, MMM dd, yyyy")
                            : "---"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Check-Out
                        </div>
                        <div>
                          {searchData
                            ? format(searchData.checkOut, "EEE, MMM dd, yyyy")
                            : "---"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
   
                        <div className="text-sm text-muted-foreground">
                          {searchData
                            ? `${searchData.adults + searchData.children} Guests`
                            : "---"}
                        </div>

                        {/* ✅ Added Adults + Children breakdown */}
                        {searchData && (
                          <div className="text-sm">
                            {searchData.adults} Adult
                            {searchData.adults > 1 ? "s" : ""}
                            {searchData.children > 0 && (
                              <>
                                {" • "}
                                {searchData.children} Child
                                {searchData.children > 1 ? "ren" : ""}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  {/* Cost Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {searchData
                          ? `${formatCurrency(room.price)} x ${nights} night(s)`
                          : "Base Rate (per night)"}
                      </span>
                      <span>
                        {searchData
                          ? formatCurrency(basePrice)
                          : formatCurrency(room.price)}
                      </span>
                    </div>

                    {/* ✅ Added number of extra guests in parentheses */}
                    {extraCost > 0 && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>
                          Extra Guests Fee{" "}
                          <span className="text-xs text-muted-foreground">
                            ({extraAdults + extraChildren})
                          </span>
                        </span>
                        <span>{formatCurrency(extraCost)}</span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>
                        {searchData ? formatCurrency(totalCost) : "---"}
                      </span>
                    </div>
                    <div className="flex justify-between text-blue-500 font-medium">
                      <span>20% Downpayment (Required Now)</span>
                      <span>
                        {searchData ? formatCurrency(downpayment) : "---"}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Remaining Balance (Due at Check-in)</span>
                      <span>
                        {searchData ? formatCurrency(remainingBalance) : "---"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right - Guest & Payment Form */}
            <div className="space-y-6">
              <form className="space-y-6">
                <Card className="shadow-md rounded-2xl pt-3">
                  <CardHeader>
                    <CardTitle>Guest Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 mb-4">
                    <div>
                      <Label htmlFor="guestName">Full Name *</Label>
                      <Input id="guestName" placeholder="John Doe" required className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Contact Number *</Label>
                      <Input id="phone" type="tel" placeholder="+63 912 345 6789" required className="mt-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md rounded-2xl pt-3">
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      Pay 20% downpayment (
                      <strong>
                        {searchData ? formatCurrency(downpayment) : "---"}
                      </strong>
                      ) via GCash
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 mb-4">
                    <div className="bg-muted p-6 rounded-lg text-center">
                      <CreditCard className="w-16 h-16 mx-auto mb-4 text-primary" />
                      <h4 className="mb-2 font-medium">Scan to Pay with GCash</h4>
                      <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                        <div className="text-center text-muted-foreground">
                          <div>GCash QR Code</div>
                          <div className="text-sm">(Demo)</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">
                        Hotel GCash Number: 0917-123-4567
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <Label htmlFor="gcashRef">GCash Reference Number *</Label>
                      <Input id="gcashRef" placeholder="Enter 13-digit reference number" required className="mt-2" />
                    </div>

                    <div>
                      <Label htmlFor="screenshot">Payment Screenshot (Optional)</Label>
                      <div className="mt-2">
                        <label
                          htmlFor="screenshot"
                          className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                        >
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Upload className="w-6 h-6" />
                            <span>Click to upload screenshot</span>
                          </div>
                        </label>
                        <input id="screenshot" type="file" accept="image/*" className="hidden" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full" size="lg">
                  Confirm & Submit Reservation
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Your reservation will be pending verification. You will receive a confirmation email once approved.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
