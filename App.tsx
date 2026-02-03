
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, Calendar, ChevronDown, Instagram, PenTool, ArrowRight } from 'lucide-react';
import Home from './pages/Home.tsx';
import Story from './pages/Story.tsx';
import ExpHeal from './pages/ExpHeal.tsx';
import ExpPlay from './pages/ExpPlay.tsx';
import ExpService from './pages/ExpService.tsx';
import Access from './pages/Access.tsx';
import Booking from './pages/Booking.tsx';
import Notice from './pages/Notice.tsx';
import RoomsClassicGlamping from './pages/RoomsClassicGlamping.tsx';
import RoomsSignatureGlamping from './pages/RoomsSignatureGlamping.tsx';
import RoomsClassicStay from './pages/RoomsClassicStay.tsx';
import RoomsSignatureStay from './pages/RoomsSignatureStay.tsx';
import EventPopup from './components/EventPopup.tsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const [isExpOpen, setIsExpOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'STORY', path: '/story' },
    { 
      name: 'ROOMS', 
      path: '/rooms/classic-glamping',
      sub: [
        { name: 'Classic Glamping', path: '/rooms/classic-glamping' },
        { name: 'Signature Glamping', path: '/rooms/signature-glamping' },
        { name: 'Classic Stay', path: '/rooms/classic-stay' },
        { name: 'Signature Stay', path: '/rooms/signature-stay' },
      ]
    },
    { 
      name: 'EXPERIENCE', 
      path: '/experience/heal',
      sub: [
        { name: 'Heal & Comfort', path: '/experience/heal' },
        { name: 'Play & Dining', path: '/experience/play' },
        { name: 'Stay Services', path: '/experience/service' },
      ]
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-widest text-gray-900 serif leading-none">TERRACE 527</span>
              <span className="text-[9px] tracking-[0.3em] text-gray-400 mt-1.5 font-bold uppercase">Glamping & Stay Resort</span>
            </div>
          </Link>

          <div className="hidden md:flex space-x-10 items-center h-full">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group/menu h-full flex items-center">
                {link.sub ? (
                  <Link
                    to={link.path}
                    className={`flex items-center text-[14px] tracking-widest font-black transition-colors uppercase h-full ${
                      location.pathname.startsWith(link.path.split('/')[1]) && link.path !== '/' 
                      ? 'text-green-800' 
                      : 'text-gray-600 hover:text-green-800'
                    }`}
                  >
                    {link.name} <ChevronDown size={16} className="ml-1.5 opacity-60" />
                  </Link>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-[14px] tracking-widest font-black transition-colors uppercase h-full flex items-center ${
                      location.pathname === link.path ? 'text-green-800' : 'text-gray-600 hover:text-green-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
                
                {link.sub && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0">
                    <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl py-3 min-w-[240px] backdrop-blur-sm">
                      {link.sub.map((s) => (
                        <Link
                          key={s.name}
                          to={s.path}
                          className={`block px-7 py-4 text-[13px] font-extrabold tracking-wide hover:bg-emerald-50 transition-all rounded-lg mx-2 my-1 ${
                            location.pathname === s.path 
                              ? 'text-emerald-900 bg-emerald-50 border-l-4 border-emerald-900' 
                              : 'text-gray-700 hover:text-emerald-900'
                          }`}
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link 
              to="/booking" 
              className="relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 text-white px-8 py-3.5 rounded-full text-[12px] font-black tracking-[0.3em] hover:from-emerald-800 hover:via-emerald-900 hover:to-emerald-950 transition-all duration-300 uppercase ml-6 shadow-lg hover:shadow-xl hover:shadow-emerald-900/30 hover:scale-105 active:scale-100 group overflow-hidden"
            >
              <span className="relative z-10">RESERVE NOW</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300 overflow-y-auto max-h-[80vh]">
          <div className="px-6 py-8 space-y-2">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-gray-50 last:border-none">
                    {link.sub ? (
                  <div>
                    <div className="flex justify-between items-center w-full">
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="flex-grow py-4 text-base font-black uppercase text-left"
                      >
                        {link.name}
                      </Link>
                      <button 
                        onClick={() => link.name === 'ROOMS' ? setIsRoomsOpen(!isRoomsOpen) : setIsExpOpen(!isExpOpen)}
                        className="p-4 text-gray-400"
                      >
                        <ChevronDown size={20} className={`transition-transform duration-300 ${((link.name === 'ROOMS' && isRoomsOpen) || (link.name === 'EXPERIENCE' && isExpOpen)) ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    {((link.name === 'ROOMS' && isRoomsOpen) || (link.name === 'EXPERIENCE' && isExpOpen)) && (
                      <div className="bg-emerald-50/50 py-3 rounded-xl mb-4 border border-emerald-100">
                        {link.sub.map((s) => (
                          <Link
                            key={s.name}
                            to={s.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-6 py-3.5 text-sm font-extrabold tracking-wide rounded-lg mx-2 my-1 transition-all ${
                              location.pathname === s.path 
                                ? 'text-emerald-900 bg-emerald-100 border-l-4 border-emerald-900' 
                                : 'text-gray-700 hover:text-emerald-900 hover:bg-emerald-50'
                            }`}
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 text-base font-black uppercase"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <Link 
              to="/booking" 
              onClick={() => setIsOpen(false)} 
              className="mt-8 relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 text-white px-8 py-4 rounded-full text-sm font-black tracking-[0.3em] shadow-lg hover:shadow-xl hover:shadow-emerald-900/30 hover:scale-105 active:scale-100 transition-all duration-300 uppercase group overflow-hidden"
            >
              <span className="relative z-10">RESERVE NOW</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white pt-20 pb-28 md:pb-20 px-4 border-t border-gray-100">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
      <div className="space-y-6">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold serif tracking-widest">TERRACE 527</h3>
          <span className="text-[9px] tracking-[0.2em] text-gray-400 font-bold uppercase mt-1">Glamping & Stay Resort</span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed font-medium max-w-xs">
          산정호수의 고요함 속에서 진정한 쉼을 제안합니다. 테라스 527
        </p>
        <div className="flex items-center gap-5 pt-2">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-emerald-50 hover:text-emerald-900 transition-all border border-gray-100 shadow-sm" aria-label="Instagram">
            <Instagram size={18} />
          </a>
          <a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-emerald-50 hover:text-emerald-900 transition-all border border-gray-100 shadow-sm" aria-label="Naver Blog">
            <span className="text-[14px] font-black italic">B</span>
          </a>
          <a href="https://pf.kakao.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#FEE500]/20 hover:text-gray-900 transition-all border border-gray-100 shadow-sm" aria-label="KakaoTalk">
            <MessageSquare size={18} />
          </a>
        </div>
      </div>
      <div className="space-y-4 text-[13px] text-gray-500">
        <p><strong>대표</strong> 김종명</p>
        <p><strong>주소</strong> 경기도 포천시 영북면 산정호수로 529</p>
        <p><strong>사업자번호</strong> 467-52-00594</p>
        <p><strong>연락처</strong> 010-4368-5179</p>
      </div>
      <div className="space-y-3">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Menu</p>
        <nav className="flex flex-col gap-3">
          <Link to="/" className="text-[13px] font-semibold text-gray-600 hover:text-emerald-800 transition-colors">HOME</Link>
          <Link to="/story" className="text-[13px] font-semibold text-gray-600 hover:text-emerald-800 transition-colors">STORY</Link>
          <Link to="/rooms/classic-glamping" className="text-[13px] font-semibold text-gray-600 hover:text-emerald-800 transition-colors">ROOM</Link>
          <Link to="/experience/heal" className="text-[13px] font-semibold text-gray-600 hover:text-emerald-800 transition-colors">EXPERIENCE</Link>
        </nav>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-50 text-[10px] text-gray-400 font-semibold tracking-widest text-center uppercase">
      &copy; 2026 TERRACE 527. ALL RIGHTS RESERVED.
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <EventPopup />
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/experience/heal" element={<ExpHeal />} />
            <Route path="/experience/play" element={<ExpPlay />} />
            <Route path="/experience/service" element={<ExpService />} />
            <Route path="/rooms/classic-glamping" element={<RoomsClassicGlamping />} />
            <Route path="/rooms/signature-glamping" element={<RoomsSignatureGlamping />} />
            <Route path="/rooms/classic-stay" element={<RoomsClassicStay />} />
            <Route path="/rooms/signature-stay" element={<RoomsSignatureStay />} />
            <Route path="/access" element={<Access />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/notice" element={<Notice />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
