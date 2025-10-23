import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FeaturedRoom = () => {
  return (
    <main>
      {/* Featured Rooms */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Featured Rooms
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover comfort and elegance in every suite
            </p>
          </div>

          {/* --- Room Cards --- */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Deluxe Room */}
            <div className="group relative overflow-hidden rounded-2xl shadow-elegant bg-card hover:shadow-gold transition-all duration-300 ease-in-out">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="/deluxe-room-1.jpg"
                  alt="Deluxe Room"
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Optional overlay fade-in effect */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-playfair font-semibold mb-2">
                  Deluxe Room
                </h3>
                <p className="text-muted-foreground mb-4">
                  Modern elegance with king bed and city views
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-400">
                    ₱3,500/night
                  </span>
                  <Link href="/rooms">
                    <Button variant="outline" className="cursor-pointer">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Executive Suite */}
            <div className="group relative overflow-hidden rounded-2xl shadow-elegant bg-card hover:shadow-gold transition-all duration-300 ease-in-out">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="/executive-suite-1.jpg"
                  alt="Executive Suite"
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-playfair font-semibold mb-2">
                  Executive Suite
                </h3>
                <p className="text-muted-foreground mb-4">
                  Spacious suite with separate living area
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-400">
                    ₱6,500/night
                  </span>
                  <Link href="/rooms">
                    <Button variant="outline" className="cursor-pointer">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link href="/rooms">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                View All Rooms →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FeaturedRoom;
