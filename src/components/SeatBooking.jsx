import React, { useState } from 'react';
import { Calendar, User, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function SeatBooking({ config, bookedSeatsByDate, onContinueToPayment }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Passenger Form State
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const bookedSeats = bookedSeatsByDate(selectedDate);

  // Seat Configuration: 
  // 6 passenger seats (ID 1 to 6)
  // Row 1: Co-passenger (Seat 1) | [Driver]
  // Row 2: Left (Seat 2), Middle (Seat 3), Right (Seat 4)
  // Row 3: Left (Seat 5), Right (Seat 6)
  const seatsConfig = [
    { id: 1, label: "Co-Passenger", row: 1, col: "left" },
    { id: 2, label: "Middle Left", row: 2, col: "left" },
    { id: 3, label: "Middle Center", row: 2, col: "center" },
    { id: 4, label: "Middle Right", row: 2, col: "right" },
    { id: 5, label: "Back Left", row: 3, col: "left" },
    { id: 6, label: "Back Right", row: 3, col: "right" }
  ];

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return; // Already booked

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSeats([]); // Reset selection when date changes
  };

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      errors.mobile = "Please enter a valid 10-digit mobile number";
    }
    if (!pickup.trim()) errors.pickup = "Pickup location is required";
    if (!drop.trim()) errors.drop = "Drop location is required";
    if (selectedSeats.length === 0) errors.seats = "Please select at least one seat";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onContinueToPayment({
      date: selectedDate,
      selectedSeats,
      passengerName: name,
      phoneNumber: mobile,
      pickup,
      drop,
      fare: config.farePerSeat,
      convenienceFee: config.convenienceFee
    });
  };

  const pickupOptions = [
    `Ramnagar Bus Stand`,
    `Corbett City Gate / Tiger Reserve`,
    `Kashipur Bypass`,
    `Moradabad Road Petrol Pump`
  ];

  const dropOptions = [
    `Kashmiri Gate ISBT, Delhi`,
    `Anand Vihar Metro Station`,
    `Connaught Place (CP)`,
    `IGI Airport Terminal 3`
  ];

  return (
    <section id="book-now" className="py-20 bg-slate-950/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-poppins">
            Interactive Seat Booking
          </h2>
          <p className="text-slate-400 mt-3 font-light">
            Select your preferred seat inside our premium Ertiga taxi and provide details to secure your ride.
          </p>
        </div>

        {/* Date Selector Banner */}
        <div className="glass-panel max-w-xl mx-auto p-4 rounded-2xl mb-12 flex items-center justify-between border-brand-gold/10">
          <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Calendar size={18} className="text-brand-gold" />
            Travel Date:
          </label>
          <input
            type="date"
            min={todayStr}
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-slate-900 text-white border border-slate-700 px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-gold transition-colors font-medium"
          />
        </div>

        {/* Form & Seat Grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Ertiga Realistic Cabin Layout */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border-brand-gold/5 flex flex-col items-center">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gray mb-6 block text-center">
              Ertiga 7-Seater Cabin Layout
            </span>

            {/* Car Container */}
            <div className="relative w-64 md:w-72 bg-slate-900/80 rounded-t-[50px] rounded-b-[30px] border-2 border-slate-800 p-6 pt-12 pb-8 shadow-2xl">
              
              {/* Dashboard / Steering wheel visual */}
              <div className="absolute top-2 left-6 right-6 h-6 border-b border-slate-700/50 flex justify-between items-center px-4">
                <span className="text-slate-600 text-xxs font-mono uppercase tracking-widest">DASHBOARD</span>
                {/* Steering Wheel */}
                <div className="w-6 h-6 rounded-full border-4 border-slate-700 flex items-center justify-center mr-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                </div>
              </div>

              {/* Front windshield styling */}
              <div className="w-full h-4 bg-slate-950/80 rounded-t-[20px] mb-8 border-t border-slate-800 flex justify-center items-center">
                <div className="w-10 h-0.5 bg-brand-gold/10" />
              </div>

              {/* Row 1: Co-passenger + Driver */}
              <div className="grid grid-cols-2 gap-8 mb-8 items-center px-4">
                {/* Seat 1 (Co-passenger) */}
                <button
                  type="button"
                  onClick={() => handleSeatClick(1)}
                  className={`relative h-14 rounded-xl border flex flex-col justify-between p-2 text-left transition-all ${
                    bookedSeats.includes(1) 
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 cursor-not-allowed'
                      : selectedSeats.includes(1)
                      ? 'bg-blue-600/30 border-blue-400 text-blue-300 shadow-md shadow-blue-500/20 scale-[1.03]'
                      : 'bg-emerald-500/5 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="text-xxs font-bold block opacity-60">S1</span>
                  <span className="text-[10px] font-semibold truncate leading-tight">Co-Pass.</span>
                </button>

                {/* Driver seat (Locked) */}
                <div className="h-14 rounded-xl border border-slate-800 bg-slate-950/90 text-slate-600 flex flex-col justify-between p-2 pointer-events-none opacity-40">
                  <span className="text-xxs font-bold block">DRV</span>
                  <span className="text-[10px] font-semibold">Driver</span>
                </div>
              </div>

              {/* Row 2: Middle Row (Left, Center, Right) */}
              <div className="grid grid-cols-3 gap-3.5 mb-8 items-center">
                {[2, 3, 4].map(id => {
                  const seat = seatsConfig.find(s => s.id === id);
                  const isBooked = bookedSeats.includes(id);
                  const isSelected = selectedSeats.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleSeatClick(id)}
                      className={`relative h-14 rounded-xl border flex flex-col justify-between p-1.5 text-left transition-all ${
                        isBooked
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 cursor-not-allowed'
                          : isSelected
                          ? 'bg-blue-600/30 border-blue-400 text-blue-300 shadow-md shadow-blue-500/20 scale-[1.03]'
                          : 'bg-emerald-500/5 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50'
                      }`}
                    >
                      <span className="text-xxs font-bold block opacity-60">S{id}</span>
                      <span className="text-[9px] font-semibold leading-none truncate">{seat.label.split(" ")[1]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Row 3: Back Row (Left, Right) */}
              <div className="grid grid-cols-2 gap-8 items-center px-4">
                {[5, 6].map(id => {
                  const seat = seatsConfig.find(s => s.id === id);
                  const isBooked = bookedSeats.includes(id);
                  const isSelected = selectedSeats.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleSeatClick(id)}
                      className={`relative h-14 rounded-xl border flex flex-col justify-between p-2 text-left transition-all ${
                        isBooked
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 cursor-not-allowed'
                          : isSelected
                          ? 'bg-blue-600/30 border-blue-400 text-blue-300 shadow-md shadow-blue-500/20 scale-[1.03]'
                          : 'bg-emerald-500/5 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50'
                      }`}
                    >
                      <span className="text-xxs font-bold block opacity-60">S{id}</span>
                      <span className="text-[9px] font-semibold leading-none truncate">{seat.label.split(" ")[1]}</span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Legends */}
            <div className="mt-8 flex justify-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500/20 border border-emerald-400" />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-blue-600/30 border border-blue-400" />
                Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-rose-500/20 border border-rose-500/30" />
                Booked
              </span>
            </div>
            
            {formErrors.seats && (
              <span className="text-rose-400 text-xs font-semibold mt-4 text-center">{formErrors.seats}</span>
            )}
          </div>

          {/* RIGHT: Booking Detail Input Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border-brand-gold/5 text-left">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              Passenger & Journey Details
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Passenger Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-gold/60">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
                {formErrors.name && <p className="text-rose-400 text-xs mt-0.5">{formErrors.name}</p>}
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">WhatsApp / Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-gold/60">
                    <Phone size={16} />
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit number"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
                {formErrors.mobile && <p className="text-rose-400 text-xs mt-0.5">{formErrors.mobile}</p>}
              </div>

              {/* Pickup Point Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Pickup Point</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-gold/60">
                    <MapPin size={16} />
                  </div>
                  <select
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors appearance-none"
                  >
                    <option value="">Select pickup location...</option>
                    {pickupOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                    <option value="custom_pickup">Other (Type Custom Location)</option>
                  </select>
                </div>
                
                {pickup === "custom_pickup" || (pickup && !pickupOptions.includes(pickup)) ? (
                  <input
                    type="text"
                    placeholder="Enter custom pickup address..."
                    value={pickup === "custom_pickup" ? "" : pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-colors mt-2"
                  />
                ) : null}
                {formErrors.pickup && <p className="text-rose-400 text-xs mt-0.5">{formErrors.pickup}</p>}
              </div>

              {/* Drop Point Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Drop Point</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-gold/60">
                    <MapPin size={16} />
                  </div>
                  <select
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors appearance-none"
                  >
                    <option value="">Select drop location...</option>
                    {dropOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                    <option value="custom_drop">Other (Type Custom Location)</option>
                  </select>
                </div>
                
                {drop === "custom_drop" || (drop && !dropOptions.includes(drop)) ? (
                  <input
                    type="text"
                    placeholder="Enter custom drop address..."
                    value={drop === "custom_drop" ? "" : drop}
                    onChange={(e) => setDrop(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-colors mt-2"
                  />
                ) : null}
                {formErrors.drop && <p className="text-rose-400 text-xs mt-0.5">{formErrors.drop}</p>}
              </div>

              {/* Selected info & Summary */}
              {selectedSeats.length > 0 && (
                <div className="pt-4 mt-2 border-t border-slate-800/80 space-y-2.5">
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Selected Seats:</span>
                    <span className="font-bold text-white">
                      {selectedSeats.map(s => `Seat S${s}`).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Base Fare ({selectedSeats.length} × ₹{config.farePerSeat}):</span>
                    <span className="font-bold text-white">₹{selectedSeats.length * config.farePerSeat}</span>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-gold to-[#B5932F] text-slate-950 font-bold shadow-lg shadow-brand-gold/15 hover:shadow-brand-gold/25 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                Continue to Payment
                <ArrowRight size={18} />
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
