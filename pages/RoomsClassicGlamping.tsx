import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const ROOM_DATA = {
  titleEn: "Classic Glamping",
  titleKo: "클래식 글램핑",
  badge: "Total 5 Rooms (Large 2 / Medium 3)",
  description: "가장 사랑받아 온 클래식 라인은 동일한 감성의 인테리어와 더불어 공간의 크기에 따라 대형과 중형으로 세분화됩니다.",
  images: [
    "IMAGE/Room_CG_01.webp",
    "IMAGE/Room_CG_02.webp",
    "IMAGE/Room_CG_03.webp",
    "IMAGE/Room_CG_04.webp",
    "IMAGE/Room_CG_05.webp"
  ],
  specs: {
    standard: "2 Persons",
    max: "4 Persons",
    features: ['개별 테라스 바비큐', '에어컨 및 바닥 난방 시스템', '개별 화장실 및 샤워실', '호텔식 살균 침구']
  }
};

const ROOM_NAV = [
  { name: 'Classic Glamping', path: '/rooms/classic-glamping' },
  { name: 'Signature Glamping', path: '/rooms/signature-glamping' },
  { name: 'Classic Stay', path: '/rooms/classic-stay' },
  { name: 'Signature Stay', path: '/rooms/signature-stay' }
];

const RoomsClassicGlamping: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const nextImage = () => setActiveIndex((prev) => (prev + 1) % ROOM_DATA.images.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + ROOM_DATA.images.length) % ROOM_DATA.images.length);

  return (
    <div className="w-full bg-white">
      <nav className="sticky top-20 bg-white/80 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
          <div className="flex justify-start md:justify-center items-center min-w-max h-16 gap-8">
            {ROOM_NAV.map((nav) => (
              <Link key={nav.path} to={nav.path} className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all whitespace-nowrap border-b-2 py-5 ${location.pathname === nav.path ? 'border-green-900 text-green-950' : 'border-transparent text-gray-400 hover:text-green-800'}`}>{nav.name}</Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <header className="mb-20 text-center lg:text-left">
          <span className="text-gray-400 font-bold text-[10px] tracking-[0.5em] uppercase block mb-4">{ROOM_DATA.badge}</span>
          <h1 className="text-3xl md:text-4xl font-bold serif">{ROOM_DATA.titleEn}</h1>
          <p className="text-gray-500 mt-8 max-w-xl text-sm font-light leading-relaxed mx-auto lg:mx-0 break-keep">{ROOM_DATA.description}</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-[16/9] bg-gray-50 rounded-3xl overflow-hidden group shadow-xl">
              <img src={ROOM_DATA.images[activeIndex]} className="w-full h-full object-cover transition-opacity duration-700" alt="" />
              <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-lg p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"><ChevronLeft size={28} /></button>
              <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-lg p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"><ChevronRight size={28} /></button>
            </div>
            <div className="grid grid-cols-5 gap-4 px-2">
              {ROOM_DATA.images.map((img, i) => (
                <button key={i} onClick={() => setActiveIndex(i)} className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${activeIndex === i ? 'border-green-900 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}><img src={img} className="w-full h-full object-cover" alt="" /></button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold serif tracking-tight">자연 본연의 안락함</h2>
              <p className="text-sm text-gray-500 leading-relaxed font-light break-keep">클래식한 캠핑의 무드를 잃지 않으면서도 테라스 527만의 정갈한 관리 시스템이 적용되었습니다.</p>
              <div className="flex gap-12 border-y border-gray-100 py-8">
                <div className="flex flex-col"><span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Standard</span><span className="text-sm font-bold">{ROOM_DATA.specs.standard}</span></div>
                <div className="flex flex-col"><span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Max</span><span className="text-sm font-bold">{ROOM_DATA.specs.max}</span></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4">
               {ROOM_DATA.specs.features.map(f => (
                 <div key={f} className="flex items-center gap-3 text-[11px] text-gray-400 font-bold tracking-wide"><div className="w-1.5 h-1.5 bg-green-900 rounded-full" /> {f}</div>
               ))}
            </div>
            <Link to="/booking" className="inline-block w-full bg-black text-white text-center py-6 rounded-2xl text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-green-900 transition-all shadow-lg">Check Real-time Booking</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsClassicGlamping;