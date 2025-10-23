import React from 'react'
import { Hotel, Utensils, Package, CreditCard } from 'lucide-react'
const Services = () => {
  return (
    <main>
       
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">
              Seamlessly integrated for your convenience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-white shadow-elegant hover:shadow-gold transition-smooth">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-300/10 flex items-center justify-center">
                <Hotel className="w-8 h-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Booking</h3>
              <p className="text-muted-foreground text-sm">
                Reserve rooms with instant online payment and confirmation
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-elegant hover:shadow-gold transition-smooth">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-300/10 flex items-center justify-center">
                <Utensils className="w-8 h-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Restaurant POS</h3>
              <p className="text-muted-foreground text-sm">
                Dine-in system synced with your room billing
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-elegant hover:shadow-gold transition-smooth">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-300/10 flex items-center justify-center">
                <Package className="w-8 h-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inventory Tracking</h3>
              <p className="text-muted-foreground text-sm">
                Efficient monitoring of supplies and usage
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-elegant hover:shadow-gold transition-smooth">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-300/10 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">GCash Integration</h3>
              <p className="text-muted-foreground text-sm">
                Cashless, secure payments for your convenience
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Services