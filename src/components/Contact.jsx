import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all form fields.");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API submit
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(false), 5000); // Clear after 5 seconds
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/40">
      {/* Decorative Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Reach Us</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-poppins">
            Contact & Support
          </h2>
          <p className="text-slate-400 mt-3 font-light">
            Need custom bookings, full cab reservations, or support? Send us a message or contact us directly.
          </p>
        </div>

        {/* Form and Contact Card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Contact Details & Map */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Info Cards */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6 text-left">
              <h3 className="text-lg font-bold text-white font-poppins mb-2">Office Information</h3>
              
              <div className="space-y-4 text-sm text-slate-350">
                <a 
                  href="tel:+919876543210" 
                  className="flex items-center gap-3.5 hover:text-brand-gold transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-brand-gold flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-gray uppercase font-semibold tracking-wider block">Phone support</span>
                    <span className="font-semibold text-white">+91 98765 43210</span>
                  </div>
                </a>

                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3.5 hover:text-brand-gold transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-green-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-gray uppercase font-semibold tracking-wider block">WhatsApp chat</span>
                    <span className="font-semibold text-white">+91 98765 43210</span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-brand-gold flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-gray uppercase font-semibold tracking-wider block">Email Inquiries</span>
                    <span className="font-semibold text-white">bookings@royalertiga.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-brand-gold flex items-center justify-center shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-gray uppercase font-semibold tracking-wider block">Pickup Terminal</span>
                    <span className="font-semibold text-white">Ramnagar bus stand kiosk, Ramnagar, Uttarakhand - 244715</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Styled Map embed (Interactive OpenStreetMap) */}
            <div className="glass-panel rounded-3xl overflow-hidden border-slate-800 h-64 relative bg-slate-900">
              <iframe
                title="Ramnagar Delhi route map"
                src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1796590.2312674397!2d77.10657984852924!3d29.351239843657732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x390a42426df499f5%3A0xe9f79929bc3ad6ef!2sRamnagar%2C%20Uttarakhand!3m2!1d29.392095699999998!2d79.123281!4m5!1s0x390cfd5b347eb62d%3A0xa5671b4065337004!2sDelhi!3m2!1d28.7040592!2d77.10249019999999!5e0!3m2!1sen!2sin!4v1716982420310!5m2!1sen!2sin"
                className="w-full h-full border-none grayscale invert contrast-[88%] brightness-[90%]"
                allowFullScreen=""
                loading="lazy"
              />
            </div>

          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 text-left flex flex-col justify-center">
            <h3 className="text-lg font-bold text-white font-poppins mb-6">Send Us A Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xxs font-bold text-slate-400 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold rounded-xl py-3 px-4 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xxs font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold rounded-xl py-3 px-4 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xxs font-bold text-slate-400 uppercase tracking-wider block">Your Message</label>
                <textarea
                  placeholder="How can we help you? (Ask about corporate contracts, full vehicle rentals, custom timings...)"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold rounded-xl py-3 px-4 text-xs text-white focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Alerts */}
              {success && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  Thank you! Your inquiry has been received. We will get back to you shortly.
                </div>
              )}

              {/* CTA Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-gold to-[#B5932F] text-slate-950 font-bold shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-transform flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
              >
                {isSubmitting ? "Sending message..." : "Send Message"}
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
