import React from 'react'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { Separator } from '@/components/ui/separator'
import { CheckCircle, Download, Printer, Home, Calendar, User, Phone, Mail, CreditCard } from 'lucide-react';



const ConfirmationTicket = () => {
  return (
    <main>
        <div className="min-h-screen pt-15 bg-white">
            <div className="max-w-4xl mx-auto px-4">

                <div className='text-center mb-8'>
                    <div className="inline-flex items-center gap-3 px-6 py-4 bg-amber-100 border border-amber-300 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-amber-600">Reservation Pending Verification</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                            We're verifying your payment. You'll receive a confirmation email within 24 hours.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Booking Ticket */}
                <Card className="print:shadow-none">
                <CardContent className="p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-8">
                    <h1 className="mb-2">Booking Confirmation</h1>
                    <div className="flex items-center justify-center gap-4 text-muted-foreground">
                        <span>Booking ID</span>
                        <Badge variant="outline" className="text-lg px-4 py-1">
                            BK 2025-513
                        </Badge>
                    </div>
                    </div>

                    <Separator className="mb-8" />

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Guest Information */}
                    <div>
                        <h3 className="mb-4 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Guest Information
                        </h3>
                        <div className="space-y-3">
                        <div>
                            <div className="text-sm text-muted-foreground">Full Name</div>
                            <div>James Ivan Mingarine</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            Contact Number
                            </div>
                            <div>0945 6656 707</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            Email Address
                            </div>
                            <div className="break-all">vanceeq@gmail.com</div>
                        </div>
                        </div>
                    </div>

                    {/* Reservation Details */}
                    <div>
                        <h3 className="mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Reservation Details
                        </h3>
                        <div className="space-y-3">
                        <div>
                            <div className="text-sm text-muted-foreground">Room Type</div>
                            <div>Deluxe Room</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <div className="text-sm text-muted-foreground">Check-In</div>
                            <div>Oct. 23, 2025</div>
                            </div>
                            <div>
                            <div className="text-sm text-muted-foreground">Check-Out</div>
                            <div>Oct. 24, 2025</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Duration</div>
                            <div>1 Night</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Number of Guests</div>
                            <div>2 Guests</div>
                        </div>
                        </div>
                    </div>
                    </div>

                    <Separator className="mb-8" />

                    {/* Payment Summary */}
                    <div className="bg-muted/50 rounded-lg p-6 mb-8">
                    <h3 className="mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Summary
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                        <span className="text-muted-foreground">Rate per Night</span>
                        <span>₱3,500</span>
                        </div>
                        <div className="flex justify-between">
                        <span className="text-muted-foreground">Number of Nights</span>
                        <span>× 1</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                        <span>Total Amount</span>
                        <span>₱3,500</span>
                        </div>
                        <div className="flex justify-between text-green-500">
                        <span>20% Downpayment Paid</span>
                        <span>₱700</span>
                        </div>
                        <div className="flex justify-between">
                        <span>Remaining Balance</span>
                        <span className="text-destructive">₱2,800</span>
                        </div>
                        
                        <div className="pt-3 border-t border-border">
                            <div className="text-sm text-muted-foreground">GCash Reference</div>
                            <div className="font-mono">1234567890789</div>
                        </div>
                     
                    </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <h4 className="mb-3">Important Information</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Please pay the remaining balance of ₱2,800 upon check-in</li>
                        <li>• Check-in time: 2:00 PM | Check-out time: 12:00 PM</li>
                        <li>• Please present a valid ID during check-in</li>
                        <li>• Save this confirmation for your records</li>
                        
                        <li className="text-amber-600">• Your booking is pending payment verification</li>
                    
                    </ul>
                    </div>
                </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 print:hidden">
                <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                </Button>
                <Button variant="outline" className="flex-1">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Ticket
                </Button>
                <Button className="flex-1">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                </Button>
                </div>

                {/* Footer Note */}
                <p className="text-center text-sm text-muted-foreground mt-8 mb-8">
                Thank you for choosing our hotel. We look forward to hosting you!
                </p>



            </div>
        </div>
    </main>
  )
}

export default ConfirmationTicket