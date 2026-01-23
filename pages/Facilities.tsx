
import React from 'react';
import { Flame, UtensilsCrossed, Coffee, Car, Wifi, ShieldCheck } from 'lucide-react';

const Facilities: React.FC = () => {
  const facilityList = [
    {
      icon: <UtensilsCrossed size={32} />,
      title: '개별 바베큐',
      desc: '모든 객실마다 독립적인 바베큐 공간이 마련되어 있어 프라이빗한 식사가 가능합니다.',
      price: '2인 기준 20,000원'
    },
    {
      icon: <Flame size={32} />,
      title: '불멍 세트',
      desc: '참나무 장작과 매직파이어(오로라 가루)를 제공합니다. 밤하늘 별 아래 감성을 더해보세요.',
      price: '1회 15,000원'
    },
    {
      icon: <Coffee size={32} />,
      title: '무인 매점',
      desc: '음료, 주류, 햇반, 마시멜로 등 필수 품목을 갖춘 무인 매점이 24시간 운영됩니다.',
    },
    {
      icon: <Car size={32} />,
      title: '넓은 주차장',
      desc: '객실별 전용 주차 공간 또는 공용 주차장을 여유롭게 이용하실 수 있습니다.',
    },
    {
      icon: <Wifi size={32} />,
      title: '고속 와이파이',
      desc: '전 객실 기가급 무료 와이파이가 설치되어 있어 쾌적한 인터넷 사용이 가능합니다.',
    },
    {
      icon: <ShieldCheck size={32} />,
      title: '철저한 위생관리',
      desc: '매일 퇴실 후 전문 방역 및 살균 소독을 실시하여 안심하고 머무실 수 있습니다.',
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-20">
          <h1 className="text-4xl font-bold serif mb-4">시설 및 서비스</h1>
          <p className="text-gray-500">테라스 527이 제공하는 편의 시설을 소개합니다.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {facilityList.map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="text-green-700 mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4 serif">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {item.desc}
              </p>
              {item.price && (
                <div className="pt-4 border-t border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cost</span>
                  <p className="text-sm font-semibold text-gray-800">{item.price}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <section className="mt-32 relative rounded-3xl overflow-hidden h-96 flex items-center justify-center text-center px-4">
           <img src="IMAGE/Facilities_Night.webp" className="absolute inset-0 w-full h-full object-cover" alt="Night view" />
           <div className="absolute inset-0 bg-black/50" />
           <div className="relative z-10 max-w-2xl text-white">
             <h2 className="text-3xl font-bold serif mb-6">"가장 깨끗한 쉼표"</h2>
             <p className="text-lg font-light leading-relaxed">
               화려한 인테리어보다 중요한 것은 고객님이 닿는 곳의 청결함이라 믿습니다.<br />
               오늘도 정성을 다해 닦고 쓸며 여러분을 기다립니다.
             </p>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Facilities;
