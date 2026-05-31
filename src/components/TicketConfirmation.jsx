import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';
import { Check, Download, Share2, Compass, MapPin, Calendar, Users, ShieldAlert, Award } from 'lucide-react';

export default function TicketConfirmation({ booking, onClose }) {
  const ticketRef = useRef(null);

  useEffect(() => {
    // Trigger confetti explosion on load
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, animate a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const {
    id,
    passengerName,
    phoneNumber,
    seats,
    date,
    direction,
    pickup,
    drop,
    baseFare,
    fees,
    total,
    paymentId,
    paymentMethod
  } = booking;

  // WhatsApp confirm message text
  const whatsappMsgText = `*ROYAL ERTIGA CAB BOOKING CONFIRMED*%0A` +
    `----------------------------------------%0A` +
    `*Booking ID:* ${id}%0A` +
    `*Passenger:* ${passengerName}%0A` +
    `*Date:* ${date}%0A` +
    `*Seats:* ${seats.map(s => `S${s}`).join(', ')} (${seats.length} Seat/s)%0A` +
    `*Route:* ${direction === "outward" ? "Ramnagar to Delhi" : "Delhi to Ramnagar"}%0A` +
    `*Pickup:* ${pickup}%0A` +
    `*Drop:* ${drop}%0A` +
    `*Total Paid:* ₹${total}%0A` +
    `*Payment Method:* ${paymentMethod}%0A` +
    `----------------------------------------%0A` +
    `Thank you for choosing Royal Ertiga. Have a safe journey! 🚕`;

  const downloadPDFTicket = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a5' // A5 size is perfect for compact ticket receipts
    });

    // Premium styling parameters
    const primaryColor = "#0F172A"; // Dark Navy
    const goldColor = "#D4AF37"; // Gold
    const lightBgColor = "#F8FAFC"; // Light Slate
    const textColor = "#1E293B"; // Dark Slate
    const grayColor = "#64748B"; // Slate Gray

    // Background Panel
    doc.setFillColor(15, 23, 42); // Dark Navy
    doc.rect(0, 0, 148, 28, 'F'); // Header panel

    // Brand Name
    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text("ROYAL ERTIGA TRAVELS", 12, 12);
    
    doc.setTextColor(212, 175, 55); // Gold
    doc.setFontSize(8);
    doc.text(direction === "outward" ? "RAMNAGAR - DELHI DAILY CAB SERVICE" : "DELHI - RAMNAGAR DAILY CAB SERVICE", 12, 18);

    // Ticket Title Block
    doc.setFillColor(248, 250, 252);
    doc.rect(8, 36, 132, 18, 'F');
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.rect(8, 36, 132, 18, 'S');

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.text("BOARDING PASS / RECEIPT", 14, 43);

    doc.setTextColor(212, 175, 55); // Gold
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`ID: ${id}`, 110, 47);

    // Date and Route info
    doc.setTextColor(100, 116, 139);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.text("DATE OF JOURNEY", 14, 49);

    doc.setTextColor(15, 23, 42);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.text(date, 46, 49);

    // Info Grid Y start coordinate
    let y = 62;

    const drawGridLine = (label1, value1, label2, value2) => {
      // Draw details columns
      doc.setTextColor(100, 116, 139);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      doc.text(label1, 14, y);
      if (label2) doc.text(label2, 76, y);

      doc.setTextColor(15, 23, 42);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.text(String(value1), 14, y + 5);
      if (value2) doc.text(String(value2), 76, y + 5);

      y += 14;
    };

    drawGridLine("PASSENGER NAME", passengerName, "MOBILE NUMBER", phoneNumber);
    drawGridLine("SEATS BOOKED", seats.map(s => `Seat S${s}`).join(', '), "ROUTE", direction === "outward" ? "Ramnagar to Delhi" : "Delhi to Ramnagar");
    
    // Address styling (wrapping text)
    doc.setTextColor(100, 116, 139);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.text("PICKUP LOCATION", 14, y);
    doc.text("DROP LOCATION", 76, y);

    doc.setTextColor(15, 23, 42);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8.5);
    
    // Split and write wrapped strings
    const pickupLines = doc.splitTextToSize(pickup, 54);
    const dropLines = doc.splitTextToSize(drop, 54);
    doc.text(pickupLines, 14, y + 4.5);
    doc.text(dropLines, 76, y + 4.5);

    y += 18;

    // Payment Section
    doc.setFillColor(248, 250, 252);
    doc.rect(8, y, 132, 22, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.rect(8, y, 132, 22, 'S');

    doc.setTextColor(100, 116, 139);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.text("TRANSACTION ID", 14, y + 6);
    doc.text("TOTAL FARE (PAID)", 94, y + 6);

    doc.setTextColor(15, 23, 42);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.text(paymentId, 14, y + 13);
    
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.text(`INR ${total}`, 94, y + 13);

    y += 30;

    // QR Code / Footer info
    doc.setTextColor(100, 116, 139);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("Present this boarding pass on your mobile or in print at the boarding point.", 14, y);
    doc.text("Support / Inquiries: +91 98765 43210 (24x7 Helpline)", 14, y + 4.5);

    // Save ticket PDF
    doc.save(`Ticket_RoyalErtiga_${id}.pdf`);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${id}_${passengerName.replace(/\s/g, '_')}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-slate-900 border border-brand-gold/15 rounded-3xl overflow-hidden shadow-2xl relative"
      >
        {/* Glow behind */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

        {/* Confetti / Successful Check Icon banner */}
        <div className="bg-gradient-to-b from-emerald-950/20 to-transparent p-6 text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
            <Check size={26} strokeWidth={2.5} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-poppins">
            Booking Confirmed!
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Your seat is reserved. Get ready to travel in comfort.
          </p>
        </div>

        {/* The Ticket Layout */}
        <div ref={ticketRef} className="px-6 pb-6 text-left space-y-5">
          <div className="glass-panel p-5 rounded-2xl border-slate-800 relative overflow-hidden">
            {/* Cut-out circles on ticket sides */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-950 rounded-full border border-slate-800" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-950 rounded-full border border-slate-800" />

            <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-800/80 mb-4">
              <div>
                <span className="text-xxs text-brand-gray uppercase tracking-wider block font-semibold">Booking ID</span>
                <span className="text-sm font-extrabold text-brand-gold font-poppins">{id}</span>
              </div>
              <div className="text-right">
                <span className="text-xxs text-brand-gray uppercase tracking-wider block font-semibold">Travel Date</span>
                <span className="text-sm font-extrabold text-white">{date}</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-xxs text-brand-gray uppercase block font-medium">Passenger</span>
                <span className="font-semibold text-white truncate max-w-[150px] block">{passengerName}</span>
              </div>
              <div>
                <span className="text-xxs text-brand-gray uppercase block font-medium">Contact Mobile</span>
                <span className="font-semibold text-white">{phoneNumber}</span>
              </div>
              <div>
                <span className="text-xxs text-brand-gray uppercase block font-medium">Route</span>
                <span className="font-semibold text-white">
                  {direction === "outward" ? "Ramnagar ➔ Delhi" : "Delhi ➔ Ramnagar"}
                </span>
              </div>
              <div>
                <span className="text-xxs text-brand-gray uppercase block font-medium">Seats Selected</span>
                <span className="font-bold text-brand-gold">
                  {seats.map(s => `Seat S${s}`).join(', ')}
                </span>
              </div>
            </div>

            {/* Address Details */}
            <div className="mt-4 pt-3 border-t border-slate-800/50 space-y-2 text-xxs">
              <div className="flex items-start gap-1">
                <MapPin size={12} className="text-brand-gold shrink-0 mt-0.5" />
                <p className="text-slate-300"><strong className="text-slate-400">Pickup:</strong> {pickup}</p>
              </div>
              <div className="flex items-start gap-1">
                <MapPin size={12} className="text-slate-500 shrink-0 mt-0.5" />
                <p className="text-slate-300"><strong className="text-slate-400">Drop:</strong> {drop}</p>
              </div>
            </div>
          </div>

          {/* QR Code & Pricing Container */}
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Live QR Code */}
            <div className="col-span-4 flex justify-center bg-white p-2 rounded-xl">
              <img 
                src={qrCodeUrl} 
                alt={`QR Ticket for ${id}`} 
                className="w-full aspect-square"
              />
            </div>

            {/* Price Details */}
            <div className="col-span-8 space-y-1.5 text-xs text-slate-300 pl-2">
              <div className="flex justify-between">
                <span>Base Fare:</span>
                <span className="font-semibold text-white">₹{baseFare}</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience Fee:</span>
                <span className="font-semibold text-white">₹{fees}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-1.5 border-t border-slate-800 text-white">
                <span>Amount Paid:</span>
                <span className="text-brand-gold font-extrabold text-base">₹{total}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-3.5 pt-2">
            <button
              onClick={downloadPDFTicket}
              className="py-3 px-4 rounded-xl border border-slate-700 hover:border-slate-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download size={14} className="text-brand-gold" />
              Download PDF
            </button>
            <a
              href={whatsappMsgText}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Share2 size={14} />
              Share WhatsApp
            </a>
          </div>

          {/* Safety badge / Notice */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2 text-xxs text-slate-400">
            <Award className="text-brand-gold shrink-0" size={14} />
            <span>Driver details and cab license number will be texted 2 hours before departure.</span>
          </div>

          {/* Secondary Action */}
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-brand-gold text-slate-300 font-bold text-xs transition-all cursor-pointer"
          >
            Close & Go Back Home
          </button>

        </div>
      </motion.div>
    </div>
  );
}
