import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Car, 
  Trees, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Zap,
  Coffee,
  Bed,
  Droplets
} from 'lucide-react';

const HERO_IMAGES = [
  'IMAGE/Hero_01.webp', 
  'IMAGE/Hero_02.webp', 
  'IMAGE/Hero_03.webp', 
  'IMAGE/Hero_04.webp', 
  'IMAGE/Hero_05.webp'
];

// 테라스 527 실제 주소: 경기도 포천시 영북면 산정호수로 529
const TERRACE_527_COORDS = { lat: 38.0571123, lng: 127.3217751 };

const EXPERIENCE_ITEMS = [
  {
    badge: "Exclusive Package",
    titleKo: "개별 온수 스파",
    description: "프라이빗한 노천 스파에서 즐기는 따뜻한 휴식. 계절의 온도를 피부로 느끼며 쌓인 피로를 씻어냅니다.",
    image: "IMAGE/Home_Exp_01.webp",
    link: "/experience/heal"
  },
  {
    badge: "Water Play",
    titleKo: "천연 암반수 풀",
    description: "지하 250m 천연 암반수를 사용한 대형 수영장. 화학 약품 없는 깨끗한 물에서 안심하고 즐기세요.",
    image: "IMAGE/Home_Exp_02.webp",
    link: "/experience/heal"
  },
  {
    badge: "Nature Walk",
    titleKo: "산정호수 산책",
    description: "도보 5분 거리의 산정호수 둘레길. 물안개 피는 새벽의 고요함과 사계절의 변화를 가장 가까이서 마주하세요.",
    image: "IMAGE/Home_Exp_03.webp",
    link: "/experience/heal"
  },
  {
    badge: "Summer Vibe",
    titleKo: "자연 계곡 이용",
    description: "숙소 바로 앞 청정 1급수 계곡. 시원한 물소리를 배경으로 발끝에 닿는 자연의 온도를 느껴보세요.",
    image: "IMAGE/Home_Exp_04.webp",
    link: "/experience/heal"
  },
  {
    badge: "Convenience",
    titleKo: "스마트 오더",
    description: "객실 내 태블릿과 QR 코드를 통한 비대면 주문 시스템. 바베큐 세트부터 소모품까지 문 앞까지 배달됩니다.",
    image: "IMAGE/Home_Exp_05.webp",
    link: "/experience/service"
  }
];

const CARD_WIDTH = 320;
const CARD_GAP = 32;
const EXP_STEP = CARD_WIDTH + CARD_GAP;
const EXP_SET_SIZE = 5;
const EXP_REPEAT = 5;
const EXP_MIDDLE_START = EXP_STEP * EXP_SET_SIZE;

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mapStatus, setMapStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [experienceIndex, setExperienceIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const isMapInitialized = useRef(false);
  const expScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  const prevSlide = () => setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

  // 지도가 초기화된 후에도 계속 유지되도록 보장
  useEffect(() => {
    if (mapStatus === 'success' && mapInstance.current && (window as any).naver) {
      // 주기적으로 지도가 여전히 존재하는지 확인하고 필요시 resize
      const checkInterval = setInterval(() => {
        if (mapInstance.current && mapElement.current && mapElement.current.offsetWidth > 0) {
          try {
            (window as any).naver.maps.Event.trigger(mapInstance.current, 'resize');
          } catch (e) {
            // 무시
          }
        }
      }, 2000);

      return () => clearInterval(checkInterval);
    }
  }, [mapStatus]);

  useEffect(() => {
    const loadNaverMapScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        // 이미 스크립트가 로드되어 있는지 확인
        if ((window as any).naver && (window as any).naver.maps) {
          resolve();
          return;
        }

        // 이미 스크립트 태그가 있는지 확인
        const existingScript = document.querySelector('script[src*="oapi.map.naver.com"]');
        if (existingScript) {
          // 스크립트가 로드 중이면 기다림
          const checkLoaded = setInterval(() => {
            if ((window as any).naver && (window as any).naver.maps) {
              clearInterval(checkLoaded);
              resolve();
            }
          }, 100);

          // 타임아웃 설정
          setTimeout(() => {
            clearInterval(checkLoaded);
            if (!(window as any).naver || !(window as any).naver.maps) {
              reject(new Error('네이버 지도 API 로드 타임아웃'));
            }
          }, 10000);
          return;
        }

        // 스크립트 동적 로드
        const clientId = (import.meta.env.VITE_NAVER_MAP_CLIENT_ID || import.meta.env.NAVER_MAP_CLIENT_ID || 'fbpx62bug8').trim();
        
        if (!clientId || clientId === '') {
          reject(new Error('네이버 지도 API Client ID가 설정되지 않았습니다. .env 파일에 VITE_NAVER_MAP_CLIENT_ID를 설정해주세요.'));
          return;
        }
        
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
        script.async = true;
        
        script.onload = () => {
          // 스크립트 로드 후 naver 객체가 준비될 때까지 대기
          const checkNaver = setInterval(() => {
            if ((window as any).naver && (window as any).naver.maps) {
              clearInterval(checkNaver);
              resolve();
            }
          }, 100);

          // 타임아웃 설정
          setTimeout(() => {
            clearInterval(checkNaver);
            if (!(window as any).naver || !(window as any).naver.maps) {
              reject(new Error('네이버 지도 API 초기화 실패'));
            }
          }, 5000);
        };

        script.onerror = (error) => {
          console.error('네이버 지도 API 스크립트 로드 실패:', error);
          reject(new Error('네이버 지도 API 스크립트 로드 실패. Client ID와 서비스 URL 설정을 확인해주세요.'));
        };

        document.head.appendChild(script);
      });
    };

    const initMap = () => {
      if (isMapInitialized.current || !mapElement.current) return;
      
      // 지도 컨테이너가 완전히 렌더링될 때까지 대기
      const checkContainer = setInterval(() => {
        if (mapElement.current && mapElement.current.offsetWidth > 0 && mapElement.current.offsetHeight > 0) {
          clearInterval(checkContainer);
          
          try {
            const naver = (window as any).naver;
            if (naver && naver.maps && mapElement.current) {
              // 네이버 지도 가이드 예제 패턴 적용 - 테라스 527 실제 주소 좌표
              const position = new naver.maps.LatLng(TERRACE_527_COORDS.lat, TERRACE_527_COORDS.lng);

              const map = new naver.maps.Map(mapElement.current, {
                center: position,
                zoom: 15
              });

              const marker = new naver.maps.Marker({
                position: position,
                map: map
              });

              mapInstance.current = map;
              isMapInitialized.current = true;
              setMapStatus('success');

              // 지도 렌더 후 resize 트리거 (React 컨테이너 대응)
              const triggerResize = () => {
                if (mapInstance.current) {
                  try {
                    naver.maps.Event.trigger(mapInstance.current, 'resize');
                  } catch (_e) {}
                }
              };
              setTimeout(triggerResize, 100);
              setTimeout(triggerResize, 500);
            } else {
              setMapStatus('error');
            }
          } catch (e: any) {
            console.error('지도 초기화 오류:', e);
            // 인증 오류인 경우 더 명확한 메시지
            if (e && (e.message?.includes('인증') || e.message?.includes('Client ID'))) {
              console.error('⚠️ 네이버 지도 API 인증 실패:', e.message);
              console.error('💡 해결 방법:');
              console.error('   1. 네이버 클라우드 플랫폼에서 서비스 URL 등록 확인');
              console.error('   2. .env.local 파일에 VITE_NAVER_MAP_CLIENT_ID 설정 확인');
              console.error('   3. NAVER_MAP_API_SETUP.md 파일 참고');
            }
            setMapStatus('error');
          }
        }
      }, 50);
      
      // 타임아웃 설정
      setTimeout(() => {
        clearInterval(checkContainer);
        if (!isMapInitialized.current) {
          setMapStatus('error');
        }
      }, 5000);
    };

    // 지도 초기화 시도
    let isMounted = true;
    let resizeObserver: ResizeObserver | null = null;
    
    loadNaverMapScript()
      .then(() => {
        if (isMounted) {
          // 지도 컨테이너가 완전히 마운트될 때까지 약간의 지연
          setTimeout(() => {
            if (isMounted) {
              initMap();
              
              // ResizeObserver로 컨테이너 크기 변경 감지
              if (mapElement.current && (window as any).naver && (window as any).naver.maps) {
                resizeObserver = new ResizeObserver(() => {
                  if (mapInstance.current && isMapInitialized.current) {
                    // 지도 크기 재조정
                    setTimeout(() => {
                      if (mapInstance.current) {
                        (window as any).naver.maps.Event.trigger(mapInstance.current, 'resize');
                      }
                    }, 100);
                  }
                });
                resizeObserver.observe(mapElement.current);
              }
            }
          }, 300);
        }
      })
      .catch((error) => {
        console.error('네이버 지도 API 로드 오류:', error);
        if (isMounted) {
          setMapStatus('error');
        }
      });

    // 안전 타임아웃
    const safetyTimeout = setTimeout(() => {
      if (isMounted && !isMapInitialized.current) {
        setMapStatus('error');
      }
    }, 10000);

    return () => {
      isMounted = false;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      clearTimeout(safetyTimeout);
    };
  }, []);

  const openNaverMap = () => {
    window.open("https://naver.me/GtU3YEII", "_blank", "noopener,noreferrer");
  };

  const scrollExperience = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const amount = direction === 'right' ? EXP_STEP : -EXP_STEP;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const setInitialScroll = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = EXP_MIDDLE_START;
      }
    };
    setInitialScroll();
    const t = setTimeout(setInitialScroll, 100);
    return () => clearTimeout(t);
  }, []);

  const handleExperienceScroll = () => {
    if (expScrollTimeoutRef.current) clearTimeout(expScrollTimeoutRef.current);
    expScrollTimeoutRef.current = setTimeout(() => {
      const el = scrollContainerRef.current;
      if (!el) return;
      const cardIndex = Math.round(el.scrollLeft / EXP_STEP);
      setExperienceIndex((cardIndex % EXP_SET_SIZE + EXP_SET_SIZE) % EXP_SET_SIZE);
      expScrollTimeoutRef.current = null;
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (expScrollTimeoutRef.current) clearTimeout(expScrollTimeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full bg-stone-50 text-stone-800 antialiased selection:bg-emerald-900 selection:text-white">
      
      {/* Hero Section */}
      <header className="relative w-full h-screen overflow-hidden group">
        <div className="absolute inset-0 w-full h-full">
          {HERO_IMAGES.map((img, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear scale-110 group-hover:scale-100" />
            </div>
          ))}
          <div className="absolute inset-0 bg-stone-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-stone-900/60"></div>
        </div>
        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white/50 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 hidden md:block"><ChevronLeft size={32} strokeWidth={1} /></button>
        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white/50 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 hidden md:block"><ChevronRight size={32} strokeWidth={1} /></button>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="inline-block py-1 px-3 mb-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-[10px] tracking-[0.4em] font-bold uppercase animate-in fade-in slide-in-from-top-4 duration-1000">Premium Glamping & Stay</span>
          <h1 className="text-white serif tracking-tight leading-tight mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 flex flex-col items-center">
            <span className="text-lg md:text-2xl lg:text-3xl font-light mb-4 opacity-90 tracking-[0.2em]">자연이 일상이 되는 곳</span>
            <span className="text-5xl md:text-7xl lg:text-8xl font-normal italic tracking-tighter">산정호수, 테라스 527</span>
          </h1>
          <Link to="/booking" className="inline-flex items-center gap-12 bg-white text-stone-900 px-12 py-5 rounded-full font-bold text-[11px] tracking-[0.4em] hover:bg-emerald-900 hover:text-white transition-all shadow-2xl uppercase group">RESERVE NOW <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" /></Link>
        </div>
      </header>

      {/* Brand Story Section */}
      <section id="philosophy" className="py-24 md:py-32 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl aspect-[4/5] md:aspect-auto md:h-[650px]">
              <img src="IMAGE/Home_Story.webp" alt="Sanjeong Lake" className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" />
              <div className="absolute right-0 bottom-0 bg-emerald-950/10 mix-blend-multiply opacity-20"></div>
            </div>
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-xs font-bold tracking-[0.4em] text-emerald-900 uppercase">Brand Story</span>
                <h2 className="text-3xl md:text-5xl font-normal serif text-stone-900 tracking-tight leading-snug break-keep">산정호수를 닮은 <br /> 숲과 물의 조화</h2>
                <p className="text-stone-600 font-light leading-relaxed text-base md:text-lg break-keep italic">"지하수 풀과 천연 계곡, 소나무 숲의 피톤치드가 자연의 리듬을 채웁니다. 전객실 냉난방과 프리미엄 침구로, 자연 속에서도 편안하게 쉬어가세요."</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 pt-10 border-t border-stone-200">
                <div className="flex flex-col gap-3 group">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition-all"><Droplets size={20} /></div>
                  <div><h4 className="text-sm md:text-base text-stone-900 font-bold tracking-tight">지하 200m 암반수 공급</h4><p className="text-[11px] text-stone-400 mt-1 leading-relaxed">깨끗한 미네랄 지하수 풀과 <br/>천연 계곡 이용</p></div>
                </div>
                <div className="flex flex-col gap-3 group">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition-all"><Zap size={20} /></div>
                  <div><h4 className="text-sm md:text-base text-stone-900 font-bold tracking-tight">사계절 냉난방 완비</h4><p className="text-[11px] text-stone-400 mt-1 leading-relaxed">글램핑과 스테이 전 객실 <br/>쾌적한 온도 유지</p></div>
                </div>
                <div className="flex flex-col gap-3 group">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition-all"><Bed size={20} /></div>
                  <div><h4 className="text-sm md:text-base text-stone-900 font-bold tracking-tight">프리미엄 침구 & 어메니티</h4><p className="text-[11px] text-stone-400 mt-1 leading-relaxed">호텔식 살균 침구와 <br/>친환경 어메니티 패키지</p></div>
                </div>
                <div className="flex flex-col gap-3 group">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition-all"><Coffee size={20} /></div>
                  <div><h4 className="text-sm md:text-base text-stone-900 font-bold tracking-tight">스마트 오더 시스템</h4><p className="text-[11px] text-stone-400 mt-1 leading-relaxed">객실 내 QR코드로 즐기는 <br/>편리한 비대면 서비스</p></div>
                </div>
              </div>
              <Link to="/story" className="inline-flex items-center gap-4 text-emerald-900 font-bold tracking-[0.2em] text-[11px] uppercase group">EXPLORE OUR STORY <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Room Collection Section */}
      <section id="rooms" className="py-24 md:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
              <span className="text-xs font-medium tracking-[0.5em] text-emerald-900 uppercase mb-3 block">Room Collection</span>
              <h2 className="text-4xl md:text-5xl font-normal serif text-stone-900 tracking-tight">머무름의 미학</h2>
            </div>
            <p className="text-sm md:text-base text-stone-500 font-light max-w-sm text-left md:text-right break-keep leading-relaxed animate-in fade-in slide-in-from-right-8 duration-700">
              숲을 닮은 글램핑과 모던한 스테이, <br />
              당신의 취향이 머무는 가장 완벽한 공간을 선택하세요.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-0">
            {/* Staggered Item 1 */}
            <div className="md:translate-y-0">
              <Link to="/rooms/signature-glamping" className="group cursor-pointer block">
                <div className="relative overflow-hidden bg-stone-100 aspect-[4/3] mb-8 rounded-[2.5rem] shadow-xl">
                  <img src="IMAGE/Room_SG_01.webp" alt="Signature Glamping" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase shadow-lg text-emerald-900">Signature Line</div>
                </div>
                <div className="flex justify-between items-center px-4">
                  <div>
                    <h3 className="text-2xl font-medium serif text-stone-900 mb-2 group-hover:text-emerald-900 transition-colors">Signature Glamping</h3>
                    <p className="text-[11px] text-stone-400 font-bold tracking-[0.2em] uppercase">Private Deck • Forest View • Premium BBQ</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-emerald-900 group-hover:text-white transition-all"><ArrowRight size={20} strokeWidth={1} /></div>
                </div>
              </Link>
            </div>

            {/* Staggered Item 2 */}
            <div className="md:translate-y-24">
              <Link to="/rooms/classic-stay" className="group cursor-pointer block">
                <div className="relative overflow-hidden bg-stone-100 aspect-[4/3] mb-8 rounded-[2.5rem] shadow-xl">
                  <img src="IMAGE/Room_CS_01.webp" alt="Classic Stay" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase shadow-lg text-emerald-900">Classic Stay</div>
                </div>
                <div className="flex justify-between items-center px-4">
                  <div>
                    <h3 className="text-2xl font-medium serif text-stone-900 mb-2 group-hover:text-emerald-900 transition-colors">Classic Stay</h3>
                    <p className="text-[11px] text-stone-400 font-bold tracking-[0.2em] uppercase">Modern Interior • Family Room • Full Kitchen</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-emerald-900 group-hover:text-white transition-all"><ArrowRight size={20} strokeWidth={1} /></div>
                </div>
              </Link>
            </div>
          </div>
          <div className="md:h-48 h-0"></div>
        </div>
      </section>

      {/* Experience Highlights Section */}
      <section id="experience" className="py-32 bg-[#121416] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row justify-between items-center gap-8 relative">
          <div className="text-center md:text-left flex-grow">
            <span className="text-[10px] font-bold tracking-[0.5em] text-stone-500 uppercase mb-4 block">EXPERIENCE</span>
            <h2 className="text-4xl md:text-6xl font-normal serif text-[#f5f2e8] tracking-tight mb-6">감각의 회복</h2>
          </div>
          <div className="flex gap-4">
            <button onClick={() => scrollExperience('left')} className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-lg"><ChevronLeft size={20} strokeWidth={1.5} /></button>
            <button onClick={() => scrollExperience('right')} className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-lg"><ChevronRight size={20} strokeWidth={1.5} /></button>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          onScroll={handleExperienceScroll}
          className="w-full overflow-x-auto scrollbar-hide scroll-smooth pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
        >
          <div className="flex gap-8 pb-4 min-w-max pr-6 md:pr-12" style={{ gap: CARD_GAP }}>
            {Array.from({ length: EXP_REPEAT }).map((_, setIdx) =>
              EXPERIENCE_ITEMS.map((item, idx) => (
                <Link
                  key={`exp-${setIdx}-${idx}`}
                  to={item.link}
                  className="group flex flex-col shrink-0"
                  style={{ width: CARD_WIDTH }}
                >
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
                    <img src={item.image} alt={item.titleKo} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute top-6 left-6"><span className="bg-[#f5f2e8]/90 text-[9px] font-bold tracking-[0.2em] text-gray-900 px-4 py-1.5 rounded-full uppercase">{item.badge}</span></div>
                  </div>
                  <div className="px-2"><h3 className="text-xl font-bold serif text-[#f5f2e8] mb-3">{item.titleKo}</h3><p className="text-stone-500 text-xs font-light leading-relaxed break-keep">{item.description}</p></div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative h-80 md:h-[500px] w-full">
            <div className={`w-full h-full relative overflow-hidden rounded-[2.5rem] border border-stone-100 shadow-2xl transition-all duration-700 bg-stone-50 ${mapStatus === 'error' ? 'cursor-pointer group/map' : ''}`} onClick={mapStatus === 'error' ? openNaverMap : undefined}>
              <div 
                ref={mapElement} 
                className={`w-full h-full absolute inset-0 ${mapStatus === 'success' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                style={{ 
                  minHeight: '100%', 
                  minWidth: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}
              />
              {mapStatus === 'error' && (
                <div className="absolute inset-0 bg-[#e3e8e1] flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500 overflow-hidden">
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#064e3b 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10 space-y-6 max-w-md">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl text-emerald-900 group-hover/map:scale-110 transition-transform"><MapPin size={40} /></div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold text-stone-900 serif">산정호수, 테라스 527</h4>
                      <p className="text-xs text-stone-500 font-medium">경기도 포천시 영북면 산정호수로 529</p>
                      <p className="text-sm text-stone-500 font-light leading-relaxed break-keep">지도가 표시되지 않을 경우 클릭해 주세요.<br/>네이버 맵에서 위치를 직접 확인하실 수 있습니다.</p>
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs text-yellow-800 font-medium">💡 인증 오류가 발생한 경우:</p>
                        <p className="text-xs text-yellow-700 mt-1 leading-relaxed">네이버 클라우드 플랫폼에서 서비스 URL을 등록했는지 확인해주세요. 자세한 설정 방법은 NAVER_MAP_API_SETUP.md 파일을 참고하세요.</p>
                      </div>
                    </div>
                    <div className="bg-emerald-900 text-white px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] flex items-center gap-2 mx-auto shadow-lg hover:bg-stone-900 transition-colors">NAVER MAP OPEN <ExternalLink size={14} /></div>
                  </div>
                </div>
              )}
              {mapStatus === 'loading' && (
                <div className="absolute inset-0 bg-stone-50 flex flex-col items-center justify-center gap-4"><div className="w-8 h-8 border-2 border-stone-200 border-t-emerald-900 rounded-full animate-spin" /><p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Loading Maps...</p></div>
              )}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <span className="text-xs font-medium tracking-[0.5em] text-emerald-900 uppercase mb-4 block">Location</span>
            <h2 className="text-4xl md:text-5xl font-normal serif text-stone-900 tracking-tight mb-8 leading-tight">산정호수의 곁,<br />자연 속으로</h2>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-stone-50 rounded-2xl text-stone-400"><Car size={24} /></div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-2 uppercase tracking-widest">Accessibility</h4>
                  <p className="text-sm text-stone-500 font-light break-keep leading-relaxed max-w-sm">서울에서 1시간 30분 거리. 포천 산정호수 하동 주차장 인근에 위치하여 접근성이 매우 뛰어납니다.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-700 shadow-sm"><Zap size={24} /></div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-900 mb-2 uppercase tracking-widest">EV Station</h4>
                  <p className="text-sm text-stone-700 font-bold break-keep leading-relaxed max-w-sm">직접 예약 및 문의 고객 전용 전기차 주차장 완비 (총 2대 보유)</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-stone-50 rounded-2xl text-stone-400"><Trees size={24} /></div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-2 uppercase tracking-widest">Nearby Destination</h4>
                  <p className="text-sm text-stone-500 font-light break-keep leading-relaxed max-w-sm">산정호수 둘레길 도보 5분<br />명성산 억새밭 등산로 입구 인접</p>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <button onClick={openNaverMap} className="inline-flex items-center gap-2 text-emerald-900 font-bold border-b-2 border-emerald-900 pb-1 text-sm hover:text-emerald-950 transition-all">네이버 맵으로 보기 <ExternalLink size={16} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Reservation Section */}
      <section className="bg-stone-950 py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="IMAGE/Home_Footer.webp" alt="Footer BG" className="w-full h-full object-cover opacity-50 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/30 to-stone-950/50"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[4rem] py-20 px-6 shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-normal serif text-white tracking-tight leading-tight uppercase italic mb-8">Where Nature Begins</h2>
            <p className="text-stone-200 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">숲과 물이 함께하는 프리미엄 스테이. 지금 테라스 527을 만나보세요.</p>
            <Link to="/booking" className="inline-flex items-center gap-14 bg-white text-stone-950 px-14 py-6 rounded-full font-bold text-[12px] tracking-[0.5em] uppercase hover:bg-emerald-900 hover:text-white transition-all shadow-2xl group">RESERVE NOW <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;