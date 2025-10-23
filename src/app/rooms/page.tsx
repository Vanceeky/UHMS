"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wifi, Coffee, Tv, Wind } from "lucide-react";
import { motion } from "framer-motion";
import RoomSearchCard from "@/components/RoomSearchCard";
import { useRouter } from "next/navigation";
import { NavbarDemo } from "@/components/ui/Navbar";

const Rooms = () => {
  const router = useRouter();

  // ✅ Sample data (You can later replace this with API fetch)
    const rooms = [
    {
        id: 1,
        name: "Deluxe Room",
        price: 200,
        description: "A spacious and luxurious room with a view of the city skyline.",
        image: "/deluxe-room-1.jpg",
        amenities: ["Wi-Fi", "TV", "Air Conditioning", "Coffee Maker"],
        maxAdults: 2, // ✅ New
        maxChildren: 1, // ✅ New
        extraAdultFee: 500, // ✅ New
        extraChildFee: 300, // ✅ New
    },
    {
        id: 2,
        name: "Presidential Suite",
        price: 500,
        description: "Experience ultimate comfort and privacy in our Presidential Suite.",
        image: "/executive-suite-1.jpg",
        amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Jacuzzi"],
        maxAdults: 4, // ✅ New
        maxChildren: 2, // ✅ New
        extraAdultFee: 800, // ✅ New
        extraChildFee: 500, // ✅ New
    },
    ];

  return (
    <main>
            <NavbarDemo />
      <div className="min-h-screen pt-15">
        {/* Header Section */}
        <section className="py-12 px-6 bg-primary text-white">
          <div className="container mx-auto max-w-7xl">
            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              className="text-white hover:bg-white/10 mb-6"
            >
              <ArrowLeft className="mr-2 w-5 h-5" /> Back to Home
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-playfair text-white text-5xl md:text-7xl mb-6">
                Our Rooms & Suites
              </h1>
              <p className="font-poppins text-xl opacity-90 max-w-3xl mx-auto">
                Discover luxury accommodations designed for comfort, elegance, and unforgettable experiences
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Card */}
{/*         <div className="">
          <RoomSearchCard />
        </div> */}

        {/* Room Cards */}
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="group relative overflow-hidden rounded-2xl shadow-elegant bg-white hover:shadow-gold transition-all duration-300 ease-in-out"
              >
                {/* Room Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Room Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold">{room.name}</h3>
                    <div className="text-right">
                      <div className="text-primary text-lg font-bold">₱{room.price}</div>
                      <div className="text-sm text-muted-foreground">per night</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{room.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 4).map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm"
                      >
                        {amenity === "Wi-Fi" && <Wifi className="w-4 h-4" />}
                        {amenity === "TV" && <Tv className="w-4 h-4" />}
                        {amenity === "Air Conditioning" && <Wind className="w-4 h-4" />}
                        {amenity === "Coffee Maker" && <Coffee className="w-4 h-4" />}
                        <span>{amenity}</span>
                      </div>
                    ))}

                    {room.amenities.length > 4 && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm font-medium text-muted-foreground">
                        +{room.amenities.length - 4} more
                      </div>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    className="cursor-pointer w-full bg-primary text-white"
                    onClick={() => router.push(`/rooms/${room.id}`)} // ✅ navigate to dynamic page
                  >
                    View & Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Rooms;
