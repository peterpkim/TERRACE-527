
import React, { useState } from 'react';
import { ACTIVITIES } from '../constants';
import { Map, Coffee, Gamepad2, Stars } from 'lucide-react';

const Activities: React.FC = () => {
  const [tab, setTab] = useState<'outdoor' | 'indoor'>('outdoor');

  const filtered = ACTIVITIES.filter(a => a.category === tab);

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold serif mb-4">시즌 액티비티</h1>
          <p className="text-gray-500">산정호수의 사계절, 테라스 527만의 특별한 즐거움</p>
          
          <div className="flex justify-center mt-10 p-1 bg-white rounded-full shadow-sm max-w-xs mx-auto">
            <button
              onClick={() => setTab('outdoor')}
              className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${
                tab === 'outdoor' ? 'bg-green-800 text-white' : 'text-gray-400'
              }`}
            >
              실외 활동
            </button>
            <button
              onClick={() => setTab('indoor')}
              className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${
                tab === 'indoor' ? 'bg-green-800 text-white' : 'text-gray-400'
              }`}
            >
              실내 활동
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold serif mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
          {/* Default items if filter list is small */}
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-100">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
              {tab === 'outdoor' ? <Map size={24} /> : <Coffee size={24} />}
            </div>
            <p className="text-xs text-gray-400">더 많은 콘텐츠를 준비 중입니다.</p>
          </div>
        </div>

        <section className="mt-24">
          <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm overflow-hidden relative">
            <div className="relative z-10 max-w-xl">
               <span className="text-green-700 font-bold text-xs uppercase tracking-widest">Off-Season Special</span>
               <h2 className="text-3xl font-bold serif mt-4 mb-6">겨울에도 따뜻한 글램핑</h2>
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <Gamepad2 className="text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-bold text-sm">보드게임 무료 대여</h4>
                      <p className="text-xs text-gray-500 mt-1">관리동에서 다양한 보드게임을 자유롭게 대여해 드립니다.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <Stars className="text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-bold text-sm">동절기 난방 패키지</h4>
                      <p className="text-xs text-gray-500 mt-1">바닥 난방은 기본, 등유 난로와 무릎 담요를 상시 구비하고 있습니다.</p>
                    </div>
                 </div>
               </div>
            </div>
            <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block">
              <img src="https://picsum.photos/seed/winter/600/800" className="w-full h-full object-cover opacity-80" alt="Winter theme" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Activities;
