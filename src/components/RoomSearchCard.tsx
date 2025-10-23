"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ArrowLeft, Search } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import type { DateRange } from "react-day-picker";

type RoomSearchCardProps = {
  roomId: string;
  roomName?: string;
  maxAdults?: number;
  maxChildren?: number;
  pricePerNight?: number;
  onSearchComplete?: (data: {
    roomId: string;
    checkIn: Date;
    checkOut: Date;
    adults: number;
    children: number;
    extraChildren: number;
  }) => void;
};

export function RoomSearchCard({
  roomId,
  roomName = "Room",
  maxAdults = 2,
  maxChildren = 1,
  pricePerNight = 3500,
  onSearchComplete,
}: RoomSearchCardProps) {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);

  // Dummy unavailable dates (to be replaced by API)
  const unavailableDates = [
    new Date(2025, 9, 24),
    new Date(2025, 9, 25),
    new Date(2025, 9, 28),
  ];

  const handleCheckAvailability = () => {
    if (!date?.from || !date?.to) {
      toast.error("Please select your check-in and check-out dates.");
      return;
    }

    if (adults < 1) {
      toast.error("Please select at least 1 adult.");
      return;
    }

    if (adults > maxAdults) {
      toast.error(`Maximum ${maxAdults} adult(s) allowed for this room.`);
      return;
    }

    const selectedStart = date.from.getTime();
    const selectedEnd = date.to.getTime();
    const conflict = unavailableDates.some(
      (d) => d.getTime() >= selectedStart && d.getTime() <= selectedEnd
    );

    if (conflict) {
      toast.error("This room is unavailable for the selected dates.");
      return;
    }

    // Calculate if extra children exceed base allowance
    const extraChildren = Math.max(0, children - maxChildren);

    const message =
      extraChildren > 0
        ? `${roomName} is available. ${extraChildren} extra child(ren) will incur additional charges.`
        : `${roomName} is available for your selected dates.`;

    toast.success(message);

    onSearchComplete?.({
      roomId: roomId.toString(),
      checkIn: date.from,
      checkOut: date.to,
      adults,
      children,
      extraChildren,
    });
  };

  return (
    <Card className="container mx-auto max-w-7xl border rounded-2xl shadow-sm mt-8 p-4">
      <div className="flex-1 items-center">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Room Selection
        </Button>
        <h1 className="text-lg font-semibold">Check Room Availability</h1>
      </div>

      <div className="flex flex-col md:flex-row items-end gap-4">
        <div className="flex flex-col flex-1 min-w-[220px]">
          <Label className="mb-1">Select Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal w-full">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from && date?.to
                  ? `${format(date.from, "MMM dd")} - ${format(date.to, "MMM dd, yyyy")}`
                  : "Pick a date range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                disabled={(day) =>
                  unavailableDates.some((u) => u.toDateString() === day.toDateString())
                }
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Adults - fixed max */}
        <div className="flex flex-col w-[120px]">
          <Label htmlFor="adults" className="mb-1">Adults</Label>
          <Input
            id="adults"
            type="number"
            value={adults}
            min={1}
            max={maxAdults}
            onChange={(e) =>
              setAdults(Math.min(Number(e.target.value), maxAdults))
            }
            className="text-center"
          />
        </div>

        {/* Children - can exceed maxChildren for extra charge */}
        <div className="flex flex-col w-[120px]">
          <Label htmlFor="children" className="mb-1">Children</Label>
          <Input
            id="children"
            type="number"
            value={children}
            min={0}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="text-center"
          />
        </div>

        <Button
          onClick={handleCheckAvailability}
          className="flex items-center gap-2 w-full md:w-auto"
        >
          <Search className="w-4 h-4" /> Check Availability
        </Button>
      </div>
    </Card>
  );
}

export default RoomSearchCard;
