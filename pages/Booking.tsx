
import React, { useState } from 'react';
import { Calendar, Phone, MessageSquare, ExternalLink, QrCode, Plus, Minus, Info, AlertCircle, HelpCircle } from 'lucide-react';

/**
 * ############################################################
 * [ EDIT AREA: BOOKING PAGE CONTENTS ]
 * ############################################################
 */
const BOOKING_DATA = {
  naverBookingUrl: "https://booking.naver.com", // # 네이버 예약 바로가기 링크
  kakaoUrl: "https://pf.kakao.com", // # 카카오톡 상담 채널 링크
  phone: "010-0000-0000",
  smartOrder: {
    title: "투숙객 전용 스마트 오더",
    description: "객실마다 비치된 QR 코드를 스캔하시면 바베큐 세트, 장작, 추가 소모품을 스마트폰으로 편리하게 주문하실 수 있습니다. (현재 시범 운영 중)",
    steps: ["QR 스캔", "메뉴 주문", "문앞 배송"]
  }
};

const GUIDE_DATA = [
  {
    id: "info",
    title: "예약 및 이용 안내",
    icon: <Info size={20} />,
    content: (
      <div className="space-y-10 text-sm md:text-base leading-relaxed">
        <div>
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-1 h-1 bg-green-800 rounded-full" /> 체크인 · 체크아웃
          </h4>
          <p className="text-gray-600">체크인 : <span className="text-gray-900 font-bold">오후 3시</span></p>
          <p className="text-gray-600">체크아웃 : <span className="text-gray-900 font-bold">오전 11시</span></p>
          <p className="text-xs text-gray-400 mt-2">※ 얼리 체크인 및 레이트 체크아웃은 당일 객실 상황에 따라 가능 여부가 달라질 수 있습니다.</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-1 h-1 bg-green-800 rounded-full" /> 이용 인원
          </h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>객실별 기준 인원 및 최대 인원이 정해져 있습니다.</li>
            <li>기준 인원 초과 시 추가 요금이 발생하며, 최대 인원 초과 입실은 불가합니다.</li>
            <li>영유아도 인원에 포함됩니다.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-1 h-1 bg-green-800 rounded-full" /> 이용 시 유의사항
          </h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>보호자 동반 없는 미성년자 단독 입실은 불가합니다.</li>
            <li>예약자와 실제 이용자가 다를 경우 입실이 제한될 수 있습니다.</li>
            <li>반려동물 동반은 불가합니다.</li>
            <li>상업적 촬영 및 이벤트 목적의 이용은 사전 협의가 필요합니다.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-1 h-1 bg-green-800 rounded-full" /> 바비큐 및 체험 프로그램
          </h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>모든 객실은 바비큐 이용이 가능합니다. (Basic / Signature BBQ 선택 가능)</li>
            <li>Outdoor Spa, Cinema Night 등 일부 프로그램은 사전 예약 또는 현장 신청으로 운영됩니다.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-1 h-1 bg-green-800 rounded-full" /> 안전 및 매너
          </h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>객실 내 흡연은 금지되어 있으며, 밤 10시 이후에는 매너 타임이 적용됩니다.</li>
            <li>시설물 훼손 및 분실 시 실비가 청구될 수 있습니다.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "refund",
    title: "예약 취소 및 환불 규정",
    icon: <AlertCircle size={20} />,
    content: (
      <div className="space-y-8">
        <p className="text-xs text-red-500 font-bold mb-4">(성수기·비성수기 동일 적용)</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { d: "10일 전", r: "전액 환불" },
            { d: "9일 전", r: "90% 환불" },
            { d: "8일 전", r: "80% 환불" },
            { d: "7일 전", r: "70% 환불" },
            { d: "6일 전", r: "60% 환불" },
            { d: "5일 전", r: "50% 환불" },
            { d: "4일 전", r: "40% 환불" },
            { d: "3일 전", r: "30% 환불" },
            { d: "2일 전~당일", r: "환불 불가", highlight: true },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border flex flex-col items-center justify-center ${item.highlight ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
              <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">{item.d}</span>
              <span className={`text-sm font-bold ${item.highlight ? 'text-red-600' : 'text-gray-800'}`}>{item.r}</span>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-gray-100 space-y-2 text-xs text-gray-400 leading-relaxed">
          <p>• 본 규정은 주말, 성수기, 연휴 기간에도 동일하게 적용됩니다.</p>
          <p>• 기상 악화 및 개인 사정으로 인한 취소도 동일한 환불 규정이 적용됩니다.</p>
          <p>• 예약 변경은 취소 후 재예약으로 처리됩니다.</p>
        </div>
      </div>
    )
  },
  {
    id: "faq",
    title: "자주 묻는 질문 (FAQ)",
    icon: <HelpCircle size={20} />,
    content: (
      <div className="space-y-6">
        {[
          { q: "Q1. 체크인 시간보다 일찍 도착하면 이용할 수 있나요?", a: "체크인 시간 이전 입실은 불가하며, 객실 준비가 완료된 경우에 한해 안내드릴 수 있습니다." },
          { q: "Q2. 기준 인원 초과 시 입실이 가능한가요?", a: "기준 인원 초과 시 추가 요금이 발생하며, 최대 인원 초과 입실은 불가합니다." },
          { q: "Q3. 아이도 인원에 포함되나요?", a: "네, 영유아를 포함한 모든 인원은 기준 인원에 포함됩니다." },
          { q: "Q4. 바베큐는 꼭 사전 예약해야 하나요?", a: "Basic BBQ는 현장 신청이 가능하며, Signature BBQ는 사전 예약을 권장드립니다." },
          { q: "Q5. Outdoor Spa와 체험 프로그램은 언제 신청하나요?", a: "일부 프로그램은 사전 예약, 일부는 현장 신청으로 운영되며 체크인 시 안내드립니다." },
          { q: "Q6. 수영장은 언제 이용할 수 있나요?", a: "수영장은 여름 시즌 한정으로 운영되며, 기상 상황에 따라 이용이 제한될 수 있습니다." },
          { q: "Q7. 키즈존은 자유롭게 이용할 수 있나요?", a: "키즈존은 보호자 동반 이용을 원칙으로 하며, 안전 수칙을 반드시 지켜주시기 바랍니다." },
          { q: "Q8. 단체 또는 기업 이용도 가능한가요?", a: "세미나룸을 포함한 단체 및 기업 이용이 가능하며, 별도 문의를 통해 상담 후 진행됩니다." },
          { q: "Q9. 반려동물 동반이 가능한가요?", a: "반려동물 동반은 불가합니다." },
          { q: "Q10. 환불 규정은 어디서 확인하나요?", a: "환불 규정은 예약 페이지 하단 및 예약 완료 시 안내되는 정책을 참고해 주세요." }
        ].map((faq, idx) => (
          <div key={idx} className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
            <h5 className="font-bold text-gray-900 mb-2 text-sm">{faq.q}</h5>
            <p className="text-gray-500 text-sm leading-relaxed break-keep">{faq.a}</p>
          </div>
        ))}
      </div>
    )
  }
];

const Booking: React.FC = () => {
  const [openGuide, setOpenGuide] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-32">
      <header className="text-center mb-20">
        <h1 className="text-4xl font-bold serif mb-4">예약 안내</h1>
        <p className="text-gray-500">테라스 527을 더 완벽하게 즐기기 위한 약속</p>
      </header>

      {/* RESERVATION GUIDES (Accordion) */}
      <section className="mb-32 space-y-4">
        {GUIDE_DATA.map((guide) => (
          <div key={guide.id} className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm bg-white transition-all duration-300">
            <button
              onClick={() => setOpenGuide(openGuide === guide.id ? null : guide.id)}
              className="w-full px-8 py-7 flex items-center justify-between hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openGuide === guide.id ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-400 group-hover:text-green-800'}`}>
                  {guide.icon}
                </div>
                <span className="font-bold text-lg serif text-gray-800">{guide.title}</span>
              </div>
              <div className={`transition-transform duration-500 ${openGuide === guide.id ? 'rotate-45' : ''}`}>
                <Plus size={24} className={openGuide === guide.id ? 'text-green-900' : 'text-gray-300'} />
              </div>
            </button>
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openGuide === guide.id ? 'max-h-[2000px] opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-8 md:p-12">
                {guide.content}
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-10 text-center">
          <p className="text-gray-400 font-bold serif text-lg md:text-xl break-keep">
            편안한 휴식을 위한 약속입니다.<br />
            <span className="text-gray-300">서로를 배려하는 이용에 감사드립니다.</span>
          </p>
        </div>
      </section>

      {/* BOOKING BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24 border-t border-gray-100 pt-32">
        <a 
          href={BOOKING_DATA.naverBookingUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-700 text-white p-12 rounded-[3rem] flex flex-col items-center justify-center text-center group hover:bg-green-800 transition-all shadow-xl"
        >
          <Calendar size={56} className="mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold serif mb-3">네이버 실시간 예약</h3>
          <p className="text-sm text-white/70 mb-8">가장 편리한 결제와 포인트 적립</p>
          <div className="bg-white/10 px-8 py-3 rounded-full text-xs font-bold flex items-center tracking-widest">
            바로가기 <ExternalLink size={14} className="ml-2" />
          </div>
        </a>

        <div className="grid grid-rows-2 gap-10">
          <a 
            href={`tel:${BOOKING_DATA.phone}`}
            className="bg-gray-100 p-10 rounded-[3rem] flex items-center gap-8 hover:bg-gray-200 transition-all border border-gray-100 shadow-sm"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-gray-700 shadow-sm">
              <Phone size={32} />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1 tracking-tight">전화 예약 / 상담</h4>
              <p className="text-sm text-gray-500 font-bold">{BOOKING_DATA.phone}</p>
            </div>
          </a>
          <a 
            href={BOOKING_DATA.kakaoUrl}
            target="_blank"
            className="bg-[#FEE500] p-10 rounded-[3rem] flex items-center gap-8 hover:brightness-95 transition-all shadow-sm"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-gray-800 shadow-sm">
              <MessageSquare size={32} />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1 tracking-tight">카카오톡 문의</h4>
              <p className="text-sm text-gray-700 font-bold">실시간 채팅 상담</p>
            </div>
          </a>
        </div>
      </div>

      {/* SMART ORDER SECTION */}
      <section className="bg-gray-50 p-16 rounded-[4rem] border border-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-block bg-black text-white px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">Digital Service</div>
            <h3 className="text-3xl md:text-4xl font-bold serif">{BOOKING_DATA.smartOrder.title}</h3>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed break-keep">
              {BOOKING_DATA.smartOrder.description}
            </p>
            <div className="flex gap-4">
               {BOOKING_DATA.smartOrder.steps.map((step, idx) => (
                 <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 flex-1 text-center shadow-sm">
                    <p className="text-[10px] font-bold text-gray-300 mb-2 uppercase tracking-widest">Step 0{idx+1}</p>
                    <p className="text-sm font-bold text-gray-800">{step}</p>
                 </div>
               ))}
            </div>
          </div>
          <div className="w-56 h-56 bg-white p-6 rounded-3xl shadow-xl flex items-center justify-center border border-gray-100">
             <QrCode size={140} className="text-gray-100" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
