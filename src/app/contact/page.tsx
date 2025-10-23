"use client";

import React from 'react'
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { motion } from "framer-motion";
const Contact = () => {
  return (
    <main>
        <div className="min-h-screen pt-15">
            <section className="py-16 px-6 bg-primary text-white">
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
                    Contact Us
                    </h1>
                    <p className="font-poppins text-xl opacity-90 max-w-3xl mx-auto">
                    We're here to help make your stay exceptional. Get in touch with our team for reservations, inquiries, or any assistance you need.
                    </p>
                </motion.div>
                </div>
            </section>
        </div>

    </main>
  )
}

export default Contact