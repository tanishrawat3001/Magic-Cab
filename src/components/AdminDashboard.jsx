import React, { useState, useEffect } from 'react';
import { dbService } from '../services/db';
import { X, Calendar, DollarSign, Users, Award, ShieldAlert, Check, Trash2, Edit2, Lock, Save } from 'lucide-react';

export default function AdminDashboard({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Data State
  const [bookings, setBookings] = useState([]);
  const [config, setConfig] = useState(null);
  
  // Controls / Forms State
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const [fareInput, setFareInput] = useState('');
  const [feeInput, setFeeInput] = useState('');
  const [travelTimeInput, setTravelTimeInput] = useState('');
  const [depTimeInput, setDepTimeInput] = useState('');
  const [arrTimeInput, setArrTimeInput] = useState('');
  
  // Manual block seats state
  const [filterDirection, setFilterDirection] = useState('outward'); // 'outward' or 'return'
  const [blockSeatsInput, setBlockSeatsInput] = useState([]);
  const [blockNameInput, setBlockNameInput] = useState('Manual Admin Block');

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    setBookings(dbService.getBookings());
    const cfg = dbService.getConfig();
    setConfig(cfg);
    setFareInput(cfg.farePerSeat);
    setFeeInput(cfg.convenienceFee);
    setTravelTimeInput(cfg.estimatedTravelTime);
    setDepTimeInput(cfg.timings.ramnagarDeparture);
    setArrTimeInput(cfg.timings.delhiArrival);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator Password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleUpdateConfigSubmit = (e) => {
    e.preventDefault();
    if (!config) return;

    const updated = {
      ...config,
      farePerSeat: Number(fareInput),
      convenienceFee: Number(feeInput),
      estimatedTravelTime: travelTimeInput,
      timings: {
        ...config.timings,
        ramnagarDeparture: depTimeInput,
        delhiArrival: arrTimeInput
      }
    };

    dbService.updateConfig(updated);
    setConfig(updated);
    alert("Configuration updated successfully!");
  };

  const handleCancelBooking = (id) => {
    if (window.confirm(`Are you sure you want to delete / cancel booking ${id}?`)) {
      dbService.cancelBooking(id);
      loadData(); // Reload list
    }
  };

  const handleToggleBlockSeat = (seatId) => {
    if (blockSeatsInput.includes(seatId)) {
      setBlockSeatsInput(blockSeatsInput.filter(id => id !== seatId));
    } else {
      setBlockSeatsInput([...blockSeatsInput, seatId]);
    }
  };

  const handleManualBlockSubmit = (e) => {
    e.preventDefault();
    if (blockSeatsInput.length === 0) {
      alert("Please select at least one seat to block.");
      return;
    }

    dbService.blockSeatsManually(filterDate, filterDirection, blockSeatsInput, blockNameInput);
    setBlockSeatsInput([]);
    setBlockNameInput('Manual Admin Block');
    loadData(); // Reload bookings
    alert("Seats blocked successfully!");
  };

  // Calculations for dashboard counters
  const totalEarnings = bookings.reduce((sum, b) => sum + (b.paymentId === "ADMIN_BLOCK" ? 0 : b.baseFare + b.fees), 0);
  const totalBookedSeatsCount = bookings.reduce((sum, b) => sum + b.seats.length, 0);

  // Filter bookings by date and direction
  const filteredBookings = bookings.filter(b => b.date === filterDate && b.direction === filterDirection);
  const occupiedSeatsForFilteredDate = dbService.getBookedSeats(filterDate, filterDirection);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold rounded-xl">
              <Lock size={16} />
            </span>
            <span className="text-md font-bold text-white font-poppins">Admin Control Panel</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 text-slate-400 hover:text-white transition-colors rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* NOT AUTHENTICATED STATE */}
        {!isAuthenticated ? (
          <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center justify-center max-w-sm mx-auto w-full text-center">
            <h3 className="text-xl font-bold text-white font-poppins mb-2">Access Portal</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Please enter your administrator security password to view booking logs and modify timings.
            </p>
            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <input
                type="password"
                placeholder="Enter Password (admin123)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-colors text-center"
              />
              {loginError && <p className="text-rose-400 text-xxs font-semibold">{loginError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-gold to-[#B5932F] text-slate-950 font-bold hover:scale-[1.01] transition-all cursor-pointer text-xs"
              >
                Log In Securely
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED STATE */
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border-slate-800">
                <span className="text-xxs text-brand-gray uppercase font-semibold tracking-wider block">Total Bookings</span>
                <span className="text-2xl font-black text-white block mt-1 font-poppins">{bookings.length}</span>
              </div>
              <div className="glass-panel p-5 rounded-2xl border-slate-800">
                <span className="text-xxs text-brand-gray uppercase font-semibold tracking-wider block">Seats Reserved</span>
                <span className="text-2xl font-black text-white block mt-1 font-poppins">{totalBookedSeatsCount}</span>
              </div>
              <div className="glass-panel p-5 rounded-2xl border-slate-800">
                <span className="text-xxs text-brand-gray uppercase font-semibold tracking-wider block">Total Revenue</span>
                <span className="text-2xl font-black text-brand-gold block mt-1 font-poppins">₹{totalEarnings}</span>
              </div>
              <div className="glass-panel p-5 rounded-2xl border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xxs text-brand-gray uppercase font-semibold tracking-wider block">Admin Status</span>
                  <span className="text-xxs text-emerald-400 font-bold flex items-center gap-1 mt-1">
                    <Check size={12} /> Active Session
                  </span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-xxs text-slate-400 hover:text-white mt-2 border-t border-slate-800 pt-1 text-left"
                >
                  Logout Panel
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT: Configure Rates, Fares & Timings */}
              <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border-slate-800 space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
                  Trip Rate & Timing Settings
                </h3>

                {config && (
                  <form onSubmit={handleUpdateConfigSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xxs text-slate-400 font-bold block uppercase mb-1">Fare/Seat (₹)</label>
                        <input
                          type="number"
                          value={fareInput}
                          onChange={(e) => setFareInput(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold/60 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xxs text-slate-400 font-bold block uppercase mb-1">Fee/Seat (₹)</label>
                        <input
                          type="number"
                          value={feeInput}
                          onChange={(e) => setFeeInput(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold/60 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xxs text-slate-400 font-bold block uppercase mb-1">Travel Time Duration</label>
                      <input
                        type="text"
                        value={travelTimeInput}
                        onChange={(e) => setTravelTimeInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold/60 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xxs text-slate-400 font-bold block uppercase mb-1">Departure Time</label>
                        <input
                          type="text"
                          value={depTimeInput}
                          onChange={(e) => setDepTimeInput(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold/60 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xxs text-slate-400 font-bold block uppercase mb-1">Arrival Time</label>
                        <input
                          type="text"
                          value={arrTimeInput}
                          onChange={(e) => setArrTimeInput(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold/60 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 hover:text-brand-gold text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Save size={14} />
                      Save Configuration
                    </button>
                  </form>
                )}
              </div>

              {/* RIGHT: Calendar Log Filter & Manual Seat Blocks */}
              <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Seat Override Controls
                  </h3>
                  <div className="flex gap-2">
                    <select
                      value={filterDirection}
                      onChange={(e) => {
                        setFilterDirection(e.target.value);
                        setBlockSeatsInput([]);
                      }}
                      className="bg-slate-950 text-white border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold focus:outline-none"
                    >
                      <option value="outward">Ramnagar ➔ Delhi</option>
                      <option value="return">Delhi ➔ Ramnagar</option>
                    </select>
                    <input
                      type="date"
                      value={filterDate}
                      onChange={(e) => {
                        setFilterDate(e.target.value);
                        setBlockSeatsInput([]); // Reset manual selection
                      }}
                      className="bg-slate-950 text-white border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                {/* Seat Map for manual blocking */}
                <div className="space-y-4">
                  <p className="text-slate-400 text-xxs leading-relaxed">
                    Select seats to block manually for <strong className="text-white">{filterDate}</strong> (e.g., phone reservations or driver rest blocks).
                  </p>

                  <div className="flex justify-center gap-2.5 flex-wrap py-2">
                    {[1, 2, 3, 4, 5, 6].map(id => {
                      const isOccupied = occupiedSeatsForFilteredDate.includes(id);
                      const isSelected = blockSeatsInput.includes(id);

                      return (
                        <button
                          key={id}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => handleToggleBlockSeat(id)}
                          className={`w-12 h-12 rounded-lg border text-xs font-extrabold transition-all flex flex-col items-center justify-center ${
                            isOccupied
                              ? 'bg-rose-500/10 border-rose-500/35 text-rose-400 cursor-not-allowed'
                              : isSelected
                              ? 'bg-blue-600/30 border-blue-400 text-blue-300'
                              : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10'
                          }`}
                        >
                          <span>S{id}</span>
                          <span className="text-[8px] font-normal leading-none block mt-0.5">
                            {isOccupied ? "Book" : "Block"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {blockSeatsInput.length > 0 && (
                    <form onSubmit={handleManualBlockSubmit} className="grid grid-cols-12 gap-3 items-end border-t border-slate-800/80 pt-4">
                      <div className="col-span-8">
                        <label className="text-[10px] text-slate-400 font-bold block mb-1">Block Booking Holder Name</label>
                        <input
                          type="text"
                          value={blockNameInput}
                          onChange={(e) => setBlockNameInput(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold/60 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="col-span-4">
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-[#B5932F] text-slate-950 font-bold text-xs transition-transform hover:scale-[1.02] cursor-pointer"
                        >
                          Block Seats
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>

            {/* LOWER LOGS TABLE: Active bookings logs list */}
            <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex justify-between items-center flex-wrap gap-2">
                <span>
                  Bookings Log ({filterDirection === "outward" ? "Ramnagar ➔ Delhi" : "Delhi ➔ Ramnagar"} on {filterDate})
                </span>
                <span className="text-xxs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-bold">
                  {filteredBookings.length} Bookings
                </span>
              </h3>

              {filteredBookings.length === 0 ? (
                <p className="text-slate-500 text-center py-8 text-xs">No active bookings registered for this date.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-bold">
                        <th className="py-3 px-2">ID</th>
                        <th className="py-3 px-2">Passenger</th>
                        <th className="py-3 px-2">Seats</th>
                        <th className="py-3 px-2">Pickup / Drop</th>
                        <th className="py-3 px-2">Total Paid</th>
                        <th className="py-3 px-2">Method</th>
                        <th className="py-3 px-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-950/20">
                          <td className="py-3 px-2 font-bold text-brand-gold">{b.id}</td>
                          <td className="py-3 px-2">
                            <span className="font-semibold text-white block">{b.passengerName}</span>
                            <span className="text-[10px] text-slate-500 font-medium">{b.phoneNumber}</span>
                          </td>
                          <td className="py-3 px-2">
                            {b.seats.map(s => `S${s}`).join(', ')}
                          </td>
                          <td className="py-3 px-2 max-w-[150px] truncate">
                            <span className="text-[10px] text-slate-400 block truncate">P: {b.pickup}</span>
                            <span className="text-[10px] text-slate-500 block truncate">D: {b.drop}</span>
                          </td>
                          <td className="py-3 px-2 font-semibold text-white">₹{b.total}</td>
                          <td className="py-3 px-2 text-[10px] uppercase font-bold text-slate-400">{b.paymentMethod}</td>
                          <td className="py-3 px-2 text-right">
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                              title="Delete booking"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
