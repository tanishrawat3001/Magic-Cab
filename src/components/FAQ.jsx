import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqList = [
    {
      q: "What is the route, departure points, and total travel duration?",
      a: "Our outward cab departs from Ramnagar Bus Stand daily at 05:00 AM, traveling along the Kashipur-Moradabad-Hapur highway, and arriving at Anand Vihar/Kashmiri Gate in Delhi around 11:00 AM (approx. 6 hours). The return cab departs from Delhi at 04:00 PM and arrives in Ramnagar by 10:00 PM."
    },
    {
      q: "Can I choose my specific seat layout?",
      a: "Yes! Our interactive seat booking system displays a realistic 7-seater Ertiga cabin. You can select your preferred seat (Co-passenger front seat, middle row, or back row) in real-time. Available seats are green, selected seats are blue, and booked seats are red."
    },
    {
      q: "Do you offer door-to-door home pickup and drop service?",
      a: "Yes, we provide convenient home pickup and drop options along the route. When booking, select your closest landmark or write down your custom pickup address. Custom drops can also be specified during booking."
    },
    {
      q: "What is the policy for cancellation and refund?",
      a: "Cancellations made up to 12 hours before departure are eligible for a 100% refund. Cancellations made within 12 hours are subject to a 50% cancellation fee. You can contact support at +91 98765 43210 to cancel your ticket."
    },
    {
      q: "What payment methods do you support?",
      a: "We support instant online payments via all major UPI apps (Google Pay, PhonePe, Paytm), NetBanking, and credit/debit card checkouts secured by Razorpay."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative bg-slate-950/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-poppins">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 mt-3 font-light">
            Here are the most common questions regarding our Ertiga daily service, booking processes, and travel guidelines.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 text-left">
          {faqList.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx}
                className="glass-panel rounded-2xl overflow-hidden border-slate-850 hover:border-brand-gold/10 transition-colors duration-250"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between font-bold text-white hover:text-brand-gold transition-colors text-sm sm:text-base font-poppins focus:outline-none"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle size={18} className="text-brand-gold/80 shrink-0" />
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 ml-4 shrink-0">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-350 text-xs sm:text-sm font-light leading-relaxed animate-in fade-in duration-200">
                    <div className="pt-2 border-t border-slate-900/50">
                      {faq.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
