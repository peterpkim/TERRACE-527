import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const ROOM_DATA = {
  titleEn: "Classic Stay",
  titleKo: "클래식 스테이",
  badge: "Total 4 Rooms (Family Friendly)",
  description: "가족 단위 여행객을 위해 정성을 다해 관리해 온 총 4개 객실의 펜션 타입입니다. 넓은 평면 구성으로 집과 같은 편안함을 누리실 수 있습니다.",
  images: [
    "IMAGE/Room_CS_01.webp",
    "IMAGE/Room_CS_02.webp",
    "IMAGE/Room_CS_03.webp",
    "IMAGE/Room_CS_04.webp",
    "IMAGE/Room_CS_05.webp"
  ],
  specs: {
    standard: "2 Persons",
    max: "6 Persons",
    features: ['풀 키친 조리 시설', '개별 테라스 BBQ', '분리형 대형 거실', '가족형 대형 욕실']
  }
};

const ROOM_NAV = [
  { name: 'Classic Glamping', path: '/rooms/classic-glamping' },
  { name: 'Signature Glamping', path: '/rooms/signature-glamping' },
  { name: 'Classic Stay', path: '/rooms/classic-stay' },
  { name: 'Signature Stay', path: '/rooms/signature-stay' }
];

const RoomsClassicStay: React.FC = () => {
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
          <span className="text-gray-400 font-bold text-[10px] tracking-[0.5em] uppercase block mb-4">{ROOM_DATA.badge}</span>
          <h1 className="text-5xl font-bold serif">{ROOM_DATA.titleEn}</h1>
          <p className="text-gray-500 mt-8 max-w-xl text-sm font-light leading-relaxed mx-auto lg:mx-0 break-keep">
            {ROOM_DATA.description}
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-[16/9] bg-gray-50 rounded-3xl overflow-hidden group shadow-xl">
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
              <h2 className="text-2xl font-bold serif tracking-tight">익숙한 편안함</h2>
              <p className="text-sm text-gray-500 leading-relaxed font-light break-keep">
                분리된 침실과 넓은 거실 구조는 다인원 투숙 시에도 개인의 프라이버시를 지켜줍니다. 실내 조리 시설이 완비되어 가족 여행에 최적화되었습니다.
              </p>
              <div className="flex gap-12 border-y border-gray-100 py-8">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Standard</span>
                  <span className="text-sm font-bold">{ROOM_DATA.specs.standard}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Max</span>
                  <span className="text-sm font-bold">{ROOM_DATA.specs.max}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4">
               {ROOM_DATA.specs.features.map(f => (
                 <div key={f} className="flex items-center gap-3 text-[11px] text-gray-400 font-bold tracking-wide">
                   <div className="w-1.5 h-1.5 bg-green-900 rounded-full" /> {f}
                 </div>
               ))}
            </div>
            <Link 
              to="/booking"
              className="inline-block w-full bg-black text-white text-center py-6 rounded-2xl text-[10px] font-bold tracking-[0.4em] uppercase hover:opacity-80 transition-all"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsClassicStay;