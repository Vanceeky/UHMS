import React from 'react'
import {
  Sparkles,
  Building2,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
const AboutSection = () => {
  return (
    <main>
        {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground">
                Where Luxury Meets Simplicity
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Hotel Le Duc, every detail is crafted for your comfort. Experience seamless
                booking, elegant rooms, and exquisite dining — all managed through our unified
                hospitality system designed to elevate your stay.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-amber-400" />
                  <span className="text-lg font-medium">City View</span>
                </div>
                <div className="flex items-center gap-3">
                  <Waves className="ww-8 h-8 text-amber-400" />
                  <span className="text-lg font-medium">Pool Access</span>
                </div>
                <div className="flex items-center gap-3">
                  <UtensilsCrossed className="w-8 h-8 text-amber-400" />
                  <span className="text-lg font-medium">Fine Dining</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-amber-400" />
                  <span className="text-lg font-medium">Premium Service</span>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-elegant animate-scale-in">
              <img
                src="/pres_1.jpg"
                alt="Luxury hotel room"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutSection