import React from 'react';
import { Camera, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const images = [
    {
      src: "/images/ertiga_exterior.png",
      title: "Jim Corbett - Ramnagar Transit",
      desc: "Our premium white Maruti Ertiga ready for departure."
    },
    {
      src: "/images/ertiga_interior.png",
      title: "Spacious Cabin Comfort",
      desc: "Plush leather seats with rear AC vents and charging ports."
    },
    {
      src: "/images/ertiga_highway.png",
      title: "Daily Highway Transit",
      desc: "Reliable and smooth travel along the Ramnagar-Delhi highway."
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Our Fleet</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-poppins">
            Travel Experience Gallery
          </h2>
          <p className="text-slate-400 mt-3 font-light">
            Take a look inside our vehicles. We guarantee clean interiors, comfortable seats, and a premium travel environment.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="glass-panel rounded-3xl overflow-hidden border-slate-800/80 group hover:border-brand-gold/15 transition-all duration-300 relative"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                
                {/* Visual indicator of zoom */}
                <div className="absolute top-4 right-4 p-2 bg-slate-950/60 backdrop-blur border border-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={14} className="text-brand-gold" />
                </div>
              </div>

              {/* Text detail */}
              <div className="p-6 text-left">
                <h4 className="text-base font-bold text-white font-poppins flex items-center gap-1.5">
                  <Camera size={15} className="text-brand-gold" />
                  {img.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                  {img.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
