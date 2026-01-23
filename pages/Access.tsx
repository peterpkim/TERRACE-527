
import React from 'react';
import { MapPin, Phone, MessageSquare, Bus, Car } from 'lucide-react';

const ACCESS_DATA = {
  address: "경기도 포천시 영북면 산정호수로 527",
  naverMapUrl: "https://map.naver.com",
  googleMapUrl: "https://maps.google.com",
  contact: { phone: "010-0000-0000", kakao: "테라스 527 채널", kakaoUrl: "https://pf.kakao.com" },
  methods: { car: "포천 산정호수 하동 주차장 방면으로 오시면 입구에 테라스 527 간판이 보입니다.", bus: "운천 시외버스터미널에서 택시 이용 시 약 15분 소요됩니다." },
  checkInSteps: ["주차장 도착 후 관리동 방문", "예약 확인 및 이용 안내 (10분 소요)", "객실 열쇠 및 소모품 수령 후 입실"]
};

const Access: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <header className="text-center mb-16">
        <h1 className="text-2xl md:text-3xl font-bold serif mb-4">오시는 길</h1>
        <p className="text-gray-500">테라스 527로 오시는 가장 빠른 방법을 안내합니다.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-gray-200 w-full aspect-video rounded-3xl overflow-hidden relative shadow-inner">
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
               <MapPin size={64} className="text-gray-300 mb-6" />
               <h3 className="text-lg font-bold text-gray-400 mb-2">{ACCESS_DATA.address}</h3>
               <div className="flex gap-4 mt-8">
                 <a href={ACCESS_DATA.naverMapUrl} target="_blank" className="bg-white px-6 py-2 rounded-full text-xs font-bold border shadow-sm hover:bg-gray-50 transition-all">네이버 지도 열기</a>
                 <a href={ACCESS_DATA.googleMapUrl} target="_blank" className="bg-white px-6 py-2 rounded-full text-xs font-bold border shadow-sm hover:bg-gray-50 transition-all">구글 지도 열기</a>
               </div>
             </div>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-800 font-bold text-lg serif"><Car size={24} /> 자가용 이용 시</div>
              <p className="text-sm text-gray-500 leading-relaxed break-keep">{ACCESS_DATA.methods.car}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-lg serif"><Bus size={24} /> 대중교통 이용 시</div>
              <p className="text-sm text-gray-500 leading-relaxed break-keep">{ACCESS_DATA.methods.bus}</p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold serif border-b pb-4">Contact Info</h3>
            <div className="space-y-4">
              <a href={`tel:${ACCESS_DATA.contact.phone}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-green-700 transition-colors"><Phone size={18} /></div>
                <div><p className="text-[10px] text-gray-400 font-bold uppercase">Call Us</p><p className="text-sm font-bold">{ACCESS_DATA.contact.phone}</p></div>
              </a>
              <a href={ACCESS_DATA.contact.kakaoUrl} target="_blank" className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-[#FEE500] group-hover:text-gray-800 transition-colors"><MessageSquare size={18} /></div>
                <div><p className="text-[10px] text-gray-400 font-bold uppercase">KakaoTalk</p><p className="text-sm font-bold">{ACCESS_DATA.contact.kakao}</p></div>
              </a>
            </div>
          </div>
          <div className="bg-green-900 text-white p-10 rounded-3xl space-y-8 shadow-xl">
            <h3 className="text-xl font-bold serif">Check-in Point</h3>
            <ol className="space-y-6 text-sm text-white/80">
              {ACCESS_DATA.checkInSteps.map((step, idx) => (<li key={idx} className="flex gap-4"><span className="font-bold text-white/40">0{idx+1}</span>{step}</li>))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Access;
