import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronRight, ChevronLeft, RefreshCcw } from 'lucide-react';

const ROOM_DATA = {
  titleEn: "Signature Stay",
  titleKo: "시그니처 스테이",
  badge: "1 Exclusive Villa",
  description: "오직 한 개 동으로만 운영되는 테라스 527의 익스클루시브 빌라입니다. 최근 리뉴얼을 통해 미니멀한 무드를 극대화한 특별한 공간을 경험하십시오.",
  images: [
    "IMAGE/Room_SS_01.webp",
    "IMAGE/Room_SS_02.webp",
    "IMAGE/Room_SS_03.webp",
    "IMAGE/Room_SS_04.webp",
    "IMAGE/Room_SS_05.webp"
  ],
  specs: {
    type: "Exclusive Villa",
    bed: "Premium King",
    features: ['완벽한 독채형 구조', '고급 벽난로 인테리어', '캡슐 커피 머신 구비', '디자이너 가구 배치']
  }
};

const ROOM_NAV = [
  { name: 'Classic Glamping', path: '/rooms/classic-glamping' },
  { name: 'Signature Glamping', path: '/rooms/signature-glamping' },
  { name: 'Classic Stay', path: '/rooms/classic-stay' },
  { name: 'Signature Stay', path: '/rooms/signature-stay' }
];

const RoomsSignatureStay: React.FC = () => {
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
              <Link
                key={nav.path}
                to={nav.path}
                className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all whitespace-nowrap border-b-2 py-5 ${
                  location.pathname === nav.path 
                  ? 'border-green-900 text-green-950' 
                  : 'border-transparent text-gray-400 hover:text-green-800'
                }`}
              >
                {nav.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <header className="mb-20 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <RefreshCcw size={14} className="text-blue-900" />
            <span className="text-blue-900 font-bold text-[10px] tracking-[0.5em] uppercase">{ROOM_DATA.badge}</span>
          </div>
          <h1 className="text-5xl font-bold serif">{ROOM_DATA.titleEn}</h1>
          <p className="text-gray-500 mt-8 max-w-xl text-sm font-light leading-relaxed mx-auto lg:mx-0 break-keep">
            {ROOM_DATA.description}
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-[16/9] bg-gray-50 rounded-3xl overflow-hidden group shadow-2xl border border-gray-100">
              <img src={ROOM_DATA.images[activeIndex]} className="w-full h-full object-cover transition-opacity duration-700" alt="" />
              <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-lg p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
                <ChevronLeft size={28} />
              </button>
              <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-lg p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
                <ChevronRight size={28} />
              </button>
            </div>
            
            <div className="grid grid-cols-5 gap-4 px-2">
              {ROOM_DATA.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveIndex(i)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    activeIndex === i ? 'border-green-900 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold serif tracking-tight">공간의 정수</h2>
              <p className="text-sm text-gray-500 leading-relaxed font-light break-keep">
                통창으로 비치는 산정호수의 사계절이 인테리어의 완성이 됩니다. 독채형 구조의 프라이버시와 정제된 디자인으로 당신의 스테이를 완성하십시오.
              </p>
              <div className="flex gap-12 border-y border-gray-100 py-8">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Type</span>
                  <span className="text-sm font-bold">{ROOM_DATA.specs.type}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Bed</span>
                  <span className="text-sm font-bold">{ROOM_DATA.specs.bed}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4">
               {ROOM_DATA.specs.features.map(f => (
                 <div key={f} className="flex items-center gap-3 text-[11px] text-gray-800 font-bold tracking-wide">
                   <div className="w-1.5 h-1.5 bg-green-900 rounded-full" /> {f}
                 </div>
               ))}
            </div>
            <Link 
              to="/booking"
              className="inline-block w-full bg-black text-white text-center py-6 rounded-2xl text-[10px] font-bold tracking-[0.4em] uppercase hover:opacity-80 transition-all shadow-md"
            >
              Reservation Only
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsSignatureStay;