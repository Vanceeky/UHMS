import React from 'react'

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

const Bookings = () => {
  return (
    <div className='p-4 lg:p-8'>

      <div className="mb-6">
        <h1 className="mb-2">Booking Management</h1>
        <p className="text-muted-foreground">Review, approvew, and manage guest reservations</p>
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

            {/* Tabs */}
      <Tabs value="all" className="mb-6">
        <TabsList className="grid grid-cols-5 w-full lg:w-auto">
          <TabsTrigger value="all">
            All (6)
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending (2)
          </TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmed (1)
          </TabsTrigger>
          <TabsTrigger value="checked-in">
            Checked In (2)
          </TabsTrigger>
          <TabsTrigger value="checked-out">
            Checked Out (1)
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-all cursor-pointer group">

          <CardContent className='p-5'>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <AvatarHelper name="John Doe" imageUrl="" className='bg-gradient-to-br from-blue-500 to-purple-500 text-white'/>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sx text-muted-foreground font-mono">BK-2025-513</div>
                </div>
              </div>
              
                <BadgeHelper status="confirmed" />
            </div>


            <Separator className='mb-4'/>

            <div className="space-y-2.5 mb-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className='w-4 h-4 text-muted-foreground'/>
                <span className="text-muted-foreground">Check-in:</span>
                <span className="font-medium ml-auto">Oct, 25, 2025</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Check-out:</span>
                  <span className="font-medium ml-auto">Oct, 27, 2025</span>
                
              </div>

              <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Room:</span>
                  <span className="font-medium">Deluxe Suite</span>
              </div>

              <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nights:</span>
                  <span className="font-medium">2</span>
              </div>

              <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-medium">₱3,500</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className='flex-1'>
                  <Eye className="w-4 h-4 mr-2"/>
                  Review

                </Button>
                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
              </div>

            </div>
      


          </CardContent>

        </Card>
      </div>



      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent className='w-full sm:max-w-xl overflow-y-auto'>
          <SheetHeader>
            <SheetTitle>Booking Details</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6 m-3">
            <Card className=''>
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
                      JD
                    </AvatarFallback>
                  </Avatar>
                      <div className="flex-1">
                        <h3 className="mb-1 text-lg">John Doe</h3>
                        <BadgeHelper status ="confirmed" />
                      </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="ml-auto">johndoe@email.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="ml-auto">0945-6656-707</span>
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
                    <div className="font-mono">BK-2025-513</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Room Type</div>
                    <div>Deluxed Suite</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Check-In Date</div>
                    <div>Thu, Oct 23, 2025</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Check-Out Date</div>
                    <div>Sun, Oct 26, 2025</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Number of Guests</div>
                    <div>3</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Total Nights</div>
                    <div>3</div>
                  </div>
                </div>
                </CardContent>

            </Card>

            <Card className='border-green-200 bg-green-50'>

              <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 mt-3">
                      <CreditCard className="w-5 h-5" />
                      Payment Information
                    </CardTitle>
              </CardHeader>


              <CardContent className='space-y-3 mb-3'>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate per Night</span>
                  <span className="font-medium">₱ 5,000.00</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-medium">₱ 10,000.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-green-700">
                  <span className="font-medium">✓ Downpayment Paid (20%)</span>
                  <span className="font-medium">₱ 2,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining Balance</span>
                  <span className="font-medium text-orange-600">₱ 8,000.00</span>
                </div>

                 <Separator />
                <div className="bg-white p-3 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">GCash Reference Number</div>
                      <div className="font-mono text-sm">123456789</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-2 cursor-pointer"
                    >
                      <Image className="w-4 h-4 mr-1" />
                      View Receipt
                    </Button>
                  </div>
                </div>
                   

                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium">Verification Checklist</div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center gap-2">
                      <Checkbox/>
                      <span>Payment reference verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox/>
                      <span>Room availability confirmed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox/>
                      <span>Guest information complete</span>
                    </div>
                  </div>
                </div>


              </CardContent>

            </Card>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">
                Please complete all verification checklist items before approving this booking.
              </p>
            </div>


            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                <XCircle className="w-4 h-4 mr-2" />
                Reject Booking
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Booking
              </Button>
            </div>



          </div>
        </SheetContent>
      </Sheet>


{/* Receipt Viewer Dialog */}
      <Dialog>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>GCash Payment Receipt</DialogTitle>
            <DialogDescription>
              Review the uploaded payment receipt for booking BK-2025-513
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Mock receipt image - in production this would load the actual uploaded image */}
            <div className="bg-muted rounded-lg p-8 text-center">
              <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">

              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Verification Tip</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Verify that the reference number matches, the amount is correct (₱ 10,000.00), 
                    and the transaction date is recent.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">
              Close
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Verified
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Rejection Dialog */}
      <Dialog>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-600" />
              Send Rejection Email
            </DialogTitle>
            <DialogDescription>
              This will send a rejection notification to johndoe@email.com and cancel the booking.
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
                />
              </div>

              <div>
                <Label htmlFor="rejectSubject" className="flex items-center gap-2">
                  Subject *
                </Label>
                <Input
                  id="rejectSubject"
                  placeholder="e.g., Booking Cancellation - Unable to Process Your Reservation"className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="rejectMessage" className="flex items-center gap-2">
                  Message *
                </Label>
                <Textarea
                  id="rejectMessage"
                  placeholder="Dear [Guest Name],\n\nWe regret to inform you that we are unable to process your booking reservation (ID: [Booking ID]) for the following reason:\n\n[Provide detailed reason here]\n\nIf you have any questions, please feel free to contact us.\n\nBest regards,\nHotel Management Team"
                  className="mt-2 min-h-[180px]"
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
                    type="file"className="cursor-pointer"
                  />
                    <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                      <Paperclip className="w-3 h-3" />
                      test file
                    </p>
               
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button
              variant="outline">
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700">
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