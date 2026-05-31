import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CreditCard, ChevronRight, CheckCircle, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { dbService } from '../services/db';

export default function PaymentUI({ bookingDetails, onClose, onPaymentSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState(''); // 'upi_phonepe', 'upi_gpay', 'upi_paytm', 'card'
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardErrors, setCardErrors] = useState({});

  const {
    date,
    direction,
    selectedSeats,
    passengerName,
    phoneNumber,
    pickup,
    drop,
    fare,
    convenienceFee
  } = bookingDetails;

  const totalSeatsCount = selectedSeats.length;
  const baseFareTotal = fare * totalSeatsCount;
  const convenienceFeeTotal = convenienceFee * totalSeatsCount;
  const grandTotal = baseFareTotal + convenienceFeeTotal;

  const paymentMethods = [
    { id: 'upi_gpay', name: 'Google Pay', type: 'UPI', icon: '⚡' },
    { id: 'upi_phonepe', name: 'PhonePe', type: 'UPI', icon: '🟣' },
    { id: 'upi_paytm', name: 'Paytm', type: 'UPI', icon: '🔵' },
    { id: 'card', name: 'Razorpay Card Payment', type: 'CARD', icon: '💳' }
  ];

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    // Format card number with spaces every 4 digits
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 4);
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    setCardExpiry(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCardCvv(value);
  };

  const validateCardForm = () => {
    const errors = {};
    if (!cardName.trim()) errors.cardName = "Cardholder name is required";
    if (cardNumber.replace(/\s/g, '').length !== 16) errors.cardNumber = "Please enter a valid 16-digit card number";
    if (cardExpiry.length !== 5) errors.cardExpiry = "Expiry (MM/YY) is required";
    if (cardCvv.length !== 3) errors.cardCvv = "CVV is required";

    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (selectedMethod === 'card' && !validateCardForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment gateway processing for 2 seconds
    setTimeout(() => {
      setIsProcessing(false);
      
      // Save booking in local storage DB
      const newBooking = dbService.addBooking({
        passengerName,
        phoneNumber,
        seats: selectedSeats,
        date,
        direction,
        pickup,
        drop,
        baseFare: baseFareTotal,
        fees: convenienceFeeTotal,
        total: grandTotal,
        paymentId: `pay_${selectedMethod}_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        paymentMethod: paymentMethods.find(m => m.id === selectedMethod)?.name || "UPI"
      });

      onPaymentSuccess(newBooking);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative"
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <span className="text-sm font-extrabold tracking-wider text-brand-gold uppercase">Secure Checkout</span>
          <div className="flex items-center gap-1 text-emerald-400 text-xxs font-bold uppercase bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <Shield size={12} />
            SSL Encrypted
          </div>
        </div>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* LEFT: Booking / Bill Details Summary */}
          <div className="md:col-span-5 bg-slate-950/50 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-800/80 text-left">
            <h3 className="text-md font-bold text-white mb-6 uppercase tracking-wider">Booking Invoice</h3>
            
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <span className="text-xxs text-brand-gray uppercase tracking-wider block font-semibold">Route</span>
                <span className="font-semibold text-white">
                  {direction === "outward" ? "Ramnagar to Delhi" : "Delhi to Ramnagar"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xxs text-brand-gray uppercase tracking-wider block font-semibold">Date</span>
                  <span className="font-semibold text-white">{date}</span>
                </div>
                <div>
                  <span className="text-xxs text-brand-gray uppercase tracking-wider block font-semibold">Seats Selected</span>
                  <span className="font-semibold text-white">
                    {selectedSeats.map(s => `S${s}`).join(', ')}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xxs text-brand-gray uppercase tracking-wider block font-semibold">Passenger Name</span>
                <span className="font-semibold text-white">{passengerName}</span>
              </div>
              <div>
                <span className="text-xxs text-brand-gray uppercase tracking-wider block font-semibold">WhatsApp / Phone</span>
                <span className="font-semibold text-white">{phoneNumber}</span>
              </div>
              <div>
                <span className="text-xxs text-brand-gray uppercase tracking-wider block font-semibold">Pickup Address</span>
                <p className="text-xs text-slate-400 line-clamp-2">{pickup}</p>
              </div>
              <div>
                <span className="text-xxs text-brand-gray uppercase tracking-wider block font-semibold">Drop Address</span>
                <p className="text-xs text-slate-400 line-clamp-2">{drop}</p>
              </div>
            </div>

            {/* Fare Calculation details */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3.5 text-slate-300">
              <div className="flex justify-between text-xs">
                <span>Base Fare ({totalSeatsCount} × ₹{fare})</span>
                <span>₹{baseFareTotal}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Convenience Fee ({totalSeatsCount} × ₹{convenienceFee})</span>
                <span>₹{convenienceFeeTotal}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2.5 border-t border-dashed border-slate-800">
                <span>Grand Total</span>
                <span className="text-brand-gold text-lg">₹{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Payment Options & Details */}
          <div className="md:col-span-7 p-6 sm:p-8 text-left relative flex flex-col justify-between min-h-[420px]">
            {isProcessing ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12">
                <Loader2 className="w-12 h-12 text-brand-gold animate-spin" />
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-1.5 justify-center">
                    Processing Payment...
                    <Sparkles className="text-brand-gold w-4.5 h-4.5 animate-pulse" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Securing your seat and generating booking confirmation ticket. Please do not close or refresh this tab.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-md font-bold text-white mb-5 uppercase tracking-wider">Select Payment Method</h3>
                  
                  {/* Payment Method Selector buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {paymentMethods.map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => {
                          setSelectedMethod(method.id);
                          setCardErrors({});
                        }}
                        className={`p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                          selectedMethod === method.id
                            ? 'bg-brand-gold/10 border-brand-gold text-white shadow-md shadow-brand-gold/5'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{method.icon}</span>
                          {method.name}
                        </span>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          selectedMethod === method.id ? 'border-brand-gold bg-brand-gold' : 'border-slate-700'
                        }`}>
                          {selectedMethod === method.id && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic payment configuration area */}
                  <AnimatePresence mode="wait">
                    {selectedMethod && selectedMethod.startsWith('upi_') && (
                      <motion.div
                        key="upi"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 text-slate-300 text-xs flex items-center gap-3"
                      >
                        <CheckCircle className="text-brand-gold shrink-0" size={18} />
                        <div>
                          <p className="font-bold text-white">Instant UPI Auto-Debit Redirect</p>
                          <p className="text-slate-400 mt-0.5">
                            You will be redirected to the secure {paymentMethods.find(m => m.id === selectedMethod)?.name} app on your phone.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {selectedMethod === 'card' && (
                      <motion.div
                        key="card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="space-y-3.5 p-5 rounded-2xl bg-slate-950/40 border border-slate-800"
                      >
                        <span className="text-xxs uppercase tracking-wider text-slate-400 font-bold block mb-1">Razorpay Secured Card Input</span>
                        
                        {/* Cardholder Name */}
                        <div className="space-y-1">
                          <input
                            type="text"
                            placeholder="Cardholder Name"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold/60 rounded-lg py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                          />
                          {cardErrors.cardName && <p className="text-rose-400 text-xxs">{cardErrors.cardName}</p>}
                        </div>

                        {/* Card Number */}
                        <div className="space-y-1">
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="0000 0000 0000 0000"
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold/60 rounded-lg py-2.5 px-3 pl-8 text-xs text-white focus:outline-none transition-colors"
                            />
                            <CreditCard className="absolute left-2.5 top-3 text-slate-500" size={14} />
                          </div>
                          {cardErrors.cardNumber && <p className="text-rose-400 text-xxs">{cardErrors.cardNumber}</p>}
                        </div>

                        {/* Expiry & CVV */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold/60 rounded-lg py-2.5 px-3 text-xs text-white focus:outline-none transition-colors text-center"
                            />
                            {cardErrors.cardExpiry && <p className="text-rose-400 text-xxs">{cardErrors.cardExpiry}</p>}
                          </div>
                          <div className="space-y-1">
                            <input
                              type="password"
                              placeholder="CVV"
                              maxLength={3}
                              value={cardCvv}
                              onChange={handleCvvChange}
                              className="w-full bg-slate-900 border border-slate-800 focus:border-brand-gold/60 rounded-lg py-2.5 px-3 text-xs text-white focus:outline-none transition-colors text-center"
                            />
                            {cardErrors.cardCvv && <p className="text-rose-400 text-xxs">{cardErrors.cardCvv}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex flex-col gap-4">
                  {/* Razorpay secured text */}
                  <div className="flex items-center justify-between text-slate-400 text-xxs font-medium">
                    <span className="flex items-center gap-1">
                      <Shield size={12} className="text-brand-gold" />
                      Razorpay Trusted Gateway
                    </span>
                    <span>100% Secure Checkout</span>
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedMethod}
                    className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all duration-300 ${
                      selectedMethod 
                        ? 'bg-gradient-to-r from-brand-gold to-[#B5932F] text-slate-950 hover:scale-[1.01]' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                    }`}
                  >
                    Pay & Confirm Booking (₹{grandTotal})
                    <ChevronRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </motion.div>
    </div>
  );
}
