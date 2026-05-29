import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert, Phone, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Route & Schedule', href: '#schedule' },
    { name: 'Why Us', href: '#why-choose-us' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-4 glass-panel shadow-lg shadow-black/20' 
        : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold tracking-wider font-poppins text-white flex items-center gap-2">
              ROYAL <span className="text-brand-gold text-2xl font-black">ERTIGA</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-brand-gold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-700 text-xs font-semibold text-slate-300 hover:text-brand-gold hover:border-brand-gold/40 hover:bg-slate-900/50 transition-all duration-200"
            >
              <ShieldCheck size={14} className="text-brand-gold" />
              Admin Portal
            </button>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-brand-gold to-[#B5932F] text-slate-950 text-sm font-bold shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shine-effect"
            >
              <Phone size={14} className="fill-current" />
              Call Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-md focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:text-brand-gold hover:bg-slate-900/50"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 pb-2 border-t border-slate-800/80 px-3 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full border border-slate-700 text-sm font-semibold text-slate-300 hover:bg-slate-900"
              >
                <ShieldCheck size={16} className="text-brand-gold" />
                Admin Portal
              </button>
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-gradient-to-r from-brand-gold to-[#B5932F] text-slate-950 text-sm font-bold shadow-lg shadow-brand-gold/20"
              >
                <Phone size={16} className="fill-current" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
