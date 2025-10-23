import React from 'react'
import Link from "next/link";

import { Button } from "@/components/ui/button";
const RestaurantPreview = () => {
  return (
    <main>

        {/* Restaurant Preview */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/restaurant-preview.jpg')` }}
        >
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary-foreground mb-6">
            Experience Culinary Perfection
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Discover exceptional flavors at GoStay Restaurant, where modern cuisine meets timeless
            elegance
          </p>
          <Link href="/restaurant">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold"
            >
              Explore Menu
            </Button>
          </Link>
        </div>
      </section>

    </main>
  )
}

export default RestaurantPreview