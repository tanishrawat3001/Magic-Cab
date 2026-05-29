import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Navigation, Map } from 'lucide-react';

export default function Timeline({ config }) {
  const [activeDirection, setActiveDirection] = useState('outward'); // 'outward' (Ramnagar -> Delhi) or 'return' (Delhi -> Ramnagar)

  const { routes, timings } = config;

  // Timings mapped onto timeline nodes
  const outwardTimeline = [
    { name: routes.origin, time: timings.ramnagarDeparture, type: "start", desc: "Boarding point & Departure" },
    { name: routes.intermediateStops[0], time: "05:35 AM", type: "stop", desc: "Quick Passenger Boarding" },
    { name: routes.intermediateStops[1], time: "06:30 AM", type: "stop", desc: "Tea Break & Boarding" },
    { name: routes.intermediateStops[2], time: "08:45 AM", type: "stop", desc: "Highway Transit Halt" },
    { name: routes.intermediateStops[3], time: "09:50 AM", type: "stop", desc: "NCR Entry Pickup / Drop" },
    { name: routes.destination, time: timings.delhiArrival, type: "end", desc: "Final Drop-off & Arrival" }
  ];

  const returnTimeline = [
    { name: routes.destination, time: timings.delhiDeparture, type: "start", desc: "Boarding point & Departure" },
    { name: routes.intermediateStops[3], time: "05:10 PM", type: "stop", desc: "Passenger Boarding" },
    { name: routes.intermediateStops[2], time: "06:15 PM", type: "stop", desc: "Highway Transit Halt" },
    { name: routes.intermediateStops[1], time: "08:30 PM", type: "stop", desc: "Dinner & Refreshment Halt" },
    { name: routes.intermediateStops[0], time: "09:25 PM", type: "stop", desc: "Drop-off Station" },
    { name: routes.origin, time: timings.ramnagarArrival, type: "end", desc: "Final Drop-off & Arrival" }
  ];

  const timelineData = activeDirection === 'outward' ? outwardTimeline : returnTimeline;

  return (
    <section id="schedule" className="py-24 bg-slate-950/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Route Schedule</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-poppins">
            Daily Route Timeline
          </h2>
          <p className="text-slate-400 mt-3 font-light">
            Check our daily scheduled timings and intermediate boarding/dropping points along the highway.
          </p>
        </div>

        {/* Direction Switch Toggles */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-full inline-flex space-x-1 shadow-inner shadow-black/40">
            <button
              onClick={() => setActiveDirection('outward')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeDirection === 'outward'
                  ? 'bg-gradient-to-r from-brand-gold to-[#B5932F] text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Navigation className="w-4 h-4" />
              {routes.origin} ➔ {routes.destination}
            </button>
            <button
              onClick={() => setActiveDirection('return')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeDirection === 'return'
                  ? 'bg-gradient-to-r from-brand-gold to-[#B5932F] text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Navigation className="w-4 h-4 rotate-180" />
              {routes.destination} ➔ {routes.origin}
            </button>
          </div>
        </div>

        {/* The Timeline Visualizer */}
        <div className="relative pl-6 sm:pl-0">
          {/* Timeline Center Line */}
          <div className="absolute left-6 sm:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-gold/80 via-slate-800 to-slate-900 -translate-x-1/2 pointer-events-none hidden sm:block" />
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-gold/80 via-slate-800 to-slate-900 pointer-events-none sm:hidden" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {timelineData.map((node, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={node.name + activeDirection}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                  >
                    
                    {/* Node Dot marker */}
                    <div className="absolute left-6 sm:left-1/2 w-5 h-5 rounded-full border-2 border-brand-gold bg-slate-950 -translate-x-1/2 z-10 flex items-center justify-center">
                      <div className={`w-1.5 h-1.5 rounded-full ${node.type === 'start' ? 'bg-emerald-400' : node.type === 'end' ? 'bg-rose-500' : 'bg-brand-gold'}`} />
                    </div>

                    {/* Timeline Content Block */}
                    <div className={`w-full sm:w-[45%] pl-10 sm:pl-0 ${isEven ? 'sm:pl-8 text-left' : 'sm:pr-8 text-left sm:text-right'}`}>
                      <div className="glass-panel p-5 rounded-2xl border-slate-850 hover:border-brand-gold/15 transition-all">
                        {/* Time stamp indicator */}
                        <div className={`flex items-center gap-1.5 text-xs font-semibold text-brand-gold mb-2 ${!isEven ? 'sm:justify-end' : ''}`}>
                          <Clock size={13} />
                          <span>{node.time}</span>
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-bold text-white font-poppins flex items-center gap-1.5 justify-start sm:justify-start">
                          <MapPin size={15} className="text-slate-400" />
                          {node.name}
                        </h4>

                        {/* Description / Info */}
                        <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                          {node.desc}
                        </p>
                      </div>
                    </div>

                    {/* Empty Space for layout balancing on desktop */}
                    <div className="hidden sm:block w-[45%]" />

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
