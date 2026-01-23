
import React, { useState, useEffect } from 'react';
import { 
  Waves, Mountain, Map, Bed, ThermometerSun, Baby, Utensils, Gamepad2, 
  MonitorPlay, Music, Sun, Crown, Tent, Coffee, QrCode, Users, Clock, 
  ChevronRight, MousePointerClick, Sparkles, ChevronDown, Droplets
} from 'lucide-react';

/**
 * [제작 가이드: 프로그램 이미지]
 * - 권장 해상도: 1200x800px (3:2 또는 4:3 비율)
 * - 특징: 'Heal & Comfort' 카테고리는 채도가 낮고 정적인 풍경 위주,
 *         'Play & Dining' 카테고리는 활동적이고 대비가 뚜렷한 이미지 위주 권장
 */
const CATEGORIES = [
  { id: 'heal', name: 'Heal & Comfort', label: '힐링 & 컴포트', desc: '아무 준비 없이 와도 충분히 편안한 휴식', theme: 'emerald' },
  { id: 'play', name: 'Play & Dining', label: '플레이 & 다이닝', desc: '함께 즐기고, 저녁을 기억하게 만드는 시간', theme: 'indigo' },
  { id: 'service', name: 'Stay Services', label: '스테이 서비스', desc: '머무는 방식을 더 유연하게', theme: 'amber' }
];

const PROGRAMS_DATA = {
  heal: [
    { id: 'spa', titleEn: 'Outdoor Hot Spa', titleKo: '온수 스파', concept: '사계절 내내 누리는 따스한 고요', description: '최고급 노천 스파 시스템으로 숲을 마주하며 쌓인 피로를 풀어보세요.', items: ['프라이빗 개별 테라스 스파', '최적의 온열 시스템', '프리미엄 입욕제 제공'], info: { time: '입실 후 ~ 22:00', type: '객실별 유료 옵션' }, icon: <Waves />, images: ['https://images.unsplash.com/photo-1544161515-4af6b1d462c2?q=80&w=1200'] },
    { id: 'pool', titleEn: 'Groundwater Pool', titleKo: '야외 수영장', concept: '지하 200m 암반수의 청량함', description: '천연 암반수를 사용하여 계곡의 시원함을 그대로 담은 대형 야외 수영장입니다.', items: ['지하 200m 천연 암반수', '7M 대형 아웃도어 풀', '여름 시즌 전용 운영'], info: { time: '10:00 ~ 18:00', type: '투숙객 무료 개방' }, icon: <Droplets />, images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200'] },
    { id: 'valley', titleEn: 'Natural Valley', titleKo: '자연 계곡 이용', concept: '숙소 바로 앞, 1급수의 시원함', description: '테라스 527 입구 바로 앞 청정 계곡. 자연의 소리를 들으며 물놀이를 즐기세요.', items: ['입구 맞은편 도보 1분', '사계절 맑은 1급수 계곡', '자연 그늘막 완비'], info: { time: '상시 이용 가능', type: '자연 무료 이용' }, icon: <Mountain />, images: ['https://images.unsplash.com/photo-1434725039720-bbdb6cd754e4?q=80&w=1200'] },
    { id: 'nature', titleEn: 'Lake Walk', titleKo: '호수 산책', concept: '물안개 피는 새벽의 고요한 산책', description: '도보 5분 거리의 산정호수 둘레길. 사계절의 변화를 가장 가까이서 느껴보세요.', items: ['산정호수 둘레길 인접', '포토스팟 가이드 제공', '조식 전 아침 산책 추천'], info: { time: '일출 ~ 일몰 추천', type: '자연 무료 이용' }, icon: <Map />, images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200'] },
    { id: 'bedding', titleEn: 'Premium Bedding', titleKo: '고급 침구 & 어메니티', concept: '호텔의 안락함을 자연 속으로', description: '최고급 구스 침구와 친환경 어메니티로 완벽한 숙면을 제공합니다.', items: ['프리미엄 구스 이불', '고체 어메니티 세트', '매일 살균 세탁 시스템'], info: { time: '입실 시 비치', type: '전 객실 기본 제공' }, icon: <Bed />, images: ['https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=1200'] },
    { id: 'heating', titleEn: 'Winter Heating', titleKo: '겨울철 난방 완비', concept: '한겨울에도 훈훈한 글램핑', description: '바닥 난방과 온풍기, 등유 난로까지 3중 난방 시스템으로 겨울 캠핑 걱정 없습니다.', items: ['전 객실 바닥 난방', '에어컨/온풍기 겸용', '등유 난로 대여 가능'], info: { time: '사계절 상시', type: '전 객실 기본 완비' }, icon: <ThermometerSun />, images: ['https://images.unsplash.com/photo-1518331193919-20ae743322a9?q=80&w=1200'] },
  ],
  play: [
    { id: 'kidszone', titleEn: 'Kids Zone', titleKo: '키즈존', concept: '모험과 안전이 공존하는 놀이터', description: '실내 정글짐과 야외 모래놀이터가 완비된 아이들을 위한 특별한 놀이 공간입니다.', items: ['실내 안전 정글짐 완비', '야외 모래놀이 구역', '어린이 도서 코너'], info: { time: '10:00 ~ 20:00', type: '투숙객 무료 개방' }, icon: <Baby />, images: ['https://images.unsplash.com/photo-1566411520896-01e7ca4726af?q=80&w=1200'] },
    { id: 'bbq', titleEn: 'BBQ Night', titleKo: 'BBQ Night', concept: '웨버 그릴과 함께하는 고품격 저녁', description: '최고급 웨버 바비큐 그릴과 불멍용 참나무 장작, 마시멜로 꼬치로 밤을 채우세요.', items: ['웨버 프리미엄 바비큐 그릴', '불멍용 참나무 장작 세트', '마시멜로 꼬치 제공'], info: { time: '17:00 ~ 21:00', type: '개별 유료 서비스' }, icon: <Utensils />, images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200'] },
    { id: 'arcade', titleEn: 'Arcade & Games', titleKo: '보드게임 & 오락기', concept: '가족과 즐기는 아날로그 오락', description: '인기 보드게임부터 추억의 레트로 오락기까지 준비되어 있습니다.', items: ['인기 보드게임 대여', '레트로 멀티 오락기', '프라이빗 게임존'], info: { time: '상시 이용 가능', type: '일부 유료 이용' }, icon: <Gamepad2 />, images: ['https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1200'] },
    { id: 'cinema', titleEn: 'Private Cinema', titleKo: '프라이빗 시네마', concept: '숲속 영화관에서의 낭만', description: '대형 빔프로젝터와 스크린으로 우리 가족만의 영화관을 만들어 드립니다.', items: ['고화질 빔프로젝터 대여', '100인치 대형 스크린', '블루투스 사운드 시스템'], info: { time: '19:00 ~ 22:00', type: '사전 예약제' }, icon: <MonitorPlay />, images: ['https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200'] },
    { id: 'karaoke', titleEn: 'Bus Karaoke', titleKo: '버스 노래방', concept: '이색 개조 버스 노래방', description: '실제 버스를 개조한 프라이빗 노래방에서 신나는 시간을 즐기세요.', items: ['프라이빗 단독 공간', '최신 가요 음원 완비', '90분 이용권 제공'], info: { time: '17:00 ~ 21:00', type: '90분 타임 예약제' }, icon: <Music />, images: ['https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=1200'] },
    { id: 'daybbq', titleEn: 'Day Trip BBQ', titleKo: '당일치기 BBQ', concept: '숙박 없이 즐기는 캠핑 감성', description: '객실 투숙 없이 야외 테라스에서 바비큐만 즐기고 싶은 분들을 위한 서비스입니다.', items: ['4시간 테라스 대여', '바비큐 도구 세트 포함', '계곡 및 편의시설 이용'], info: { time: '12:00 ~ 16:00', type: '당일 전용 상품' }, icon: <Sun />, images: ['https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200'] },
  ],
  service: [
    { id: 'revisit', titleEn: 'Re-visit Benefit', titleKo: '재방문 혜택', concept: '다시 찾아주신 소중한 분들을 위한 예우', description: '테라스 527을 다시 찾아주시는 고객님께 특별한 혜택을 드립니다.', items: ['재방문 시 숙박료 할인', '웰컴 드링크 서비스', '우선 예약 권한 부여'], info: { time: '상시 적용', type: '재방문 한정 혜택' }, icon: <Crown />, images: ['https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200'] },
    { id: 'longstay', titleEn: 'Camping Site', titleKo: '장박용 캠핑 사이트', concept: '나만의 아지트를 산정호수에', description: '캠핑 장비를 두고 여유롭게 산정호수를 즐길 수 있는 장박 전용 사이트입니다.', items: ['여유로운 사이트 공간', '전용 배전함 및 수도', '장기 계약 특별가'], info: { time: '시즌 협의', type: '장박 전용 상품' }, icon: <Tent />, images: ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200'] },
    { id: 'lounge', titleEn: '24H Lounge', titleKo: '24시 라운지', concept: '한강 라면 기기와 함께하는 휴게 공간', description: '언제든 열려있는 휴게 공간입니다.', items: ['한강 즉석 라면 기기 완비', '프리미엄 캡슐 커피 머신', '24시간 무인 운영'], info: { time: '24시간 운영', type: '자유 이용/유료 구매' }, icon: <Coffee />, images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200'] },
    { id: 'smartorder', titleEn: 'Smart Order', titleKo: '스마트 오더', concept: '문 앞까지 배달되는 편리함', description: '객실 내 QR코드로 바비큐 세트부터 소모품까지 비대면 주문하세요.', items: ['전 객실 QR 주문 시스템', '비대면 문앞 배송', '실시간 주문 현황 확인'], info: { time: '10:00 ~ 21:00', type: '투숙객 전용 서비스' }, icon: <QrCode />, images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200'] },
    { id: 'seminar', titleEn: 'Corporate Group', titleKo: '기업 및 단체 대관', concept: '비즈니스와 휴식의 완벽한 밸런스', description: '단체 고객을 위한 전체 대관과 맞춤형 워크숍 프로그램을 지원합니다.', items: ['전체 객실 일괄 대관', '대형 세미나 공간 지원', '단체 바비큐 패키지'], info: { time: '사전 협의', type: '단체 전용 서비스' }, icon: <Users />, images: ['https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200'] },
    { id: 'flexcheck', titleEn: 'Late Check-out', titleKo: '레이트 체크아웃', concept: '일정에 맞춘 유연한 머무름의 확장', description: '조금 더 늦게 떠나고 싶을 때 이용하세요.', items: ['최대 14:00까지 연장', '당일 상황에 따라 신청', '시간당 추가 요금 발생'], info: { time: '퇴실 당일 신청', type: '유료 옵션' }, icon: <Clock />, images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200'] },
  ]
};

const ProgramBlock: React.FC<any> = ({ id, titleEn, titleKo, concept, description, items, info, icon, images, themeColor }) => {
  const colorClass = themeColor === 'emerald' ? 'bg-emerald-900' : themeColor === 'indigo' ? 'bg-indigo-900' : 'bg-amber-900';
  const textClass = themeColor === 'emerald' ? 'text-emerald-950' : themeColor === 'indigo' ? 'text-indigo-950' : 'text-amber-950';

  return (
    <div id={id} className="py-24 md:py-40 border-b border-gray-50 last:border-none scroll-mt-[176px] group/block">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 relative rounded-[3.5rem] overflow-hidden shadow-2xl aspect-[16/10] bg-gray-100">
            <img src={images[0]} alt={titleKo} className="w-full h-full object-cover transition-all duration-1000 group-hover/block:scale-110" />
            <div className={`absolute top-10 left-10 ${colorClass} text-white p-6 rounded-[2rem] shadow-xl`}>
              {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-10 left-10 text-white">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-70 mb-2 block">{titleEn}</span>
              <h3 className="text-4xl font-bold serif">{titleKo}</h3>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <p className={`text-3xl font-bold ${textClass} serif leading-tight break-keep`}>{concept}</p>
              <p className="text-gray-500 leading-relaxed font-light break-keep">{description}</p>
            </div>
            
            <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
              <ul className="space-y-5">
                {items.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-4 text-sm font-semibold text-gray-700">
                    <div className={`w-1.5 h-1.5 ${colorClass} rounded-full`} /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between text-[11px] font-bold text-gray-400">
                <span>{info.time}</span>
                <span className={textClass}>{info.type}</span>
              </div>
            </div>

            <button onClick={() => window.location.href='#/booking'} className={`w-full flex items-center justify-center gap-4 ${colorClass} text-white py-6 rounded-[1.5rem] text-[11px] font-bold tracking-[0.4em] hover:brightness-110 transition-all uppercase shadow-xl`}>
              Booking Now <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('heal');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id.replace('section-', ''));
          }
        });
      },
      { threshold: 0.1, rootMargin: "-176px 0px -60% 0px" }
    );

    CATEGORIES.forEach((cat) => {
      const el = document.getElementById(`section-${cat.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string, offset = 176) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const getThemeColors = (id: string) => {
    const cat = CATEGORIES.find(c => c.id === id);
    if (cat?.theme === 'emerald') return { text: 'text-emerald-950', bg: 'bg-emerald-900', border: 'border-emerald-900', lightBg: 'bg-emerald-50' };
    if (cat?.theme === 'indigo') return { text: 'text-indigo-950', bg: 'bg-indigo-900', border: 'border-indigo-900', lightBg: 'bg-indigo-50' };
    return { text: 'text-amber-950', bg: 'bg-amber-900', border: 'border-amber-900', lightBg: 'bg-amber-50' };
  };

  return (
    <div className="w-full bg-white pb-40 relative">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gray-950 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2000" className="w-full h-full object-cover opacity-30 scale-105" alt="Experience" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="text-white/40 text-[11px] tracking-[0.6em] font-bold uppercase block mb-8">Premium Stay Program</span>
          <h1 className="text-white text-3xl md:text-5xl font-bold serif tracking-tighter mb-8 leading-none">
            EXPERIENCE
          </h1>
          <p className="text-white/60 text-base md:text-xl font-light tracking-widest max-w-xl mx-auto break-keep leading-relaxed italic">
            "머무름을 넘어선, 당신의 모든 감각이 깨어나는 예술적 휴식"
          </p>
        </div>
      </section>

      {/* Persistent Navigator Bar */}
      <div 
        className="sticky top-20 z-[60] h-24 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="max-w-7xl mx-auto px-6 h-full relative flex items-center justify-center">
          <nav className="flex items-center gap-12 lg:gap-32 h-full">
            {CATEGORIES.map(cat => (
              <div 
                key={cat.id} 
                className="h-full flex items-center"
                onMouseEnter={() => setHoveredCategory(cat.id)}
              >
                <button 
                  onClick={() => scrollToSection(`section-${cat.id}`, 176)}
                  className={`flex items-center gap-2 transition-all duration-300 py-4 h-full border-b-2 relative ${
                    activeCategory === cat.id 
                    ? `${getThemeColors(cat.id).text} ${getThemeColors(cat.id).border}` 
                    : 'text-gray-300 border-transparent hover:text-gray-500'
                  }`}
                >
                  <span className="text-[12px] font-bold uppercase tracking-[0.4em]">{cat.name}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredCategory === cat.id ? 'rotate-180' : ''}`} />
                </button>
              </div>
            ))}
          </nav>

          <div 
            className={`absolute top-full left-6 right-6 transition-all duration-300 pointer-events-none ${
              hoveredCategory ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-4 invisible'
            }`}
          >
            <div className="bg-white border border-gray-100 shadow-[0_40px_80px_rgba(0,0,0,0.12)] rounded-b-[3.5rem] p-12 overflow-hidden mx-auto w-full">
              {CATEGORIES.map(cat => (
                <div 
                  key={cat.id} 
                  className={`transition-all duration-500 ${hoveredCategory === cat.id ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-4'}`}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {PROGRAMS_DATA[cat.id as keyof typeof PROGRAMS_DATA].map(prog => (
                      <button 
                        key={prog.id}
                        onClick={() => {
                          scrollToSection(prog.id, 176);
                          setHoveredCategory(null);
                        }}
                        className="group/item flex flex-col items-center gap-6 p-4 hover:bg-gray-50 rounded-[2.5rem] transition-all text-center"
                      >
                        <div className={`w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center transition-all ${getThemeColors(cat.id).lightBg} ${getThemeColors(cat.id).text} group-hover/item:scale-110 shadow-sm shrink-0`}>
                          {React.cloneElement(prog.icon as React.ReactElement<any>, { size: 22 })}
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[11px] font-bold text-gray-900 tracking-tighter whitespace-nowrap mb-1 leading-none">
                            {prog.titleKo}
                          </span>
                          <span className="text-[9px] text-gray-400 font-medium tracking-tight whitespace-nowrap opacity-60 uppercase">
                            {prog.titleEn}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-0 relative">
        {CATEGORIES.map(cat => (
          <section key={cat.id} id={`section-${cat.id}`} className="scroll-mt-[176px]">
            <div className={`py-48 text-center ${getThemeColors(cat.id).lightBg} relative overflow-hidden`}>
               <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
               <div className="inline-flex items-center gap-2 mb-10 bg-white px-8 py-3 rounded-full border border-gray-100 shadow-sm">
                 <Sparkles size={16} className={getThemeColors(cat.id).text} />
                 <span className={`text-[12px] font-bold ${getThemeColors(cat.id).text} uppercase tracking-widest`}>{cat.label}</span>
               </div>
               <h2 className={`text-5xl md:text-7xl font-bold serif ${getThemeColors(cat.id).text} mb-10 tracking-tighter`}>
                 {cat.label}
               </h2>
               <p className="text-gray-400 text-xl md:text-2xl font-light tracking-wide max-w-3xl mx-auto break-keep leading-relaxed italic px-6 opacity-70">
                 "{cat.desc}"
               </p>
               <div className={`w-24 h-1 ${getThemeColors(cat.id).bg} mx-auto mt-20 opacity-10`} />
            </div>

            <div className="bg-white">
              {PROGRAMS_DATA[cat.id as keyof typeof PROGRAMS_DATA].map(prog => (
                <ProgramBlock key={prog.id} {...prog} themeColor={cat.theme} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="py-64 bg-gray-950 text-center text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 space-y-16 relative z-10">
          <div className="inline-block border border-white/20 px-8 py-2 rounded-full text-[11px] tracking-[0.4em] uppercase font-bold text-white/40">The Art of Stay</div>
          <h2 className="text-5xl md:text-7xl font-bold serif leading-none tracking-tighter">
            완벽한 하루의<br />마지막 조각
          </h2>
          <p className="text-white/40 text-lg md:text-2xl leading-relaxed font-light tracking-wide max-w-4xl mx-auto break-keep">
            테라스 527의 모든 프로그램은 단순한 서비스를 넘어 당신의 평온한 시간을 위한 예술적인 설계입니다.
          </p>
          <div className="pt-10">
            <button onClick={() => window.location.href='#/booking'} className="inline-flex items-center gap-8 bg-white text-gray-950 px-24 py-8 rounded-full font-bold text-[14px] tracking-[0.5em] hover:bg-emerald-900 hover:text-white transition-all uppercase shadow-2xl scale-110">
              RESERVE YOUR EXPERIENCE <MousePointerClick size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
