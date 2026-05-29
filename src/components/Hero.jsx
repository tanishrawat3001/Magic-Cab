import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Clock, MapPin, IndianRupee, HelpCircle } from 'lucide-react';

export default function Hero({ config, availableSeats, onBookClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-screen flex items-center">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-brand-gold/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/10 w-96 h-96 rounded-full bg-slate-900/40 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-light text-xs font-semibold text-brand-gold border border-brand-gold/25"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Daily Premium Ertiga Taxi Service
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-poppins"
            >
              Comfortable Daily Cab Service Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-white">Ramnagar & Delhi</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-300 max-w-xl font-light"
            >
              Travel in luxury with our premium 7-seater Maruti Ertiga. Enjoy professional drivers, flexible pickup points, door-to-door drops, and book your seat in under 30 seconds.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={onBookClick}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-gold to-[#B5932F] text-slate-950 font-bold hover:scale-[1.03] hover:shadow-lg hover:shadow-brand-gold/20 active:scale-[0.98] transition-all duration-300 shine-effect cursor-pointer"
              >
                Book Seat Now
              </button>
              
              <a
                href="https://wa.me/919876543210?text=Hi!%20I'd%20like%20to%20book%20a%20seat%20in%20your%20Ertiga%20cab%20between%20Ramnagar%20and%20Delhi."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-slate-700 hover:border-slate-500 hover:bg-slate-900/50 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300"
              >
                <svg className="w-5 h-5 fill-current text-green-500" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.204-3.515c1.6.95 3.197 1.485 4.887 1.488 5.485.002 9.949-4.461 9.952-9.95.002-2.66-1.033-5.159-2.914-7.04C16.305 3.102 13.81 2.067 11.996 2.067 6.505 2.067 2.04 6.531 2.038 12.02c-.001 1.777.475 3.51 1.378 5.061L2.43 21.68l4.87-1.277zM17.43 14.54c-.297-.15-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Right Card (Real-Time Details) */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="glass-card-gold p-6 sm:p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <span className="text-sm font-semibold tracking-wider uppercase text-slate-400">Route & Trip details</span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold border border-brand-gold/20">
                  Daily Service
                </span>
              </div>

              {/* Path Routing Visual */}
              <div className="flex items-start space-x-3 mb-6 relative">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-brand-gold bg-slate-900" />
                  <div className="w-0.5 h-12 bg-gradient-to-b from-brand-gold to-brand-navy" />
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 bg-slate-900" />
                </div>
                <div className="flex-1 flex flex-col justify-between h-20 text-sm">
                  <div>
                    <span className="font-semibold text-white">{config.routes.origin}</span>
                    <p className="text-xs text-brand-gray">Departures at {config.timings.ramnagarDeparture}</p>
                  </div>
                  <div className="mt-4">
                    <span className="font-semibold text-white">{config.routes.destination}</span>
                    <p className="text-xs text-brand-gray">Arrival around {config.timings.delhiArrival}</p>
                  </div>
                </div>
              </div>

              {/* Grid of Key Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-brand-gold">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="text-xxs text-brand-gray block uppercase tracking-wider font-semibold">Travel Time</span>
                    <span className="text-sm font-bold text-white">{config.estimatedTravelTime}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-brand-gold">
                    <IndianRupee size={16} />
                  </div>
                  <div>
                    <span className="text-xxs text-brand-gray block uppercase tracking-wider font-semibold">Fare / Seat</span>
                    <span className="text-sm font-bold text-white">₹{config.farePerSeat}</span>
                  </div>
                </div>
              </div>

              {/* Real-time Seat availability alert */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between transition-colors ${
                availableSeats > 0 
                  ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400' 
                  : 'bg-rose-950/20 border-rose-500/20 text-rose-400'
              }`}>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold">Seats Status Today</span>
                  <p className="text-xs opacity-90 mt-0.5">
                    {availableSeats > 0 
                      ? `${availableSeats} of 6 passenger seats available` 
                      : 'All seats booked for today'
                    }
                  </p>
                </div>
                <div className={`flex items-center justify-center font-extrabold text-xl px-3.5 py-1.5 rounded-xl shadow-inner ${
                  availableSeats > 0 ? 'bg-emerald-500/10' : 'bg-rose-500/10'
                }`}>
                  {availableSeats}/6
                </div>
              </div>

              {/* Secondary actions info */}
              <div className="mt-6 flex justify-between items-center text-xs text-slate-400 px-1">
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-brand-gold" />
                  Instant Ticket PDF
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-brand-gold" />
                  Home Pickup Available
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
