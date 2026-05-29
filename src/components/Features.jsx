import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, CalendarCheck, Landmark, Armchair, Navigation } from 'lucide-react';

export default function Features() {
  const list = [
    {
      title: "Door-to-Door Service",
      description: "No need to travel to crowded bus stands. We offer convenient home pickups and drops along the route.",
      icon: <Navigation className="w-6 h-6" />
    },
    {
      title: "Comfortable Seating",
      description: "Spacious 7-seater Maruti Ertiga with dual AC, charging points, clean interiors, and ample legroom.",
      icon: <Armchair className="w-6 h-6" />
    },
    {
      title: "Daily Reliable Service",
      description: "Fixed departure schedules operating daily from Ramnagar and Delhi. We run on time, every time.",
      icon: <CalendarCheck className="w-6 h-6" />
    },
    {
      title: "Professional Drivers",
      description: "Experienced, verified, and courteous drivers familiar with highways and local routes for safety.",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      title: "Instant Online Booking",
      description: "Select seats, fill passenger information, pay securely, and get your digital PDF ticket generated instantly.",
      icon: <Landmark className="w-6 h-6" />
    },
    {
      title: "Safe & Sanitized Journey",
      description: "Your safety is our top priority. Cabin is fully sanitized before every single trip.",
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="why-choose-us" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Our Standards</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-poppins">
            Why Choose Our Ertiga Service?
          </h2>
          <p className="text-slate-400 mt-3 font-light">
            We provide a premium, luxury travel experience between Ramnagar and Delhi at affordable per-seat prices.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800/80 hover:border-brand-gold/20 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 group text-left"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-brand-gold/10 to-[#B5932F]/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:scale-110 group-hover:bg-brand-gold/15 transition-all duration-300 mb-6">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white font-poppins mb-2 group-hover:text-brand-gold transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
