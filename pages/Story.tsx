import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import storyDataJson from '../data/story.json';

interface EvidenceSlide {
  text: string;
  image: string;
}

interface CoreValue {
  id: string;
  badge: string;
  title: string;
  description: string;
  evidenceSlides: EvidenceSlide[];
}

interface StoryData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  intro: {
    philosophy: string;
  };
  coreValues: CoreValue[];
  closing: {
    text: string;
    heading: string;
  };
}

const EvidenceSlider: React.FC<{ slides: EvidenceSlide[] }> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative group/slider w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.image} className="w-full h-full object-cover filter saturate-[1.1] contrast-[1.05]" alt="" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-8">
            <p className={`text-white drop-shadow-lg text-sm md:text-base font-medium leading-relaxed transition-all duration-700 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {slide.text}
            </p>
          </div>
        </div>
      ))}
      {slides.length > 1 && (
        <div className="absolute bottom-6 right-6 flex gap-2 opacity-0 group-hover/slider:opacity-100 transition-opacity">
          <button onClick={prev} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all border border-white/10">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all border border-white/10">
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

const data = storyDataJson as StoryData;

const Story: React.FC = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll-Driven Animations with IntersectionObserver
  useEffect(() => {

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-scroll-id');
            if (id) {
              setVisibleElements((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const elements = document.querySelectorAll('[data-scroll-id]');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [data]);

  const scrollToValues = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('our-promise');
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full bg-white text-gray-900 selection:bg-emerald-900/20 relative overflow-hidden">
      {/* 1. HERO SECTION - Philosophy와 하나의 연속된 배경으로 연결 */}
      <section className="relative min-h-[92vh] flex items-end pb-24 z-10" style={{ overflow: 'visible' }}>
        {/* Hero 이미지가 Philosophy 섹션까지 자연스럽게 확장되도록 */}
        <div className="absolute inset-0 z-0" style={{ height: 'calc(100vh + 500px)', bottom: '-500px' }}>
          {/* Hero Image - 선명하게 시작, Philosophy 섹션까지 연장 */}
          <img 
            src={data.hero.backgroundImage} 
            className="w-full h-full object-cover" 
            alt="Terrace 527" 
            fetchPriority="high"
            decoding="async"
            style={{ objectPosition: 'center top' }}
          />
          {/* 하단으로 갈수록 흰색으로 자연스럽게 전환되는 그라데이션 - Philosophy 섹션까지 적용 */}
          <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.5) 75%, rgba(255,255,255,0.7) 85%, rgba(255,255,255,0.9) 95%, white 100%)'
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <h1 className="text-4xl md:text-6xl font-bold serif tracking-tight mb-6 leading-tight text-gray-900 drop-shadow-lg">
              {data.hero.title}
            </h1>
            <p className="text-gray-700 text-lg md:text-xl font-light tracking-wide mb-10 max-w-xl break-keep drop-shadow-md">
              {data.hero.subtitle}
            </p>
            <div className="flex gap-4">
              <a 
                href="#our-promise" 
                onClick={scrollToValues}
                className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-xl border border-gray-200 text-gray-900 px-10 py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:shadow-lg transition-all group shadow-xl"
              >
                우리가 전하는 진심 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30 animate-bounce">
           <div className="w-px h-12 bg-gray-400" />
        </div>
      </section>

      {/* 2. BRAND PHILOSOPHY - Hero 이미지의 자연스러운 연장, 별도 이미지 없음 */}
      <section id="philosophy" className="relative py-32 md:py-48 px-6 text-center z-10" style={{ marginTop: '-500px', paddingTop: '550px' }}>
        {/* Hero 섹션의 이미지가 자연스럽게 이어지도록 - 별도 이미지 없이 Hero 이미지의 연장 사용 */}
        <div className="absolute inset-0 z-0" style={{ top: '-500px', height: 'calc(100% + 500px)' }}>
          {/* 상단은 흰색 톤 추가하지 않고, 하단으로 갈수록만 흰색으로 전환 */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, transparent 30%, transparent 50%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0.5) 85%, rgba(255,255,255,0.8) 95%, white 100%)'
            }}
          />
        </div>
        
        <div className="max-w-3xl mx-auto space-y-10 relative z-10">
          <div 
            data-scroll-id="philosophy-icon"
            className={`transition-all duration-1000 ${
              visibleElements.has('philosophy-icon') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Sparkles size={28} className="mx-auto text-gray-800/60 drop-shadow-lg" />
          </div>
          <h2 
            data-scroll-id="philosophy-title"
            className={`text-3xl md:text-5xl font-bold serif text-gray-900 tracking-tight leading-relaxed transition-all duration-1000 delay-150 drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)] ${
              visibleElements.has('philosophy-title') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            Where Nature Begins
          </h2>
          <p 
            data-scroll-id="philosophy-text"
            className={`text-lg md:text-2xl font-light leading-relaxed text-gray-800 break-keep whitespace-pre-line serif italic transition-all duration-1000 delay-300 drop-shadow-[0_2px_6px_rgba(255,255,255,0.9)] max-w-2xl mx-auto ${
              visibleElements.has('philosophy-text') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {data.intro.philosophy}
          </p>
        </div>
      </section>

      {/* 3. OUR PROMISE - Emotional Grid */}
      <section id="our-promise" className="relative py-24 md:py-40 px-6 bg-white scroll-mt-24 z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <header 
            data-scroll-id="promise-header"
            className={`mb-20 md:mb-24 space-y-4 transition-all duration-1000 ${
              visibleElements.has('promise-header') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-emerald-700/60 font-bold text-[11px] tracking-[0.5em] uppercase block">Our Sincerity</span>
            <h2 className="text-3xl md:text-5xl font-bold serif tracking-tighter leading-tight text-gray-900">
              테라스 527의 약속
            </h2>
          </header>

          <div className="space-y-24 md:space-y-32">
            {data.coreValues.map((value, idx) => (
              <div 
                key={value.id}
                data-scroll-id={`value-${value.id}`}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center transition-all duration-1000 ${
                  visibleElements.has(`value-${value.id}`) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Text Block */}
                <div className={`space-y-8 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 font-bold text-sm tracking-widest uppercase">0{idx + 1}</span>
                      <span className="bg-white/80 backdrop-blur-sm border border-gray-200/50 px-5 py-2 rounded-full text-[11px] font-bold text-emerald-700 tracking-widest shadow-sm">
                        {value.badge}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold serif text-gray-900 tracking-tight leading-tight">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed font-light break-keep max-w-md">
                    {value.description}
                  </p>
                </div>

                {/* Evidence Slider (Visual Records) */}
                <div 
                  data-scroll-id={`value-image-${value.id}`}
                  className={`w-full transition-all duration-1000 delay-300 ${
                    idx % 2 === 1 ? 'lg:order-1' : ''
                  } ${
                    visibleElements.has(`value-image-${value.id}`) 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : `opacity-0 ${idx % 2 === 1 ? 'translate-x-12' : '-translate-x-12'} scale-95`
                  }`}
                >
                  <EvidenceSlider slides={value.evidenceSlides} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLOSING - Nature & Protagonist */}
      <section className="relative py-32 md:py-48 overflow-hidden bg-white border-t border-gray-200/30 z-10">
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            <div 
              data-scroll-id="closing-line"
              className={`w-20 h-px bg-emerald-600/30 mx-auto transition-all duration-1000 ${
                visibleElements.has('closing-line') 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}
            />
            
            <p 
              data-scroll-id="closing-text"
              className={`text-xl md:text-2xl font-light leading-relaxed serif text-gray-700 break-keep whitespace-pre-line italic transition-all duration-1000 delay-200 ${
                visibleElements.has('closing-text') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {data.closing.text}
            </p>
            
            <div 
              data-scroll-id="closing-heading"
              className={`space-y-12 transition-all duration-1000 delay-400 ${
                visibleElements.has('closing-heading') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-3xl md:text-4xl font-bold serif tracking-tighter text-gray-900 leading-tight whitespace-pre-line">
                {data.closing.heading}
              </h3>
              <div className="pt-8">
                <Link 
                  to="/booking" 
                  className="inline-flex items-center gap-14 bg-emerald-900 text-white px-16 py-8 rounded-full font-bold text-[13px] tracking-[0.5em] hover:bg-emerald-950 transition-all shadow-xl uppercase group hover:scale-105"
                >
                  RESERVATION NOW <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Story;
