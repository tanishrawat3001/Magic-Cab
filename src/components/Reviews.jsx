import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Reviews() {
  const reviews = [
    {
      name: "Sanjay Negi",
      role: "Regular Commuter",
      rating: 5,
      comment: "Absolutely the best way to travel to Delhi from Ramnagar. The seat reservation is fully online and works smoothly. The driver was professional and the Ertiga was extremely clean and comfortable.",
      avatar: "SN"
    },
    {
      name: "Meenakshi Joshi",
      role: "Tourist",
      rating: 5,
      comment: "Booked 3 seats for my family from Moradabad to Delhi airport. The door pickup was convenient, saved us from taking luggage to the bus stand. The car AC was great, and we reached on time. High-quality service!",
      avatar: "MJ"
    },
    {
      name: "Amit Rawat",
      role: "Business Traveler",
      rating: 5,
      comment: "Very reliable daily cab. As a business owner, I travel weekly. The timings are fixed, the drivers don't speed, and booking a seat is instant. The PDF ticket generation and WhatsApp notifications are professional.",
      avatar: "AR"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-poppins">
            What Our Passengers Say
          </h2>
          <p className="text-slate-400 mt-3 font-light">
            Read real feedback from customers who travel daily with us between Ramnagar and Delhi.
          </p>
        </div>

        {/* Testimonial slider card */}
        <div className="relative glass-card-gold p-8 sm:p-12 rounded-3xl text-left border-slate-800">
          {/* Quote Icon */}
          <div className="absolute top-6 right-8 text-slate-800 opacity-20 pointer-events-none">
            <Quote size={80} strokeWidth={1} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>

              {/* Review Comment */}
              <blockquote className="text-base sm:text-lg text-slate-200 leading-relaxed font-light italic">
                "{reviews[currentIndex].comment}"
              </blockquote>

              {/* Reviewer Details */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 text-brand-gold flex items-center justify-center font-bold text-sm">
                  {reviews[currentIndex].avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-poppins">
                    {reviews[currentIndex].name}
                  </h4>
                  <p className="text-xxs text-slate-400 font-semibold uppercase tracking-wider">
                    {reviews[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex justify-end gap-3.5 mt-8">
            <button
              onClick={prevReview}
              className="p-2.5 rounded-full border border-slate-700 hover:border-brand-gold hover:text-brand-gold text-slate-300 transition-all cursor-pointer bg-slate-900/50"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextReview}
              className="p-2.5 rounded-full border border-slate-700 hover:border-brand-gold hover:text-brand-gold text-slate-300 transition-all cursor-pointer bg-slate-900/50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
