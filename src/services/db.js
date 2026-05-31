// LocalStorage DB Service simulating Firestore for real-time local functionality

const DEFAULT_CONFIG = {
  farePerSeat: 799,
  convenienceFee: 50,
  estimatedTravelTime: "6 Hours",
  routes: {
    origin: "Ramnagar",
    destination: "Delhi",
    intermediateStops: ["Kashipur", "Moradabad", "Hapur", "Ghaziabad"]
  },
  timings: {
    ramnagarDeparture: "05:00 AM",
    delhiArrival: "11:00 AM",
    delhiDeparture: "04:00 PM",
    ramnagarArrival: "10:00 PM"
  }
};

const DEFAULT_BOOKINGS = [
  {
    id: "BK-9831",
    passengerName: "Rahul Sharma",
    phoneNumber: "9876543210",
    seats: [3, 4],
    date: new Date().toISOString().split('T')[0], // Today
    direction: "outward", // Ramnagar -> Delhi
    pickup: "Ramnagar Bus Stand",
    drop: "Anand Vihar Metro",
    baseFare: 1598,
    fees: 100,
    total: 1698,
    status: "Confirmed",
    paymentId: "pay_mock_123456",
    paymentMethod: "UPI (Google Pay)",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "BK-4210",
    passengerName: "Priya Patel",
    phoneNumber: "9898989898",
    seats: [6],
    date: new Date().toISOString().split('T')[0], // Today
    direction: "return", // Delhi -> Ramnagar
    pickup: "Kashipur Bypass",
    drop: "IGI Airport T3",
    baseFare: 799,
    fees: 50,
    total: 849,
    status: "Confirmed",
    paymentId: "pay_mock_789012",
    paymentMethod: "Razorpay Card",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  }
];

// Initialise DB
const initDB = () => {
  if (!localStorage.getItem("ertiga_config")) {
    localStorage.setItem("ertiga_config", JSON.stringify(DEFAULT_CONFIG));
  }
  if (!localStorage.getItem("ertiga_bookings")) {
    localStorage.setItem("ertiga_bookings", JSON.stringify(DEFAULT_BOOKINGS));
  }
};

initDB();

export const dbService = {
  // CONFIGURATION / SCHEDULES
  getConfig: () => {
    try {
      const config = localStorage.getItem("ertiga_config");
      return config ? JSON.parse(config) : DEFAULT_CONFIG;
    } catch (e) {
      console.error("Error reading config", e);
      return DEFAULT_CONFIG;
    }
  },

  updateConfig: (newConfig) => {
    localStorage.setItem("ertiga_config", JSON.stringify(newConfig));
    // Trigger custom event for reactivity
    window.dispatchEvent(new Event("ertiga_db_update"));
    return newConfig;
  },

  // BOOKINGS
  getBookings: () => {
    try {
      const bookings = localStorage.getItem("ertiga_bookings");
      return bookings ? JSON.parse(bookings) : DEFAULT_BOOKINGS;
    } catch (e) {
      console.error("Error reading bookings", e);
      return DEFAULT_BOOKINGS;
    }
  },

  getBookingsByDate: (date, direction) => {
    const bookings = dbService.getBookings();
    return bookings.filter(b => b.date === date && (!direction || b.direction === direction));
  },

  addBooking: (bookingData) => {
    const bookings = dbService.getBookings();
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    bookings.unshift(newBooking);
    localStorage.setItem("ertiga_bookings", JSON.stringify(bookings));
    window.dispatchEvent(new Event("ertiga_db_update"));
    return newBooking;
  },

  cancelBooking: (bookingId) => {
    let bookings = dbService.getBookings();
    bookings = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem("ertiga_bookings", JSON.stringify(bookings));
    window.dispatchEvent(new Event("ertiga_db_update"));
    return true;
  },

  // SEAT OCCUPANCY
  // Get occupied seats for a specific date and direction
  // Returns array of seat numbers that are booked
  getBookedSeats: (date, direction = "outward") => {
    const bookings = dbService.getBookingsByDate(date, direction);
    let booked = [];
    bookings.forEach(b => {
      booked = [...booked, ...b.seats];
    });
    return booked;
  },

  // Admin override to block seats manually
  blockSeatsManually: (date, direction, seatsToBlock, passengerName = "Blocked by Admin") => {
    const config = dbService.getConfig();
    const totalFare = config.farePerSeat * seatsToBlock.length;
    const fees = config.convenienceFee * seatsToBlock.length;
    
    const blockBooking = {
      passengerName,
      phoneNumber: "N/A",
      seats: seatsToBlock,
      date,
      direction,
      pickup: "Admin Block",
      drop: "Admin Block",
      baseFare: totalFare,
      fees: fees,
      total: totalFare + fees,
      status: "Confirmed",
      paymentId: "ADMIN_BLOCK",
      paymentMethod: "Manual Block",
    };
    
    return dbService.addBooking(blockBooking);
  }
};
