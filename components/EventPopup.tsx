import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useLocation, Link } from 'react-router';

const POPUP_CONFIG = {
  isActive: true,
  imageUrl: "IMAGE/Popup_Event.webp",
  linkUrl: "/booking",
  title: "Special Winter Event",
  subTitle: "지금 예약하고 온수 스파 무료 혜택을 받으세요.",
  hideDurationDays: 1,
  width: "max-w-[340px]",
  position: "bottom-8 right-8",
  borderRadius: "rounded-[2rem]",
  shadow: "shadow-[0_20px_50px_rgba(0,0,0,0.15)]",
  animation: "animate-in slide-in-from-bottom-10 fade-in duration-1000 ease-out"
};

const EventPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!POPUP_CONFIG.isActive || location.pathname !== '/') {
      setIsVisible(false);
      return;
    }

    const hideUntil = localStorage.getItem('event_banner_hide_until');
    if (hideUntil && new Date().getTime() < parseInt(hideUntil)) {
      setIsVisible(false);
      return;
    }
    
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const closePopup = () => setIsVisible(false);

  const hideForToday = () => {
    const expires = new Date().getTime() + (POPUP_CONFIG.hideDurationDays * 24 * 60 * 60 * 1000);
    localStorage.setItem('event_banner_hide_until', expires.toString());
    closePopup();
  };

  if (!isVisible || location.pathname !== '/') return null;

  return (
    <div className={`fixed ${POPUP_CONFIG.position} z-[90] ${POPUP_CONFIG.width} w-full ${POPUP_CONFIG.animation} p-4 md:p-0`}>
      <div className={`relative bg-white ${POPUP_CONFIG.borderRadius} ${POPUP_CONFIG.shadow} overflow-hidden border border-gray-100 group`}>
        <Link to={POPUP_CONFIG.linkUrl} onClick={closePopup} className="block relative aspect-[16/10] overflow-hidden">
          <img 
            src={POPUP_CONFIG.imageUrl} 
            alt="Event Promotion" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </Link>
        <div className="p-7 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-green-800 uppercase tracking-widest block">Limited Event</span>
              <h4 className="text-lg font-bold serif text-gray-900 leading-tight">{POPUP_CONFIG.title}</h4>
            </div>
            <button 
              onClick={closePopup} 
              className="text-gray-300 hover:text-gray-900 transition-colors p-1"
              aria-label="닫기"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed break-keep font-medium">
            {POPUP_CONFIG.subTitle}
          </p>
          <div className="pt-4 flex items-center justify-between gap-4">
            <button 
              onClick={hideForToday}
              className="text-[10px] font-bold text-gray-300 hover:text-gray-900 transition-colors tracking-tighter"
            >
              오늘 하루 보지 않기
            </button>
            <Link 
              to={POPUP_CONFIG.linkUrl}
              onClick={closePopup}
              className="flex items-center gap-2 text-[10px] font-bold text-white bg-green-950 px-4 py-2.5 rounded-full hover:bg-black transition-all shadow-md group/btn"
            >
              DETAILS <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        <button 
          onClick={closePopup}
          className="absolute top-3 right-3 bg-black/20 backdrop-blur-md text-white p-1.5 rounded-full md:hidden"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default EventPopup;