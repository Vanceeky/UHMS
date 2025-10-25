"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <main className="relative w-full h-screen overflow-hidden">


      {/* Background (Video or Image) */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/9.jpg" // <--- your image in public/images/
          alt="GoStay Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Centered Overlay Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4"
      >
          {/* Logo at the top */}
        <img
          src="/logo.png"
          alt="Hotel Le Duc Logo"
          className="w-50 h-50 mb-4 object-contain"
        />
        <h1 className="text-5xl md:text-7xl font-serif tracking-wide mb-4 text-white">
          Hotel Le Duc
        </h1>
        <p className="text-lg md:text-2xl font-light mb-8">
          Redefining Comfort and Hospitality
        </p>

        {/* Buttons under the heading */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-amber-400 font-semibold text-black shadow-lg px-6 hover:bg-amber-500 cursor-pointer"
          >
            Explore Rooms
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-black font-semibold border-white shadow-lg px-6 cursor-pointer"
          >
            View Restaurant
          </Button>
        </div>
      </motion.div>
    </main>
  );
};

export default Hero;
