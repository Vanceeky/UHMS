import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-navy font-bold text-lg">GS</span>
              </div>
              <span className="font-playfair text-3xl text-white">GoStay Hotel</span>
            </div>
            <p className="font-poppins text-gray-300 mb-6 max-w-md leading-relaxed">
              Experience luxury and comfort at GoStay Hotel. Where exceptional hospitality 
              meets modern convenience, powered by our unified management system.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-luxury text-white">
                <span className="text-sm">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-luxury text-white">
                <span className="text-sm">ig</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-luxury text-white">
                <span className="text-sm">tw</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-white text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  className="font-poppins text-gray-300 hover:text-gold transition-luxury"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  className="font-poppins text-gray-300 hover:text-gold transition-luxury"
                >
                  Rooms & Suites
                </button>
              </li>
              <li>
                <button 
                  className="font-poppins text-gray-300 hover:text-gold transition-luxury"
                >
                  Restaurant
                </button>
              </li>
              <li>
                <button 
                  className="font-poppins text-gray-300 hover:text-gold transition-luxury"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-white text-xl mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  className="font-poppins text-gray-300 hover:text-gold transition-luxury"
                >
                  Room Service
                </button>
              </li>
                            <li>
                <button 
                  className="font-poppins text-gray-300 hover:text-gold transition-luxury"
                >
                  Concierge
                </button>
              </li>
                            <li>
                <button 
                  className="font-poppins text-gray-300 hover:text-gold transition-luxury"
                >
                  Valet Parking
                </button>
              </li>
                            <li>
                <button 
                  className="font-poppins text-gray-300 hover:text-gold transition-luxury"
                >
                  Business Center
                </button>
              </li>

            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="font-poppins text-gray-300 text-center md:text-left mb-4 md:mb-0">
            <p>© 2025 GoStay Hotel. All Rights Reserved.</p>
            <p className="text-sm">Powered by Unified Hospitality Management System</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="font-poppins text-gray-300 hover:text-gold transition-luxury text-sm">
              Privacy Policy
            </a>
            <a href="#" className="font-poppins text-gray-300 hover:text-gold transition-luxury text-sm">
              Terms of Service
            </a>
            <a href="#" className="font-poppins text-gray-300 hover:text-gold transition-luxury text-sm">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer