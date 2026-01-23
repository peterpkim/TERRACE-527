import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crown, Tent, Coffee, QrCode, Users, Clock, Sparkles, ArrowRight } from 'lucide-react';

const EXP_NAV = [
  { name: 'Heal & Comfort', path: '/experience/heal' },
  { name: 'Play & Dining', path: '/experience/play' },
  { name: 'Stay Services', path: '/experience/service' }
];

const PROGRAMS = [
  { id: 'revisit', titleEn: 'Re-visit Benefit', titleKo: '재방문 혜택', concept: '다시 찾아주신 소중한 분들을 위한 예우', description: '테라스 527을 다시 찾아주시는 고객님께 특별한 혜택을 드립니다.', items: ['재방문 시 숙박료 할인', '웰컴 드링크 서비스', '우선 예약 권한 부여'], info: { time: '상시 적용', type: '재방문 한정 혜택' }, icon: <Crown />, image: 'IMAGE/Serv_Prog_01.webp' },
  { id: 'longstay', titleEn: 'Camping Site', titleKo: '장박용 캠핑 사이트', concept: '나만의 아지트를 산정호수에', description: '캠핑 장비를 두고 여유롭게 산정호수를 즐길 수 있는 장박 전용 사이트입니다.', items: ['여유로운 사이트 공간', '전용 배전함 및 수도', '장기 계약 특별가'], info: { time: '시즌 협의', type: '장박 전용 상품' }, icon: <Tent />, image: 'IMAGE/Serv_Prog_02.webp' },
  { id: 'lounge', titleEn: '24H Lounge', titleKo: '24시 라운지', concept: '한강 라면 기기와 함께하는 휴게 공간', description: '언제든 열려있는 휴게 공간입니다.', items: ['한강 즉석 라면 기기 완비', '프리미엄 캡슐 커피 머신', '24시간 무인 운영'], info: { time: '24시간 운영', type: '자유 이용/유료 구매' }, icon: <Coffee />, image: 'IMAGE/Serv_Prog_03.webp' },
  { id: 'smartorder', titleEn: 'Smart Order', titleKo: '스마트 오더', concept: '문 앞까지 배달되는 편리함', description: '객실 내 QR코드로 바비큐 세트부터 소모품까지 비대면 주문하세요.', items: ['전 객실 QR 주문 시스템', '비대면 문앞 배송', '실시간 주문 현황 확인'], info: { time: '10:00 ~ 21:00', type: '투숙객 전용 서비스' }, icon: <QrCode />, image: 'IMAGE/Serv_Prog_04.webp' },
  { id: 'seminar', titleEn: 'Corporate Group', titleKo: '기업 및 단체 대관', concept: '비즈니스와 휴식의 완벽한 밸런스', description: '단체 고객을 위한 전체 대관과 맞춤형 워크숍 프로그램을 지원합니다.', items: ['전체 객실 일괄 대관', '대형 세미나 공간 지원', '단체 바비큐 패키지'], info: { time: '사전 협의', type: '단체 전용 서비스' }, icon: <Users />, image: 'IMAGE/Serv_Prog_05.webp' },
  { id: 'flexcheck', titleEn: 'Late Check-out', titleKo: '레이트 체크아웃', concept: '일정에 맞춘 유연한 머무름의 확장', description: '조금 더 늦게 떠나고 싶을 때 이용하세요.', items: ['최대 14:00까지 연장', '당일 상황에 따라 신청', '시간당 추가 요금 발생'], info: { time: '퇴실 당일 신청', type: '유료 옵션' }, icon: <Clock />, image: 'IMAGE/Serv_Prog_06.webp' },
];

const ProgramBlock: React.FC<any> = ({ titleEn, titleKo, concept, description, items, info, icon, image }) => (
  <div className="py-20 md:py-32 border-b border-gray-50 last:border-none group/block">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
      <div className="lg:col-span-7 relative rounded-[2.5rem] overflow-hidden shadow-xl aspect-[16/10] bg-stone-100">
        <img src={image} alt={titleKo} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover/block:scale-110" />
        <div className="absolute top-4 left-4 md:top-10 md:left-10 bg-amber-900 text-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-xl">
          {React.cloneElement(icon as React.ReactElement<any>, { size: 18, className: "md:w-[28px] md:h-[28px]" })}
        </div>
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white z-10">
          <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase opacity-70 mb-1 md:mb-2 block">{titleEn}</span>
          <h3 className="text-2xl md:text-4xl font-bold serif">{titleKo}</h3>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
      </div>

      <div className="lg:col-span-5 space-y-8 md:space-y-10">
        <div className="space-y-4 md:space-y-6">
          <p className="text-2xl md:text-3xl font-bold text-amber-950 serif leading-tight break-keep">{concept}</p>
          <p className="text-gray-500 leading-relaxed font-light break-keep text-sm md:text-base">{description}</p>
        </div>
        <div className="bg-stone-50 p-8 md:p-10 rounded-[2.5rem] border border-stone-100">
          <ul className="space-y-4">
            {items.map((item: string, idx: number) => (
              <li key={idx} className="flex items-center gap-3 text-xs md:text-sm font-semibold text-stone-700">
                <div className="w-1 h-1 bg-amber-900 rounded-full" /> {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between text-[10px] md:text-[11px] font-bold text-stone-400">
            <span>{info.time}</span>
            <span className="text-amber-900">{info.type}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ExpService: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-full bg-white selection:bg-amber-900 selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gray-950 overflow-hidden">
        <div className="absolute inset-0">
          <img src="IMAGE/Exp_Hero_S.webp" className="w-full h-full object-cover opacity-30 scale-105" alt="Stay Services" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="text-white/40 text-[10px] tracking-[0.5em] font-bold uppercase block mb-6 md:mb-8">Stay Services</span>
          <h1 className="text-white text-4xl md:text-6xl font-bold serif tracking-tighter mb-6 md:mb-8">스테이 서비스</h1>
          <p className="text-white/60 text-sm md:text-lg font-light tracking-widest max-w-xl mx-auto break-keep italic">"머무는 방식을 더 유연하게"</p>
        </div>
      </section>

      {/* Sub Nav */}
      <nav className="sticky top-20 bg-white/95 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
          <div className="flex justify-start md:justify-center items-center min-w-max h-16 gap-8 md:gap-16">
            {EXP_NAV.map((nav) => (
              <Link key={nav.path} to={nav.path} className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all whitespace-nowrap border-b-2 py-5 ${location.pathname === nav.path ? 'border-amber-900 text-amber-950' : 'border-transparent text-gray-400 hover:text-amber-800'}`}>{nav.name}</Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6">
        {PROGRAMS.map(prog => <ProgramBlock key={prog.id} {...prog} />)}
      </div>

      {/* Unified CTA Section */}
      <section className="bg-stone-950 py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="IMAGE/Exp_Footer_S.webp" alt="BG" className="w-full h-full object-cover grayscale opacity-20 blur-sm" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[3rem] py-16 text-center shadow-2xl">
            <div className="space-y-8 px-6">
              <h2 className="text-3xl md:text-5xl font-normal serif text-white tracking-tight leading-tight uppercase italic">Where Nature Begins</h2>
              <p className="text-stone-300 text-base md:text-lg font-light tracking-wide max-w-2xl mx-auto break-keep">숲과 물이 함께하는 프리미엄 스테이. 지금 테라스 527을 만나보세요.</p>
              <div className="pt-4">
                <Link to="/booking" className="inline-flex items-center gap-12 bg-white text-stone-950 px-12 py-5 rounded-full font-bold text-[11px] tracking-[0.4em] uppercase hover:bg-emerald-900 hover:text-white transition-all shadow-xl group">RESERVE NOW <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; export default ExpService;