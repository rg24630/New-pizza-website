import React, { useState, useEffect } from 'react';
import { Flame, Compass, CheckCircle2, ChevronRight, MessageSquare, RefreshCw, Sparkles, Navigation } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderTrackerProps {
  order: Order;
  onResetOrder: () => void;
}

export default function OrderTracker({ order, onResetOrder }: OrderTrackerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('received');

  // Interactive logs that update as countdown decreases
  const getSimulatedLogText = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return 'Our Pizza Chef is selecting premium ingredients and dusting the counter with fresh flour.';
      case 'kneading':
        return 'Dough is hand-tossed. Preparing the perfect airy frame, ready for golden-brown oven baking.';
      case 'baking':
        return 'Sliding into our high-temp pizza ovens, baking to golden perfection! The cheese is sizzling nicely.';
      case 'delivering':
        return 'Secured in a heat-retaining thermal bag. Our delivery driver is speeding to your home. Hot and fresh!';
      case 'enjoy':
        return 'Enjoy! Hand-delivered directly to your doorstep. Unbox immediately for that perfect crunch.';
    }
  };

  useEffect(() => {
    if (secondsRemaining <= 0) {
      setCurrentStatus('enjoy');
      return;
    }

    // Determine status depending on countdown interval
    if (secondsRemaining > 50) {
      setCurrentStatus('received');
    } else if (secondsRemaining > 38) {
      setCurrentStatus('kneading');
    } else if (secondsRemaining > 20) {
      setCurrentStatus('baking');
    } else {
      setCurrentStatus('delivering');
    }

    const timer = setInterval(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const stages: { key: OrderStatus; label: string; icon: string }[] = [
    { key: 'received', label: 'Order Cast', icon: '📝' },
    { key: 'kneading', label: 'Stretched', icon: '🥣' },
    { key: 'baking', label: 'In Oven', icon: '🔥' },
    { key: 'delivering', label: 'Delivery Dispatch', icon: '🛵' },
    { key: 'enjoy', label: 'Delivered', icon: '🍕' }
  ];

  // Progress percentage
  const getProgressPercentage = () => {
    return ((60 - secondsRemaining) / 60) * 100;
  };

  return (
    <div className="bg-white/5 rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl max-w-xl mx-auto" id="order-tracker">
      {/* Header alert */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 bg-[#FF3D00]/10 border border-[#FF3D00]/25 p-1.5 px-4 rounded-full text-xs text-[#FF3D00] font-bold uppercase tracking-wider animate-pulse">
          <Flame className="size-4 animate-spin text-[#FF3D00]" />
          <span>Express Pizza Tracker Active</span>
        </div>
        <h3 className="font-sans text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
          Track Your Pizza Live
        </h3>
        <p className="text-white/40 text-xs">
          Order ID Ref: <span className="font-mono font-bold text-white/70">{order.id}</span>
        </p>
      </div>

      {/* Visual countdown disc */}
      <div className="relative h-40 w-40 rounded-full border-4 border-dashed border-white/15 flex items-center justify-center mx-auto mb-8 bg-black/40">
        
        {/* Animated spinner ring for tracking active state */}
        {currentStatus !== 'enjoy' && (
          <div className="absolute inset-2 rounded-full border-2 border-[#FF3D00] border-t-transparent animate-spin"></div>
        )}

        <div className="text-center z-10">
          {currentStatus === 'enjoy' ? (
            <div className="space-y-1">
              <span className="text-4xl animate-bounce block">🎉</span>
              <span className="block font-bold text-emerald-400 text-xs uppercase tracking-wider">Arrived!</span>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="block font-sans text-[9px] text-white/40 uppercase tracking-widest font-black">Est. Delivery</span>
              <span className="block font-mono text-3xl font-black text-white">
                {secondsRemaining}s
              </span>
              <span className="block text-[8px] text-[#FF3D00] uppercase font-bold tracking-widest">Hut Speed</span>
            </div>
          )}
        </div>
      </div>

      {/* Node Progress Bar */}
      <div className="relative mb-8 pb-3">
        {/* Connection line background */}
        <div className="absolute top-[18px] left-[10%] right-[10%] h-1 bg-white/10 rounded-full -z-10"></div>
        
        {/* Glowing active progress filler line */}
        <div 
          className="absolute top-[18px] left-[10%] h-1 bg-[#FF3D00] rounded-full -z-10 transition-all duration-1000"
          style={{ width: `${Math.max(0, Math.min(100, getProgressPercentage() * 0.8))}%` }}
        ></div>

        {/* Roller Vespa tracker moving according to progress percentage */}
        {currentStatus === 'delivering' && (
          <div 
            className="absolute top-2 -mt-4 transition-all duration-1000 z-30 animate-bounce"
            style={{ left: `calc(${getProgressPercentage() * 0.8}% + 4%)` }}
          >
            <span className="text-2xl block">🛵</span>
          </div>
        )}

        {/* Stages bullets row */}
        <div className="flex justify-between items-center text-center">
          {stages.map((stage) => {
            const isCompleted = stages.findIndex(s => s.key === stage.key) <= stages.findIndex(s => s.key === currentStatus);
            const isActive = stage.key === currentStatus;

            return (
              <div key={stage.key} className="flex flex-col items-center flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm border-2 transition-all duration-150 ${
                  isActive 
                    ? 'bg-[#FF3D00] border-[#FF3D00] text-white shadow-xl scale-110 font-bold' 
                    : isCompleted 
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400 font-bold' 
                    : 'bg-black border-white/10 text-white/40'
                }`}>
                  {isCompleted && !isActive ? '✔' : stage.icon}
                </div>
                <span className={`text-[9px] tracking-wider uppercase mt-2 block ${
                  isActive ? 'text-white font-black' : isCompleted ? 'text-white/70' : 'text-white/40'
                }`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive logs / descriptive cards */}
      <div className="bg-black border border-white/10 rounded-2xl p-5 mb-6 text-center shadow-lg">
        <h4 className="font-sans font-black text-sm text-white lowercase tracking-wide mb-1.5 transition-all">
          ❝ Status: <span className="text-[#FF3D00] tracking-widest uppercase text-xs">{currentStatus}</span> ❞
        </h4>
        <p className="text-white/60 text-xs font-light leading-relaxed">
          {getSimulatedLogText(currentStatus)}
        </p>
      </div>

      {/* Recipient Card info */}
      <div className="border-t border-white/10 pt-5 space-y-3.5 mb-6 text-white text-xs">
        <div className="flex justify-between items-start gap-3">
          <span className="text-white/45 shrink-0 font-bold font-mono uppercase text-[9px] tracking-wider">Recipient Name:</span>
          <span className="text-white font-bold text-right">{order.customerName}</span>
        </div>
        <div className="flex justify-between items-start gap-3">
          <span className="text-white/45 shrink-0 font-bold font-mono uppercase text-[9px] tracking-wider">Deliver Address:</span>
          <span className="text-white font-bold text-right truncate max-w-[260px]" title={order.address}>{order.address}</span>
        </div>
        <div className="flex justify-between items-start gap-3">
          <span className="text-white/45 shrink-0 font-bold font-mono uppercase text-[9px] tracking-wider">Grand Total Paid:</span>
          <span className="text-[#FF3D00] font-sans font-black text-sm">${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={onResetOrder}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#FF3D00] text-white hover:bg-white hover:text-black font-extrabold uppercase text-xs tracking-widest transition-all duration-150 outline-none shadow-lg shadow-[#FF3D00]/10"
      >
        <RefreshCw className="size-3.5" />
        <span>Return to Fresh Pizza Station</span>
      </button>
    </div>
  );
}
