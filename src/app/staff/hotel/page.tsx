"use client";

import StatsCard from "@/components/staff/StatsCard";
import { CalendarCheck, Clock, Users, Home, ArrowRight, Sun, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

import AvatarHelper from "@/lib/helpers/AvatarHelper";
import BadgeHelper from "@/lib/helpers/BadgeHelper";

export default function Page() {
  return (
      <div className="p-4 lg:p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Staff Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            <StatsCard title="Today's Check-Ins" value="12" subtitle="Ready to process" icon={<CalendarCheck className="w-8 h-8 text-[#2A4B7C]" />} gradientFrom="from-blue-50" gradientTo="to-white"    sub_color="text-blue-600"/>

            <StatsCard title="Pending Approvals" value="12" subtitle="Requires action" icon={<Clock className="w-8 h-8 text-amber-600" />} gradientFrom="from-amber-50" gradientTo="to-white"   sub_color="text-amber-600" />

            <StatsCard title="Ongoing Stays" value="12" subtitle="Currently in-house" icon={<Users className="w-8 h-8 text-green-600" />} gradientFrom="from-green-50" gradientTo="to-white"  sub_color="text-green-600"/>

            <StatsCard title="Rooms Available" value="12" subtitle="Vacant rooms" icon={<Home className="w-8 h-8 text-purple-600" />} gradientFrom="from-purple-50" gradientTo="to-white"  sub_color="text-purple-600" />



        </div>




        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                <h2>Recent Bookings</h2>
                <Button variant="ghost">
                    View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                </div>


                <ScrollArea className="w-full">
                    <div className="flex gap-4 pb-4">

                        <Card className="min-w-[320px] hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                    <AvatarHelper name="John Doe"/>
                                    <div>
                                        <div className="font-medium">John Doe</div>
                                        <div className="text-xs text-muted-foreground">BK-2025-513</div>
                                    </div>
                                    </div>
                                    <BadgeHelper status="confirmed"/>
                                </div>
                                

                                <Separator className="my-3"/>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Room</span>
                                        <span>Deluxe Suite</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Duration</span>
                                        <span>1 Night</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Check-in</span>
                                        <span>Oct. 20, 2025</span>
                                    </div>

                                    <div className="mt-4 flex gap-2">

                                        <Button 
                                        size="sm"
                                        variant="outline"
                                        className="w-full mt-4"
                                        >
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Details
                                        </Button>

                                    </div>
                                </div>

                                
                            </CardContent>

                        </Card>

                        
                    </div>
                </ScrollArea>

                
                {/* Occupancy Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Hotel Occupancy
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current Occupancy</span>
                            <span className="font-medium">30%</span>
                        </div>
                        <Progress value={30} className="h-3" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>30 rooms occupied</span>
                            <span>100 rooms available</span>
                        </div>
                        </div>
                    </CardContent>
                </Card>


            </div>

            <div className="">

                {/* Weather Widget */}
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="text-sm opacity-90">Today's Weather</div>
                        <div className="text-3xl mt-1">28°C</div>
                    </div>
                    <Sun className="w-12 h-12 opacity-90" />
                    </div>
                    <div className="text-sm opacity-90">
                    Partly Cloudy • Manila, PH
                    </div>
                    <Separator className="my-3 opacity-20" />
                    <div className="text-xs opacity-75">
                    Perfect weather for guests to enjoy the pool area
                    </div>
                </CardContent>
                </Card>

            </div>

        </div>


                
     


       

    </div>
  )
}
