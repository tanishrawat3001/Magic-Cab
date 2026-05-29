import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SeatBooking from './components/SeatBooking';
import Features from './components/Features';
import Timeline from './components/Timeline';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import PaymentUI from './components/PaymentUI';
import TicketConfirmation from './components/TicketConfirmation';
import { dbService } from './services/db';
import { Phone, MessageSquare, ShieldCheck, ChevronUp, Clock, Info } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState(dbService.getConfig());
  const [bookings, setBookings] = useState(dbService.getBookings());
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Modals Visibility
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null); // holds booking details pre-payment
  const [confirmedTicket, setConfirmedTicket] = useState(null); // holds confirmed booking info

  // Sync data on changes
  const refreshData = () => {
    setConfig(dbService.getConfig());
    setBookings(dbService.getBookings());
  };

  useEffect(() => {
    // Listen to custom DB update events
    window.addEventListener('ertiga_db_update', refreshData);
    
    // Listen to scroll to show/hide scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('ertiga_db_update', refreshData);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToBooking = () => {
    const section = document.getElementById('book-now');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate today's available seats
  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookedSeats = dbService.getBookedSeats(todayStr);
  const availableSeatsCount = 6 - todayBookedSeats.length;

  return (
    <div className="relative min-h-screen">
      {/* Background decoration grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      
      {/* Navbar */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero 
          config={config} 
          availableSeats={availableSeatsCount} 
          onBookClick={handleScrollToBooking} 
        />
        
        <SeatBooking 
          config={config}
          bookedSeatsByDate={(date) => dbService.getBookedSeats(date)}
          onContinueToPayment={(details) => setPaymentDetails(details)}
        />
        
        <Timeline config={config} />
        <Features />
        <Gallery />
        <Reviews />
        <FAQ />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 relative z-10 text-slate-500 text-xs text-center font-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm font-extrabold tracking-wider font-poppins text-white">
              ROYAL <span className="text-brand-gold font-black">ERTIGA</span>
            </span>
            <div className="flex gap-6 text-slate-400">
              <a href="#home" className="hover:text-brand-gold transition-colors">Home</a>
              <a href="#book-now" className="hover:text-brand-gold transition-colors">Book Seat</a>
              <a href="#schedule" className="hover:text-brand-gold transition-colors">Timings</a>
              <a href="#faq" className="hover:text-brand-gold transition-colors">FAQs</a>
              <button onClick={() => setIsAdminOpen(true)} className="hover:text-brand-gold transition-colors flex items-center gap-1 font-semibold text-brand-gold/80">
                <ShieldCheck size={12} /> Admin Login
              </button>
            </div>
          </div>
          <hr className="border-slate-900" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xxs font-medium tracking-wide">
            <p>© {new Date().getFullYear()} Royal Ertiga Cab Service. All rights reserved. Operating Ramnagar ➔ Delhi highway.</p>
            <p className="flex items-center gap-1">
              Made with ❤️ for luxury travels.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Elements */}
      {/* 1. Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hi!%20I'd%20like%20to%20inquire%20about%20booking%20seats%20in%20your%207-seater%20Ertiga%2520cab."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:scale-105 active:scale-95 transition-all duration-300 group"
        title="Chat on WhatsApp"
      >
        <span className="absolute right-16 scale-0 group-hover:scale-100 bg-slate-900 border border-slate-800 text-white text-xxs font-bold px-3 py-1.5 rounded-xl transition-all duration-200 shadow-xl whitespace-nowrap pointer-events-none">
          Book on WhatsApp
        </span>
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>

      {/* 2. Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full bg-slate-900/80 border border-slate-850 hover:border-brand-gold/30 hover:text-brand-gold text-slate-300 flex items-center justify-center backdrop-blur-md shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          title="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* Modals & Popups */}
      
      {/* Admin Panel Modal */}
      {isAdminOpen && (
        <AdminDashboard 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}

      {/* Payment Gateway Modal */}
      {paymentDetails && (
        <PaymentUI
          bookingDetails={paymentDetails}
          onClose={() => setPaymentDetails(null)}
          onPaymentSuccess={(newBooking) => {
            setPaymentDetails(null);
            setConfirmedTicket(newBooking);
          }}
        />
      )}

      {/* Booking Completed Ticket Confirmation */}
      {confirmedTicket && (
        <TicketConfirmation
          booking={confirmedTicket}
          onClose={() => setConfirmedTicket(null)}
        />
      )}
    </div>
  );
}
