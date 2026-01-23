
import React, { useState } from 'react';
import { ROOMS } from '../constants';
import { ChevronRight, Users, Bed, CheckCircle2 } from 'lucide-react';
// Fix: Use 'react-router' instead of 'react-router-dom' to resolve missing export error
import { Link } from 'react-router';

const Rooms: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'glamping' | 'pension'>('all');

  const filteredRooms = ROOMS.filter(r => filter === 'all' || r.type === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold serif mb-4">객실 안내</h1>
        <p className="text-gray-500">테라스 527의 아늑한 공간을 소개합니다.</p>
        
        <div className="flex justify-center gap-4 mt-8">
          {(['all', 'glamping', 'pension'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-8 py-2 rounded-full text-sm font-medium transition-all ${
                filter === type ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {type === 'all' ? '전체' : type === 'glamping' ? '글램핑' : '펜션'}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map(room => (
          <div key={room.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {room.isNew && (
                <div className="absolute top-4 left-4 bg-green-700 text-white px-3 py-1 text-[10px] font-bold rounded-full">신축</div>
              )}
            </div>
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold serif">{room.name}</h3>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{room.type}</span>
              </div>
              
              <div className="flex gap-4 text-xs text-gray-500 py-2 border-y border-gray-50">
                <span className="flex items-center"><Users size={14} className="mr-1" /> 기준 {room.maxPeople}인</span>
                <span className="flex items-center"><Bed size={14} className="mr-1" /> {room.type === 'glamping' ? '퀸 베드 1' : '킹 베드 1'}</span>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed min-h-[3rem]">
                {room.description}
              </p>

              <div className="space-y-2">
                {room.features.slice(0, 3).map(f => (
                  <div key={f} className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 size={12} className="text-green-600 mr-2" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-gray-50">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Price</p>
                  <p className="text-sm font-bold">₩ {room.priceRange}</p>
                </div>
                <Link to="/booking" className="bg-gray-900 text-white p-3 rounded-full hover:bg-green-700 transition-all">
                   <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-24 bg-gray-50 p-12 rounded-3xl border border-gray-100">
        <h3 className="text-2xl font-bold serif mb-8">객실 공통 이용안내</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="w-20 font-bold text-gray-400">입실/퇴실</span>
              <span>오후 3시 / 오전 11시</span>
            </li>
            <li className="flex items-start">
              <span className="w-20 font-bold text-gray-400">인원추가</span>
              <span>1인당 20,000원 (영유아 포함)</span>
            </li>
            <li className="flex items-start">
              <span className="w-20 font-bold text-gray-400">매너타임</span>
              <span>오후 10시 이후 외부 등 소등 및 고성방가 금지</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex items-start text-red-600 font-medium">
              <span className="w-20 font-bold text-gray-400">주의사항</span>
              <span>객실 내 흡연 및 반려동물 동반은 절대 불가합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="w-20 font-bold text-gray-400">바베큐</span>
              <span>현장 결제 가능 (2인 기준 20,000원)</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
