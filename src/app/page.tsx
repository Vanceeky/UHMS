

import AboutSection from "@/components/AboutSection";
import FeaturedRoom from "@/components/FeaturedRoom";
import Hero  from "@/components/Hero"
import RestaurantPreview from "@/components/RestaurantPreview";
import Services from "@/components/Services";

import Footer from "@/components/Footer";

import { NavbarDemo } from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main>
      <NavbarDemo />
      <Hero/>
      <AboutSection/>
      <FeaturedRoom/>  
      <RestaurantPreview/>
      <Services/>
      <Footer/>
    </main>
  );
}
