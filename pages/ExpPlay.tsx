import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Baby, Utensils, Gamepad2, MonitorPlay, Music, Sun, Sparkles, ArrowRight } from 'lucide-react';

const EXP_NAV = [
  { name: 'Heal & Comfort', path: '/experience/heal' },
  { name: 'Play & Dining', path: '/experience/play' },
  { name: 'Stay Services', path: '/experience/service' }
];

const PROGRAMS = [
  { id: 'kidszone', titleEn: 'Kids Zone', titleKo: '키즈존', concept: '모험과 안전이 공존하는 놀이터', description: '실내 정글짐과 야외 모래놀이터가 완비된 아이들을 위한 특별한 놀이 공간입니다.', items: ['실내 안전 정글짐 완비', '야외 모래놀이 구역', '어린이 도서 코너'], info: { time: '10:00 ~ 20:00', type: '투숙객 무료 개방' }, icon: <Baby />, image: 'IMAGE/Play_Prog_01.webp' },
  { id: 'bbq', titleEn: 'BBQ Night', titleKo: 'BBQ Night', concept: '웨버 그릴과 함께하는 고품격 저녁', description: '최고급 웨버 바비큐 그릴과 불멍용 참나무 장작, 마시멜로 꼬치로 밤을 채우세요.', items: ['웨버 프리미엄 바비큐 그릴', '불멍용 참나무 장작 세트', '마시멜로 꼬치 제공'], info: { time: '17:00 ~ 21:00', type: '개별 유료 서비스' }, icon: <Utensils />, image: 'IMAGE/Play_Prog_02.webp' },
  { id: 'arcade', titleEn: 'Arcade & Games', titleKo: '보드게임 & 오락기', concept: '가족과 즐기는 아날로그 오락', description: '인기 보드게임부터 추억의 레트로 오락기까지 준비되어 있습니다.', items: ['인기 보드게임 대여', '레트로 멀티 오락기', '프라이빗 게임존'], info: { time: '상시 이용 가능', type: '일부 유료 이용' }, icon: <Gamepad2 />, image: 'IMAGE/Play_Prog_03.webp' },
  { id: 'cinema', titleEn: 'Private Cinema', titleKo: '프라이빗 시네마', concept: '숲속 영화관에서의 낭만', description: '대형 빔프로젝터와 스크린으로 우리 가족만의 영화관을 만들어 드립니다.', items: ['고화질 빔프로젝터 대여', '100인치 대형 스크린', '블루투스 사운드 시스템'], info: { time: '19:00 ~ 22:00', type: '사전 예약제' }, icon: <MonitorPlay />, image: 'IMAGE/Play_Prog_04.webp' },
  { id: 'karaoke', titleEn: 'Bus Karaoke', titleKo: '버스 노래방', concept: '이색 개조 버스 노래방', description: '실제 버스를 개조한 프라이빗 노래방에서 신나는 시간을 즐기세요.', items: ['프라이빗 단독 공간', '최신 가요 음원 완비', '90분 이용권 제공'], info: { time: '17:00 ~ 21:00', type: '90분 타임 예약제' }, icon: <Music />, image: 'IMAGE/Play_Prog_05.webp' },
  { id: 'daybbq', titleEn: 'Day Trip BBQ', titleKo: '당일치기 BBQ', concept: '숙박 없이 즐기는 캠핑 감성', description: '객실 투숙 없이 야외 테라스에서 바비큐만 즐기고 싶은 분들을 위한 서비스입니다.', items: ['4시간 테라스 대여', '바비큐 도구 세트 포함', '계곡 및 편의시설 이용'], info: { time: '12:00 ~ 16:00', type: '당일 전용 상품' }, icon: <Sun />, image: 'IMAGE/Play_Prog_06.webp' },
];

const ProgramBlock: React.FC<any> = ({ titleEn, titleKo, concept, description, items, info, icon, image }) => (
  <div className="py-20 md:py-32 border-b border-gray-50 last:border-none group/block">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
      <div className="lg:col-span-7 relative rounded-[2.5rem] overflow-hidden shadow-xl aspect-[16/10] bg-stone-100">
        <img src={image} alt={titleKo} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover/block:scale-110" />
        <div className="absolute top-4 left-4 md:top-10 md:left-10 bg-indigo-900 text-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-xl">
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
          <p className="text-2xl md:text-3xl font-bold text-indigo-950 serif leading-tight break-keep">{concept}</p>
          <p className="text-gray-500 leading-relaxed font-light break-keep text-sm md:text-base">{description}</p>
        </div>
        <div className="bg-stone-50 p-8 md:p-10 rounded-[2.5rem] border border-stone-100">
          <ul className="space-y-4">
            {items.map((item: string, idx: number) => (
              <li key={idx} className="flex items-center gap-3 text-xs md:text-sm font-semibold text-stone-700">
                <div className="w-1 h-1 bg-indigo-900 rounded-full" /> {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between text-[10px] md:text-[11px] font-bold text-stone-400">
            <span>{info.time}</span>
            <span className="text-indigo-900">{info.type}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ExpPlay: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-full bg-white selection:bg-indigo-900 selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gray-950 overflow-hidden">
        <div className="absolute inset-0">
          <img src="IMAGE/Exp_Hero_P.webp" className="w-full h-full object-cover opacity-30 scale-105" alt="Play & Dining" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="text-white/40 text-[10px] tracking-[0.5em] font-bold uppercase block mb-6 md:mb-8">Play & Dining</span>
          <h1 className="text-white text-4xl md:text-6xl font-bold serif tracking-tighter mb-6 md:mb-8">플레이 & 다이닝</h1>
          <p className="text-white/60 text-sm md:text-lg font-light tracking-widest max-w-xl mx-auto break-keep italic">"함께 즐기고, 저녁을 기억하게 만드는 시간"</p>
        </div>
      </section>

      {/* Sub Nav */}
      <nav className="sticky top-20 bg-white/95 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
          <div className="flex justify-start md:justify-center items-center min-w-max h-16 gap-8 md:gap-16">
            {EXP_NAV.map((nav) => (
              <Link key={nav.path} to={nav.path} className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all whitespace-nowrap border-b-2 py-5 ${location.pathname === nav.path ? 'border-indigo-900 text-indigo-950' : 'border-transparent text-gray-400 hover:text-indigo-800'}`}>{nav.name}</Link>
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
          <img src="IMAGE/Exp_Footer_P.webp" alt="BG" className="w-full h-full object-cover grayscale opacity-20 blur-sm" />
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
};

export default ExpPlay;