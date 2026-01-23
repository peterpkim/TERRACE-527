
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * ############################################################
 * [ EDIT AREA: NOTICE & POLICY CONTENTS ]
 * ############################################################
 */
const NOTICE_DATA = {
  // 자주 묻는 질문 설정
  faqs: [
    {
      question: "바베큐 신청은 어떻게 하나요?",
      answer: "입실 시 관리동에서 신청해 주시면 됩니다. 원하시는 시간을 말씀해 주시면 해당 시간에 맞춰 숯을 준비해 드립니다."
    },
    {
      question: "반려동물 동반이 가능한가요?",
      answer: "죄송합니다. 다른 투숙객분들의 쾌적한 휴식과 알레르기 예방을 위해 반려동물 동반은 정중히 거절하고 있습니다."
    },
    {
      question: "겨울에도 따뜻한가요?",
      answer: "전 객실 바닥 난방 시스템과 에어컨/온풍기 겸용 기기가 설치되어 있습니다. 글램핑 객실의 경우 추가로 등유 난로 대여(유료)가 가능하여 한겨울에도 따뜻하게 지내실 수 있습니다."
    },
    {
      question: "주변에 편의점이 있나요?",
      answer: "관리동 내 24시간 무인 매점이 운영되고 있으며, 차량으로 3분 거리(도보 10분)에 대형 편의점이 위치해 있습니다."
    }
  ],
  // 환불 규정 설정
  refundPolicy: [
    { day: "10일 전", rate: "100% 환불", color: "text-gray-800" },
    { day: "7일 전", rate: "70% 환불", color: "text-gray-800" },
    { day: "3일 전", rate: "30% 환불", color: "text-gray-800" },
    { day: "당일~2일 전", rate: "환불 불가", color: "text-red-600" }
  ],
  // 유의 사항 설정
  precautions: [
    "전 객실 금연구역입니다. 지정된 장소에서만 흡연해 주세요.",
    "개인 화기(가스버너, 전기그릴, 촛불 등)의 지참 및 사용을 엄격히 금지합니다.",
    "오후 10시부터는 매너타임입니다. 고성방가 및 소음 발생에 각별히 유의해 주세요.",
    "시설물 파손 및 침구 오염 시 배상 책임이 발생할 수 있습니다.",
    "미성년자는 부모님 동행 없이 이용이 불가합니다."
  ]
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-green-800 transition-colors"
      >
        <span className="font-bold text-gray-800">{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="pb-6 text-sm text-gray-500 leading-relaxed animate-in fade-in duration-300 break-keep">
          {answer}
        </div>
      )}
    </div>
  );
};

const Notice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-32">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold serif mb-4">이용 안내</h1>
        <p className="text-gray-500">테라스 527을 더 완벽하게 즐기기 위한 약속</p>
      </header>

      <section className="mb-24">
        <h2 className="text-2xl font-bold serif mb-8 pb-4 border-b">자주 묻는 질문 (FAQ)</h2>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-10">
          {NOTICE_DATA.faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-2xl font-bold serif mb-8 pb-4 border-b">환불 규정</h2>
        <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 space-y-8 text-sm">
          <p className="text-red-600 font-bold">* 올바른 예약문화 정착을 위해 신중한 예약 부탁드립니다.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {NOTICE_DATA.refundPolicy.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200">
                <p className="text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-widest">{item.day}</p>
                <p className={`font-bold ${item.color}`}>{item.rate}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed break-keep">
            - 기상악화로 인한 취소 시에도 동일한 규정이 적용됩니다 (단, 천재지변으로 인한 공식 폐쇄 시 제외).<br />
            - 예약 당일 취소 시에도 이용일 기준 환불 규정이 적용됩니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold serif mb-8 pb-4 border-b">유의 사항</h2>
        <ul className="space-y-6 text-sm text-gray-600">
          {NOTICE_DATA.precautions.map((item, idx) => (
            <li key={idx} className="flex gap-4 items-start">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0 mt-1.5" />
              <span className="break-keep leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Notice;
