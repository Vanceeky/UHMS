"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  X,
  Check,
  CheckCircle,
  ChevronRight,
  Home,
  Mail,
  Phone,
  Receipt,
  User,
  LogOut,
  MousePointerClick,
} from "lucide-react";

// --- Type Definition ---
// This type should match the one inferred in page.tsx
type Booking = {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  avatarFallback: string;
  status: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  nights: number;
  totalAmount: number;
  downpayment: number;
  remainingBalance: number;
  paymentRef: string;
  paymentReceiptUrl: string;
  guests: number;
  roomNumber?: string; // Added as optional, as check-in process assigns it
};

// --- Props Interface ---
interface CheckInOutPanelProps {
  booking: Booking | null;
  onClose: () => void;
}

// --- Helper Function ---
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // Adjust for timezone
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// --- Mock Available Rooms (can be fetched later) ---
const availableRooms = [
  { number: "201", floor: 2 },
  { number: "202", floor: 2 },
  { number: "205", floor: 2 },
  { number: "301", floor: 3 },
];

export default function CheckInOutPanel({ booking, onClose }: CheckInOutPanelProps) {
  // State for the check-in/out process
  const [activeTab, setActiveTab] = useState<"check-in" | "check-out">("check-in");
  const [currentStep, setCurrentStep] = useState(1);
  const [assignedRoomNumber, setAssignedRoomNumber] = useState<string | null>(null);
  const [roomRemarks, setRoomRemarks] = useState("");
  const [balancePaidInFull, setBalancePaidInFull] = useState(false);
  const [paymentNotes, setPaymentNotes] = useState("");
  const [housekeepingDone, setHousekeepingDone] = useState(false);
  const [keysPrepared, setKeysPrepared] = useState(false);
  const [roomInspected, setRoomInspected] = useState(false);
  const [feedbackNotes, setFeedbackNotes] = useState("");

  // --- State Reset Effect ---
  useEffect(() => {
    if (booking) {
      // Reset all process-specific states
      setCurrentStep(1);
      setAssignedRoomNumber(booking.roomNumber || null); // Pre-fill if already checked-in
      setRoomRemarks("");
      setBalancePaidInFull(false);
      setPaymentNotes("");
      setHousekeepingDone(false);
      setKeysPrepared(false);
      setRoomInspected(false);
      setFeedbackNotes("");

      // Automatically switch tab based on booking status
      if (booking.status === 'confirmed') {
        setActiveTab('check-in');
      } else if (booking.status === 'checked-in') {
        setActiveTab('check-out');
      }
    }
  }, [booking]); // Dependency array: runs only when 'booking' prop changes

  return (
    <div className="w-[480px] flex-shrink-0 h-full"> {/* <-- Occupy full height */}
      <AnimatePresence mode="wait">
        {booking ? (
          // --- Main Panel (When booking is selected) ---
          <motion.div
            key={booking.id} // Use booking.id as key for re-animation
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full" // <-- Occupy full height
          >
            {/* This Card is now the main layout container.
              - h-full: Takes full height from parent
              - flex flex-col: Allows sticky header + scrollable content
              - overflow-hidden: Ensures rounded corners are respected
            */}
            <Card className="h-full flex flex-col shadow-xl overflow-hidden">
              
              {/* --- STICKY HEADER --- */}
              <CardHeader className="pb-4 border-b bg-white pt-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg">
                        {booking.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">{booking.guestName}</h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-mono">{booking.id}</span>
                        <Separator orientation="vertical" className="h-3" />
                        <Badge variant="secondary">{booking.roomType}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={onClose} // Use onClose prop
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              {/* --- STICKY STEP PROGRESS (Only for check-in) --- */}
              {activeTab === 'check-in' && (
                <div className="flex items-center gap-2 px-6 pt-4 pb-4 border-b bg-white">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div
                        className={`w-full h-1 rounded-full ${
                          step <= currentStep ? "bg-blue-600" : "bg-muted"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* --- SCROLLABLE CONTENT --- */}
              <ScrollArea className="flex-1 overflow-y-auto">
                {activeTab === "check-in" ? (
                  // --- CHECK-IN FLOW ---
                  <div className="p-4 space-y-4">
                    
                    {/* STEP 1: Guest Info */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium">Step 1: Guest Information</h3>
                        <Badge
                          variant={currentStep >= 1 ? "default" : "secondary"}
                        >
                          {currentStep > 1 ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            "1"
                          )}
                        </Badge>
                      </div>
                      <Card className="border-blue-200 bg-blue-50/50">
                        <CardContent className="p-4 space-y-3 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Email
                                </div>
                                <div className="font-medium text-xs truncate">
                                  {booking.guestEmail}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Phone
                                </div>
                                <div className="font-medium text-xs">
                                  {booking.guestPhone}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div className="grid grid-cols-3 gap-3 text-sm">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Check-In
                              </div>
                              <div className="font-medium text-xs">{formatDate(booking.checkIn)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Check-Out
                              </div>
                              <div className="font-medium text-xs">{formatDate(booking.checkOut)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Nights
                              </div>
                              <div className="font-medium text-xs">
                                {booking.nights}
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Total Amount
                              </span>
                              <span className="font-medium">
                                ₱{booking.totalAmount.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-green-600">
                              <span>Downpayment</span>
                              <span className="font-medium">
                                ₱{booking.downpayment.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-orange-600">
                              <span className="font-semibold">Remaining Balance</span>
                              <span className="font-semibold">
                                ₱{booking.remainingBalance.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      {currentStep === 1 && (
                        <Button
                          className="w-full mt-3"
                          onClick={() => setCurrentStep(2)}
                        >
                          Continue to Room Assignment
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>

                    {/* STEP 2: Room Assignment */}
                    {currentStep >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium">Step 2: Room Assignment</h3>
                          <Badge
                            variant={currentStep >= 2 ? "default" : "secondary"}
                          >
                            {currentStep > 2 ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              "2"
                            )}
                          </Badge>
                        </div>
                        <Card>
                          <CardContent className="p-4 space-y-4">
                            <Label className="text-sm mb-2 block">
                              Select Available Room ({booking.roomType})
                            </Label>
                            <div className="grid grid-cols-3 gap-2">
                              {availableRooms.map((room) => (
                                <Button
                                  key={room.number}
                                  variant={
                                    assignedRoomNumber === room.number
                                      ? "default"
                                      : "outline"
                                  }
                                  className="h-auto p-3 flex flex-col items-center gap-1"
                                  onClick={() =>
                                    setAssignedRoomNumber(room.number)
                                  }
                                >
                                  <Home className="w-4 h-4" />
                                  <span className="font-medium">
                                    {room.number}
                                  </span>
                                  <span className="text-xs opacity-70">
                                    Floor {room.floor}
                                  </span>
                                </Button>
                              ))}
                            </div>
                            <Label className="text-sm mt-2 block">
                              Room Remarks
                            </Label>
                            <Textarea
                              placeholder="e.g., Near elevator..."
                              value={roomRemarks}
                              onChange={(e) => setRoomRemarks(e.target.value)}
                            />
                          </CardContent>
                        </Card>
                        {currentStep === 2 && (
                          <Button
                            className="w-full mt-3"
                            onClick={() => setCurrentStep(3)}
                            disabled={!assignedRoomNumber}
                          >
                            Continue to Payment
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        )}
                      </motion.div>
                    )}

                    {/* STEP 3: Payment */}
                    {currentStep >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium">
                            Step 3: Payment Confirmation
                          </h3>
                          <Badge
                            variant={currentStep >= 3 ? "default" : "secondary"}
                          >
                            {currentStep > 3 ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              "3"
                            )}
                          </Badge>
                        </div>
                        <Card className="border-green-200 bg-green-50/50">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Remaining Balance
                                </div>
                                <div className="text-2xl font-semibold text-orange-600">
                                  ₱{booking.remainingBalance.toLocaleString()}
                                </div>
                              </div>
                              <Receipt className="w-8 h-8 text-muted-foreground opacity-50" />
                            </div>
                            <Separator />
                            <div className="flex items-center space-x-3 p-3 rounded-lg border bg-white">
                              <Checkbox
                                id="balance-paid"
                                checked={balancePaidInFull}
                                onCheckedChange={(checked) =>
                                  setBalancePaidInFull(checked as boolean)
                                }
                              />
                              <Label
                                htmlFor="balance-paid"
                                className="flex-1 cursor-pointer text-sm"
                              >
                                Balance paid in full at check-in
                              </Label>
                            </div>
                            <Label className="text-sm mb-2 block">
                              Payment Notes
                            </Label>
                            <Textarea
                              placeholder="Payment method, receipt number..."
                              value={paymentNotes}
                              onChange={(e) => setPaymentNotes(e.target.value)}
                            />
                          </CardContent>
                        </Card>
                        {currentStep === 3 && (
                          <Button
                            className="w-full mt-3"
                            onClick={() => setCurrentStep(4)}
                          >
                            Continue to Final Confirmation
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        )}
                      </motion.div>
                    )}

                    {/* STEP 4: Final Confirmation */}
                    {currentStep >= 4 && (
                       <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                       >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium">
                            Step 4: Final Confirmation
                          </h3>
                          <Badge variant="default">4</Badge>
                        </div>
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">
                              Room Readiness Checklist
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 p-3 rounded-lg border">
                              <Checkbox
                                id="housekeeping"
                                checked={housekeepingDone}
                                onCheckedChange={(checked) =>
                                  setHousekeepingDone(checked as boolean)
                                }
                              />
                              <Label htmlFor="housekeeping" className="text-sm flex-1">
                                Housekeeping completed
                              </Label>
                            </div>
                            <div className="flex items-center gap-2 p-3 rounded-lg border">
                              <Checkbox
                                id="keys"
                                checked={keysPrepared}
                                onCheckedChange={(checked) =>
                                  setKeysPrepared(checked as boolean)
                                }
                              />
                              <Label htmlFor="keys" className="text-sm flex-1">
                                Room keys prepared
                              </Label>
                            </div>
                            <div className="flex items-center gap-2 p-3 rounded-lg border">
                              <Checkbox
                                id="inspection"
                                checked={roomInspected}
                                onCheckedChange={(checked) =>
                                  setRoomInspected(checked as boolean)
                                }
                              />
                              <Label htmlFor="inspection" className="text-sm flex-1">
                                Room inspection passed
                              </Label>
                            </div>
                          </CardContent>
                        </Card>
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700 mt-3"
                          size="lg"
                          disabled={
                            !housekeepingDone || !keysPrepared || !roomInspected
                          }
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Confirm Check-In
                        </Button>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  // --- CHECK-OUT FLOW ---
                  <div className="p-4 space-y-6">
                    <Card className="border-purple-200 bg-purple-50/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3"> {/* Removed mb-3 */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                            <Home className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="font-medium">
                              Room {booking.roomNumber || "N/A"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {booking.roomType}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pt-3 border-b">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Receipt className="w-4 h-4" />
                          Final Billing Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Room Charges
                          </span>
                          <span className="font-medium">
                            ₱{booking.totalAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Paid (Downpayment)</span>
                          <span className="font-medium">
                            -₱{booking.downpayment.toLocaleString()}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="font-medium">Amount Due</span>
                          <span className="text-lg font-semibold text-orange-600">
                            ₱{booking.remainingBalance.toLocaleString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <div>
                      <Label className="text-sm mb-2 block">
                        Guest Feedback (Optional)
                      </Label>
                      <Textarea
                        placeholder="Any feedback or notes..."
                        value={feedbackNotes}
                        onChange={(e) => setFeedbackNotes(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      size="lg"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Complete Check-Out
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </Card>
          </motion.div>
        ) : (
          // --- Empty State (When no booking is selected) ---
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full flex flex-col items-center justify-center text-center p-10 border rounded-lg bg-muted/30 border-dashed"
          >
            <MousePointerClick className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg">No Booking Selected</h3>
            <p className="text-muted-foreground text-sm">
              Please select a booking from the list to view details and manage
              check-in or check-out.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
