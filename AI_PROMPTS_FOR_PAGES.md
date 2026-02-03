# Terrace 527 홈페이지 - AI 구현용 상세 프롬프트

이 문서는 Terrace 527 홈페이지의 각 페이지를 다른 AI 툴로 동일하게 구현하기 위한 상세 프롬프트 모음입니다.

---

## 📋 공통 사항 (모든 페이지에 적용)

### 기술 스택
- **프레임워크**: React 19.2.3 + TypeScript
- **라우팅**: React Router DOM 7.11.0 (HashRouter 사용)
- **스타일링**: Tailwind CSS (CDN 사용)
- **아이콘**: Lucide React 0.562.0
- **폰트**: 
  - 제목/세리프: Noto Serif KR (400, 700, 900)
  - 본문/산세리프: Pretendard (300, 400, 500, 600, 700)

### 공통 컴포넌트

#### 1. 네비게이션 바 (Navbar)
- **위치**: 고정 상단 (`fixed top-0`, `z-50`)
- **스타일**: 
  - 배경: `bg-white/95 backdrop-blur-md`
  - 높이: `h-20`
  - 하단 보더: `border-b border-gray-100`
- **로고**: 
  - 텍스트: "TERRACE 527" (세리프 폰트, `text-xl md:text-2xl`, `tracking-widest`, `font-bold`)
  - 서브텍스트: "Glamping & Stay Resort" (`text-[9px]`, `tracking-[0.3em]`, `text-gray-400`)
- **메뉴 항목**:
  - HOME, STORY, ROOMS (서브메뉴), EXPERIENCE (서브메뉴)
  - 폰트: `text-[14px]`, `tracking-widest`, `font-black`, `uppercase`
  - 활성 상태: `text-green-800`
  - 호버: `hover:text-green-800`
- **서브메뉴** (ROOMS, EXPERIENCE):
  - 호버 시 나타남 (`group-hover/menu:opacity-100`)
  - 배경: `bg-white border border-gray-200 shadow-2xl rounded-2xl`
  - 활성 항목: `text-emerald-900 bg-emerald-50 border-l-4 border-emerald-900`
- **예약 버튼**: 
  - 그라데이션: `bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900`
  - 텍스트: "RESERVE NOW" (`text-[12px]`, `tracking-[0.3em]`, `uppercase`)
  - 호버: `hover:scale-105`, 그림자 효과
- **모바일**: 햄버거 메뉴, 아코디언 스타일 서브메뉴

#### 2. 푸터 (Footer)
- **배경**: `bg-white`, 상단 패딩 `pt-20`, 하단 패딩 `pb-28 md:pb-20`
- **레이아웃**: 3열 그리드 (`grid-cols-1 md:grid-cols-3`)
- **섹션 1**: 브랜드 소개, SNS 링크 (Instagram, Naver Blog, KakaoTalk)
- **섹션 2**: 대표, 주소, 사업자번호
- **섹션 3**: 고객센터, 은행정보, 이용약관 링크
- **저작권**: 하단 중앙, `text-[10px]`, `tracking-widest`, `uppercase`

#### 3. 이벤트 팝업 (EventPopup)
- **위치**: 우측 하단 고정 (`fixed bottom-8 right-8`)
- **크기**: `max-w-[340px]`
- **스타일**: 
  - 배경: `bg-white`
  - 둥근 모서리: `rounded-[2rem]`
  - 그림자: `shadow-[0_20px_50px_rgba(0,0,0,0.15)]`
- **기능**: 
  - 홈페이지(`/`)에서만 표시
  - "오늘 하루 보지 않기" 기능 (localStorage)
  - 1.2초 후 나타남 (`animate-in slide-in-from-bottom-10`)

### 색상 테마
- **주요 색상**: 
  - 에메랄드 그린: `emerald-900`, `emerald-800`, `emerald-700`
  - 스톤/그레이: `stone-50`, `stone-100`, `stone-800`, `stone-900`
  - 화이트: `white`, `white/95`
- **텍스트 색상**:
  - 제목: `text-gray-900`, `text-stone-900`
  - 본문: `text-gray-500`, `text-gray-600`
  - 강조: `text-emerald-900`, `text-green-800`

### 타이포그래피
- **제목 (세리프)**: `serif` 클래스, `font-bold` 또는 `font-normal`
- **본문**: Pretendard, `font-light` 또는 `font-medium`
- **트래킹**: 
  - 대문자: `tracking-widest` 또는 `tracking-[0.3em]`
  - 일반: `tracking-tight` 또는 `tracking-normal`

---

## 🏠 페이지 1: HOME (홈페이지)

### 프롬프트

```
Terrace 527 글램핑 & 펜션 홈페이지를 구현해주세요. 프리미엄하고 세련된 디자인으로 자연스러운 느낌을 주는 웹사이트입니다.

**기술 스택**: React + TypeScript + Tailwind CSS + React Router

**전체 구조**:
1. 고정 네비게이션 바 (상단)
2. 히어로 섹션 (전체 화면 슬라이더)
3. 브랜드 스토리 섹션
4. 룸 컬렉션 섹션
5. 경험 하이라이트 섹션 (가로 스크롤)
6. 위치 섹션 (네이버 지도)
7. CTA 예약 섹션
8. 푸터

**히어로 섹션**:
- 전체 화면 높이 (`h-screen`)
- 5장의 이미지 자동 슬라이더 (6초 간격)
- 이미지 경로: IMAGE/Hero_01.webp ~ Hero_05.webp
- 오버레이: `bg-stone-900/30` + 그라데이션
- 중앙 텍스트:
  - 배지: "Premium Glamping & Stay" (작은 텍스트, 흰색, 둥근 배경)
  - 제목: "자연이 일상이 되는 곳" (작은 텍스트, `text-lg md:text-2xl`)
  - 메인 제목: "산정호수, 테라스 527" (큰 텍스트, `text-5xl md:text-7xl lg:text-8xl`, 세리프 폰트, 이탤릭)
  - 버튼: "RESERVE NOW" (흰색 배경, 검은 텍스트, 둥근 버튼)
- 좌우 화살표 버튼 (호버 시 표시, `opacity-0 group-hover:opacity-100`)
- 이미지 호버 시 확대 효과 (`scale-110 group-hover:scale-100`, 10초 트랜지션)

**브랜드 스토리 섹션**:
- 배경: `bg-stone-50`
- 레이아웃: 2열 그리드 (`grid md:grid-cols-2`)
- 왼쪽: 이미지 (`IMAGE/Home_Story.webp`, `aspect-[4/5]`, `rounded-[2.5rem]`, 호버 시 확대)
- 오른쪽:
  - 배지: "Brand Story" (`text-xs`, `tracking-[0.4em]`, `text-emerald-900`)
  - 제목: "산정호수를 닮은 숲과 물의 조화" (`text-3xl md:text-5xl`, 세리프)
  - 설명: 이탤릭, `text-stone-600`, `font-light`
  - 4개 특징 아이콘 그리드:
    - 지하 200m 암반수 공급 (Droplets 아이콘)
    - 사계절 냉난방 완비 (Zap 아이콘)
    - 프리미엄 침구 & 어메니티 (Bed 아이콘)
    - 스마트 오더 시스템 (Coffee 아이콘)
  - 각 아이콘: `w-10 h-10 rounded-2xl bg-emerald-50`, 호버 시 `bg-emerald-900 text-white`
  - 링크: "EXPLORE OUR STORY" (에메랄드 색상, 화살표 아이콘)

**룸 컬렉션 섹션**:
- 배경: `bg-white`
- 헤더:
  - 배지: "Room Collection" (`text-xs`, `tracking-[0.5em]`, `text-emerald-900`)
  - 제목: "머무름의 미학" (`text-4xl md:text-5xl`, 세리프)
  - 설명 텍스트 (오른쪽 정렬)
- 2열 그리드 (staggered 레이아웃):
  - Signature Glamping: 첫 번째 행
  - Classic Stay: 두 번째 행 (약간 아래로 이동, `md:translate-y-24`)
- 각 룸 카드:
  - 이미지: `aspect-[4/3]`, `rounded-[2.5rem]`, 호버 시 확대
  - 배지: 우측 하단 (`bg-white/95 backdrop-blur-sm`, `rounded-full`)
  - 제목: 세리프 폰트, `text-2xl`
  - 설명: 작은 텍스트, `uppercase`, `tracking-[0.2em]`
  - 화살표 아이콘 (호버 시 에메랄드 배경)

**경험 하이라이트 섹션**:
- 배경: `bg-[#121416]` (어두운 배경)
- 헤더:
  - 배지: "EXPERIENCE" (`text-[10px]`, `tracking-[0.5em]`)
  - 제목: "감각의 회복" (`text-4xl md:text-6xl`, 세리프, 흰색)
  - 좌우 스크롤 버튼
- 가로 스크롤 컨테이너:
  - 5개 카드 (각 `w-[320px]`)
  - 각 카드:
    - 이미지: `aspect-[4/5]`, `rounded-[2.5rem]`
    - 배지: 좌측 상단 (`bg-[#f5f2e8]/90`)
    - 제목: 세리프, `text-xl`, 흰색
    - 설명: `text-stone-500`, `text-xs`
  - 카드 이미지 경로:
    1. IMAGE/Home_Exp_01.webp - "개별 온수 스파"
    2. IMAGE/Home_Exp_02.webp - "천연 암반수 풀"
    3. IMAGE/Home_Exp_03.webp - "산정호수 산책"
    4. IMAGE/Home_Exp_04.webp - "자연 계곡 이용"
    5. IMAGE/Home_Exp_05.webp - "스마트 오더"

**위치 섹션**:
- 배경: `bg-white`
- 레이아웃: 2열 그리드
- 왼쪽: 네이버 지도 (동적 로드)
  - 컨테이너: `rounded-[2.5rem]`, `border border-stone-100`, `shadow-2xl`
  - 높이: `h-80 md:h-[500px]`
  - 좌표: 38.0571123, 127.3217751
  - 마커: "테라스 527" 정보 윈도우
  - 로딩 상태 표시
  - 오류 시 대체 UI (클릭 시 네이버 맵 열기)
- 오른쪽:
  - 배지: "Location"
  - 제목: "산정호수의 곁, 자연 속으로"
  - 3개 정보 박스:
    - Accessibility (Car 아이콘): "서울에서 1시간 30분 거리..."
    - EV Station (Zap 아이콘): "전기차 주차장 완비"
    - Nearby Destination (Trees 아이콘): "산정호수 둘레길 도보 5분"
  - 링크: "네이버 맵으로 보기"

**CTA 예약 섹션**:
- 배경: `bg-stone-950` (어두운 배경)
- 배경 이미지: `IMAGE/Home_Footer.webp` (오버레이 적용)
- 중앙 카드:
  - 배경: `bg-white/10 backdrop-blur-md`
  - 테두리: `border border-white/20`
  - 둥근 모서리: `rounded-[4rem]`
  - 제목: "Where Nature Begins" (흰색, 세리프, 이탤릭, `uppercase`)
  - 설명: `text-stone-200`
  - 버튼: "RESERVE NOW" (흰색 배경, 검은 텍스트)

**반응형**:
- 모바일: 1열 레이아웃, 작은 텍스트
- 태블릿: 2열 레이아웃
- 데스크톱: 전체 레이아웃

**애니메이션**:
- 페이드인/슬라이드인 효과 (`animate-in`)
- 호버 시 이미지 확대 (부드러운 트랜지션)
- 버튼 호버 시 스케일 효과
```

---

## 📖 페이지 2: STORY (브랜드 스토리)

### 프롬프트

```
Terrace 527 브랜드 스토리 페이지를 구현해주세요. 감성적이고 서사적인 스토리텔링을 중심으로 한 페이지입니다.

**기술 스택**: React + TypeScript + Tailwind CSS + React Router

**데이터 소스**: `/data/story.json` 파일에서 JSON 데이터 로드

**전체 구조**:
1. 히어로 섹션 (전체 화면, Philosophy와 연속된 배경)
2. 브랜드 Philosophy 섹션 (히어로 이미지의 자연스러운 연장)
3. Our Promise 섹션 (3개 핵심 가치)
4. Closing 섹션

**히어로 섹션**:
- 최소 높이: `min-h-[92vh]`
- 배경 이미지: `IMAGE/Story_Hero.webp` (JSON에서 로드)
- 이미지가 Philosophy 섹션까지 자연스럽게 확장되도록 (`height: calc(100vh + 500px)`, `bottom: -500px`)
- 하단 그라데이션: 흰색으로 자연스럽게 전환 (`linear-gradient(to bottom, transparent 0%, ... white 100%)`)
- 중앙 하단 텍스트:
  - 제목: `text-4xl md:text-6xl`, 세리프, `font-bold`, `text-gray-900`, `drop-shadow-lg`
  - 부제목: `text-lg md:text-xl`, `font-light`, `text-gray-700`
  - 버튼: "우리가 전하는 진심" (흰색 배경, 둥근 버튼, 화살표 아이콘)
- 하단 스크롤 인디케이터 (애니메이션)

**브랜드 Philosophy 섹션**:
- 히어로 이미지의 자연스러운 연장 (별도 이미지 없음)
- 마진: `margin-top: -500px`, `padding-top: 550px`
- 중앙 정렬 텍스트:
  - 아이콘: Sparkles (`size={28}`, `text-gray-800/60`)
  - 제목: "Where Nature Begins" (`text-3xl md:text-5xl`, 세리프, `font-bold`)
  - 본문: 이탤릭, `text-lg md:text-2xl`, `font-light`, `whitespace-pre-line` (JSON에서 로드)
- 스크롤 애니메이션: IntersectionObserver 사용
  - 요소가 보일 때: `opacity-100 translate-y-0`
  - 보이지 않을 때: `opacity-0 translate-y-8`
  - 트랜지션: `duration-1000`, 딜레이 적용

**Our Promise 섹션**:
- 배경: `bg-white`
- 헤더:
  - 배지: "Our Sincerity" (`text-emerald-700/60`, `text-[11px]`, `tracking-[0.5em]`)
  - 제목: "테라스 527의 약속" (`text-3xl md:text-5xl`, 세리프)
- 3개 핵심 가치 (JSON의 `coreValues` 배열):
  - 각 가치는 2열 그리드 (`grid-cols-1 lg:grid-cols-2`)
  - 홀수 번째: 텍스트 왼쪽, 이미지 오른쪽
  - 짝수 번째: 이미지 왼쪽, 텍스트 오른쪽 (`lg:order-2`)
- 각 가치 블록:
  - 텍스트 영역:
    - 번호: "01", "02", "03" (`text-gray-400`, `text-sm`, `tracking-widest`)
    - 배지: `bg-white/80 backdrop-blur-sm`, `border border-gray-200/50`, `rounded-full`
    - 제목: `text-3xl md:text-4xl`, 세리프, `font-bold`
    - 설명: `text-base md:text-lg`, `font-light`
    - 하단 텍스트: "우리가 준비한 정성" (ImageIcon 아이콘)
  - 이미지 슬라이더 (EvidenceSlider 컴포넌트):
    - `aspect-[4/3]`, `rounded-[2rem]`
    - 여러 이미지 슬라이드 (JSON의 `evidenceSlides` 배열)
    - 하단 그라데이션 오버레이
    - 좌우 화살표 버튼 (호버 시 표시)
    - 페이드 전환 (`transition-opacity duration-1000`)
- 스크롤 애니메이션: 각 가치 블록이 순차적으로 나타남

**Closing 섹션**:
- 배경: `bg-white`, `border-t border-gray-200/30`
- 중앙 정렬:
  - 구분선: `w-20 h-px bg-emerald-600/30`
  - 본문: `text-xl md:text-2xl`, 세리프, 이탤릭, `whitespace-pre-line` (JSON에서 로드)
  - 제목: `text-3xl md:text-4xl`, 세리프, `font-bold`, `whitespace-pre-line`
  - 버튼: "RESERVATION NOW" (에메랄드 배경, `rounded-full`, 화살표 아이콘)

**EvidenceSlider 컴포넌트**:
- 슬라이드 컨테이너: `aspect-[4/3]`, `rounded-[2rem]`, `overflow-hidden`
- 각 슬라이드:
  - 이미지: `object-cover`, 필터 적용 (`saturate-[1.1] contrast-[1.05]`)
  - 하단 그라데이션: `bg-gradient-to-t from-black/60 via-black/10 to-transparent`
  - 텍스트: 흰색, `drop-shadow-lg`, 페이드인 효과
- 네비게이션:
  - 좌우 버튼: `bg-black/20 backdrop-blur-xl`, 호버 시 `bg-white text-black`
  - 호버 시에만 표시 (`opacity-0 group-hover/slider:opacity-100`)

**스크롤 애니메이션**:
- IntersectionObserver 사용
- threshold: 0.15
- rootMargin: '0px 0px -100px 0px'
- 각 요소에 `data-scroll-id` 속성 부여
- 상태 관리로 visible 요소 추적

**로딩 상태**:
- 데이터 로드 중: 중앙 스피너 (`border-2 border-emerald-600/20 border-t-emerald-600`)

**반응형**:
- 모바일: 1열 레이아웃, 작은 텍스트
- 태블릿: 2열 레이아웃
- 데스크톱: 전체 레이아웃
```

---

## 🏕️ 페이지 3: ROOMS - Classic Glamping

### 프롬프트

```
Terrace 527 Classic Glamping 룸 상세 페이지를 구현해주세요. 객실 정보와 이미지 갤러리를 중심으로 한 페이지입니다.

**기술 스택**: React + TypeScript + Tailwind CSS + React Router

**전체 구조**:
1. 고정 서브 네비게이션 (상단, sticky)
2. 헤더 섹션
3. 메인 이미지 갤러리
4. 사이드바 정보

**서브 네비게이션**:
- 위치: `sticky top-20` (메인 네비게이션 아래)
- 배경: `bg-white/80 backdrop-blur-md`
- 하단 보더: `border-b border-gray-100`
- 메뉴 항목:
  - Classic Glamping (활성)
  - Signature Glamping
  - Classic Stay
  - Signature Stay
- 스타일:
  - 폰트: `text-[10px]`, `font-bold`, `tracking-[0.2em]`, `uppercase`
  - 활성: `border-green-900 text-green-950` (하단 보더)
  - 비활성: `border-transparent text-gray-400 hover:text-green-800`
- 가로 스크롤 가능 (모바일)

**헤더 섹션**:
- 배지: "Total 5 Rooms (Large 2 / Medium 3)" (`text-gray-400`, `text-[10px]`, `tracking-[0.5em]`)
- 제목: "Classic Glamping" (`text-3xl md:text-4xl`, 세리프, `font-bold`)
- 설명: `text-gray-500`, `text-sm`, `font-light`, `max-w-xl`

**메인 이미지 갤러리**:
- 레이아웃: 2열 그리드 (`grid-cols-1 lg:grid-cols-12`)
- 왼쪽 (8열):
  - 메인 이미지:
    - `aspect-[16/9]`, `rounded-3xl`, `overflow-hidden`
    - 현재 선택된 이미지 표시
    - 좌우 화살표 버튼 (호버 시 표시, `opacity-0 group-hover:opacity-100`)
    - 버튼 스타일: `bg-white/20 backdrop-blur-lg`, `rounded-full`
  - 썸네일 그리드:
    - 5열 그리드 (`grid-cols-5`)
    - 각 썸네일: `aspect-[4/3]`, `rounded-xl`
    - 활성: `border-green-900 opacity-100`
    - 비활성: `border-transparent opacity-50 hover:opacity-100`
- 이미지 경로:
  - IMAGE/Room_CG_01.webp ~ Room_CG_05.webp

**사이드바 정보** (4열):
- 제목: "자연 본연의 안락함" (`text-2xl`, 세리프, `font-bold`)
- 설명: `text-sm text-gray-500`
- 스펙 정보:
  - Standard: "2 Persons"
  - Max: "4 Persons"
  - 보더: `border-y border-gray-100`, `py-8`
- 특징 리스트:
  - 개별 테라스 바비큐
  - 에어컨 및 바닥 난방 시스템
  - 개별 화장실 및 샤워실
  - 호텔식 살균 침구
  - 각 항목: 작은 점 (`w-1.5 h-1.5 bg-green-900 rounded-full`)
- 예약 버튼:
  - `bg-black text-white`
  - `rounded-2xl`
  - `text-[10px]`, `font-bold`, `tracking-[0.4em]`, `uppercase`
  - 호버: `hover:bg-green-900`

**상태 관리**:
- `activeIndex` 상태로 현재 선택된 이미지 관리
- `nextImage()`, `prevImage()` 함수로 이미지 전환

**반응형**:
- 모바일: 1열 레이아웃, 썸네일 5열 유지
- 데스크톱: 2열 레이아웃 (8:4 비율)

**애니메이션**:
- 이미지 전환: `transition-opacity duration-700`
- 버튼 호버 효과
```

---

## 💆 페이지 4: EXPERIENCE - Heal & Comfort

### 프롬프트

```
Terrace 527 Heal & Comfort 경험 페이지를 구현해주세요. 힐링과 편안함을 주제로 한 프로그램들을 소개하는 페이지입니다.

**기술 스택**: React + TypeScript + Tailwind CSS + React Router

**전체 구조**:
1. 히어로 섹션
2. 서브 네비게이션 (sticky)
3. 프로그램 블록들 (6개)
4. CTA 예약 섹션

**히어로 섹션**:
- 높이: `h-[60vh]`
- 배경 이미지: `IMAGE/Exp_Hero_H.webp` (어두운 오버레이)
- 중앙 텍스트:
  - 배지: "Heal & Comfort" (`text-white/40`, `text-[10px]`, `tracking-[0.5em]`)
  - 제목: "힐링 & 컴포트" (`text-4xl md:text-6xl`, 세리프, `font-bold`, 흰색)
  - 부제목: 이탤릭, `text-white/60`, `tracking-widest`

**서브 네비게이션**:
- 위치: `sticky top-20`
- 배경: `bg-white/95 backdrop-blur-md`
- 메뉴 항목:
  - Heal & Comfort (활성, `border-emerald-900 text-emerald-950`)
  - Play & Dining
  - Stay Services
- 스타일: `text-[10px]`, `font-bold`, `tracking-[0.2em]`, `uppercase`

**프로그램 블록들** (6개):
각 블록은 동일한 구조:
- 레이아웃: 2열 그리드 (`grid-cols-1 lg:grid-cols-12`)
- 왼쪽 (7열): 이미지
  - `aspect-[16/10]`, `rounded-[2.5rem]`
  - 호버 시 확대 (`group-hover/block:scale-110`, `duration-[3000ms]`)
  - 좌측 상단 아이콘: `bg-emerald-900 text-white`, `rounded-[1.5rem]`
  - 좌측 하단 텍스트:
    - 배지: `text-[9px]`, `tracking-[0.3em]`, `uppercase`, `opacity-70`
    - 제목: `text-2xl md:text-4xl`, 세리프, `font-bold`, 흰색
  - 하단 그라데이션 오버레이
- 오른쪽 (5열): 텍스트 정보
  - 컨셉: `text-2xl md:text-3xl`, 세리프, `font-bold`, `text-emerald-950`
  - 설명: `text-gray-500`, `font-light`
  - 정보 박스: `bg-stone-50`, `rounded-[2.5rem]`, `border border-stone-100`
    - 특징 리스트 (작은 점으로 표시)
    - 하단: 시간 및 타입 정보

**프로그램 목록**:
1. **온수 스파** (Outdoor Hot Spa)
   - 아이콘: Waves
   - 이미지: IMAGE/Heal_Prog_01.webp
   - 컨셉: "사계절 내내 누리는 따스한 고요"
   - 특징: 프라이빗 개별 테라스 스파, 최적의 온열 시스템, 프리미엄 입욕제 제공
   - 시간: 입실 후 ~ 22:00
   - 타입: 객실별 유료 옵션

2. **야외 수영장** (Groundwater Pool)
   - 아이콘: Droplets
   - 이미지: IMAGE/Heal_Prog_02.webp
   - 컨셉: "지하 200m 암반수의 청량함"
   - 특징: 지하 200m 천연 암반수, 7M 대형 아웃도어 풀, 여름 시즌 전용 운영
   - 시간: 10:00 ~ 18:00
   - 타입: 투숙객 무료 개방

3. **자연 계곡 이용** (Natural Valley)
   - 아이콘: Mountain
   - 이미지: IMAGE/Heal_Prog_03.webp
   - 컨셉: "숙소 바로 앞, 1급수의 시원함"
   - 특징: 입구 맞은편 도보 1분, 사계절 맑은 1급수 계곡, 자연 그늘막 완비
   - 시간: 상시 이용 가능
   - 타입: 자연 무료 이용

4. **호수 산책** (Lake Walk)
   - 아이콘: Map
   - 이미지: IMAGE/Heal_Prog_04.webp
   - 컨셉: "물안개 피는 새벽의 고요한 산책"
   - 특징: 산정호수 둘레길 인접, 포토스팟 가이드 제공, 조식 전 아침 산책 추천
   - 시간: 일출 ~ 일몰 추천
   - 타입: 자연 무료 이용

5. **고급 침구 & 어메니티** (Premium Bedding)
   - 아이콘: Bed
   - 이미지: IMAGE/Heal_Prog_05.webp
   - 컨셉: "호텔의 안락함을 자연 속으로"
   - 특징: 프리미엄 구스 이불, 고체 어메니티 세트, 매일 살균 세탁 시스템
   - 시간: 입실 시 비치
   - 타입: 전 객실 기본 제공

6. **겨울철 난방 완비** (Winter Heating)
   - 아이콘: ThermometerSun
   - 이미지: IMAGE/Heal_Prog_06.webp
   - 컨셉: "한겨울에도 훈훈한 글램핑"
   - 특징: 전 객실 바닥 난방, 에어컨/온풍기 겸용, 등유 난로 대여 가능
   - 시간: 사계절 상시
   - 타입: 전 객실 기본 완비

**CTA 예약 섹션**:
- 배경: `bg-stone-950`
- 배경 이미지: `IMAGE/Exp_Footer_H.webp` (그레이스케일, 블러)
- 중앙 카드:
  - 배경: `bg-white/5 backdrop-blur-lg`
  - 테두리: `border border-white/10`
  - 둥근 모서리: `rounded-[3rem]`
  - 제목: "Where Nature Begins" (흰색, 세리프, 이탤릭, `uppercase`)
  - 설명: `text-stone-300`
  - 버튼: "RESERVE NOW" (흰색 배경)

**색상 테마**:
- 주요 색상: 에메랄드 그린 (`emerald-900`, `emerald-950`)
- 아이콘 배경: `bg-emerald-900`
- 텍스트 강조: `text-emerald-950`

**반응형**:
- 모바일: 1열 레이아웃, 작은 텍스트
- 데스크톱: 2열 레이아웃 (7:5 비율)
```

---

## 🎮 페이지 5: EXPERIENCE - Play & Dining

### 프롬프트

```
Terrace 527 Play & Dining 경험 페이지를 구현해주세요. 놀이와 식사를 주제로 한 프로그램들을 소개하는 페이지입니다.

**구조는 Heal & Comfort와 동일하지만, 다음 차이점이 있습니다:**

**색상 테마**:
- 주요 색상: 인디고 (`indigo-900`, `indigo-950`)
- 아이콘 배경: `bg-indigo-900`
- 텍스트 강조: `text-indigo-950`
- 활성 네비게이션: `border-indigo-900 text-indigo-950`

**히어로 섹션**:
- 배경 이미지: `IMAGE/Exp_Hero_P.webp`
- 제목: "플레이 & 다이닝"
- 부제목: "함께 즐기고, 저녁을 기억하게 만드는 시간"

**프로그램 목록** (6개):
1. **키즈존** (Kids Zone)
   - 아이콘: Baby
   - 이미지: IMAGE/Play_Prog_01.webp
   - 컨셉: "모험과 안전이 공존하는 놀이터"
   - 특징: 실내 안전 정글짐 완비, 야외 모래놀이 구역, 어린이 도서 코너
   - 시간: 10:00 ~ 20:00
   - 타입: 투숙객 무료 개방

2. **BBQ Night**
   - 아이콘: Utensils
   - 이미지: IMAGE/Play_Prog_02.webp
   - 컨셉: "웨버 그릴과 함께하는 고품격 저녁"
   - 특징: 웨버 프리미엄 바비큐 그릴, 불멍용 참나무 장작 세트, 마시멜로 꼬치 제공
   - 시간: 17:00 ~ 21:00
   - 타입: 개별 유료 서비스

3. **보드게임 & 오락기** (Arcade & Games)
   - 아이콘: Gamepad2
   - 이미지: IMAGE/Play_Prog_03.webp
   - 컨셉: "가족과 즐기는 아날로그 오락"
   - 특징: 인기 보드게임 대여, 레트로 멀티 오락기, 프라이빗 게임존
   - 시간: 상시 이용 가능
   - 타입: 일부 유료 이용

4. **프라이빗 시네마** (Private Cinema)
   - 아이콘: MonitorPlay
   - 이미지: IMAGE/Play_Prog_04.webp
   - 컨셉: "숲속 영화관에서의 낭만"
   - 특징: 고화질 빔프로젝터 대여, 100인치 대형 스크린, 블루투스 사운드 시스템
   - 시간: 19:00 ~ 22:00
   - 타입: 사전 예약제

5. **버스 노래방** (Bus Karaoke)
   - 아이콘: Music
   - 이미지: IMAGE/Play_Prog_05.webp
   - 컨셉: "이색 개조 버스 노래방"
   - 특징: 프라이빗 단독 공간, 최신 가요 음원 완비, 90분 이용권 제공
   - 시간: 17:00 ~ 21:00
   - 타입: 90분 타임 예약제

6. **당일치기 BBQ** (Day Trip BBQ)
   - 아이콘: Sun
   - 이미지: IMAGE/Play_Prog_06.webp
   - 컨셉: "숙박 없이 즐기는 캠핑 감성"
   - 특징: 4시간 테라스 대여, 바비큐 도구 세트 포함, 계곡 및 편의시설 이용
   - 시간: 12:00 ~ 16:00
   - 타입: 당일 전용 상품

**CTA 예약 섹션**:
- 배경 이미지: `IMAGE/Exp_Footer_P.webp`
- 나머지는 Heal & Comfort와 동일
```

---

## 🛎️ 페이지 6: EXPERIENCE - Stay Services

### 프롬프트

```
Terrace 527 Stay Services 경험 페이지를 구현해주세요. 숙박 서비스를 주제로 한 프로그램들을 소개하는 페이지입니다.

**구조는 Heal & Comfort와 동일하지만, 다음 차이점이 있습니다:**

**색상 테마**:
- 주요 색상: 앰버 (`amber-900`, `amber-950`)
- 아이콘 배경: `bg-amber-900`
- 텍스트 강조: `text-amber-950`
- 활성 네비게이션: `border-amber-900 text-amber-950`

**히어로 섹션**:
- 배경 이미지: `IMAGE/Exp_Hero_S.webp`
- 제목: "스테이 서비스"
- 부제목: "머무는 방식을 더 유연하게"

**프로그램 목록** (6개):
1. **재방문 혜택** (Re-visit Benefit)
   - 아이콘: Crown
   - 이미지: IMAGE/Serv_Prog_01.webp
   - 컨셉: "다시 찾아주신 소중한 분들을 위한 예우"
   - 특징: 재방문 시 숙박료 할인, 웰컴 드링크 서비스, 우선 예약 권한 부여
   - 시간: 상시 적용
   - 타입: 재방문 한정 혜택

2. **장박용 캠핑 사이트** (Camping Site)
   - 아이콘: Tent
   - 이미지: IMAGE/Serv_Prog_02.webp
   - 컨셉: "나만의 아지트를 산정호수에"
   - 특징: 여유로운 사이트 공간, 전용 배전함 및 수도, 장기 계약 특별가
   - 시간: 시즌 협의
   - 타입: 장박 전용 상품

3. **24시 라운지** (24H Lounge)
   - 아이콘: Coffee
   - 이미지: IMAGE/Serv_Prog_03.webp
   - 컨셉: "한강 라면 기기와 함께하는 휴게 공간"
   - 특징: 한강 즉석 라면 기기 완비, 프리미엄 캡슐 커피 머신, 24시간 무인 운영
   - 시간: 24시간 운영
   - 타입: 자유 이용/유료 구매

4. **스마트 오더** (Smart Order)
   - 아이콘: QrCode
   - 이미지: IMAGE/Serv_Prog_04.webp
   - 컨셉: "문 앞까지 배달되는 편리함"
   - 특징: 전 객실 QR 주문 시스템, 비대면 문앞 배송, 실시간 주문 현황 확인
   - 시간: 10:00 ~ 21:00
   - 타입: 투숙객 전용 서비스

5. **기업 및 단체 대관** (Corporate Group)
   - 아이콘: Users
   - 이미지: IMAGE/Serv_Prog_05.webp
   - 컨셉: "비즈니스와 휴식의 완벽한 밸런스"
   - 특징: 전체 객실 일괄 대관, 대형 세미나 공간 지원, 단체 바비큐 패키지
   - 시간: 사전 협의
   - 타입: 단체 전용 서비스

6. **레이트 체크아웃** (Late Check-out)
   - 아이콘: Clock
   - 이미지: IMAGE/Serv_Prog_06.webp
   - 컨셉: "일정에 맞춘 유연한 머무름의 확장"
   - 특징: 최대 14:00까지 연장, 당일 상황에 따라 신청, 시간당 추가 요금 발생
   - 시간: 퇴실 당일 신청
   - 타입: 유료 옵션

**CTA 예약 섹션**:
- 배경 이미지: `IMAGE/Exp_Footer_S.webp`
- 나머지는 Heal & Comfort와 동일
```

---

## 📍 페이지 7: ACCESS (오시는 길)

### 프롬프트

```
Terrace 527 오시는 길 페이지를 구현해주세요. 위치 정보와 접근 방법을 안내하는 페이지입니다.

**기술 스택**: React + TypeScript + Tailwind CSS + React Router

**전체 구조**:
1. 헤더 섹션
2. 지도 섹션 (왼쪽, 2열)
3. 접근 방법 안내 (중앙)
4. 연락처 및 체크인 포인트 (오른쪽, 1열)

**헤더 섹션**:
- 중앙 정렬
- 제목: "오시는 길" (`text-2xl md:text-3xl`, 세리프, `font-bold`)
- 부제목: `text-gray-500`

**지도 섹션** (2열):
- 배경: `bg-gray-200`
- 비율: `aspect-video`
- 둥근 모서리: `rounded-3xl`
- 중앙 플레이스홀더:
  - 아이콘: MapPin (`size={64}`, `text-gray-300`)
  - 주소: "경기도 포천시 영북면 산정호수로 527"
  - 버튼 2개:
    - "네이버 지도 열기" (흰색 배경, `rounded-full`)
    - "구글 지도 열기" (흰색 배경, `rounded-full`)

**접근 방법 안내** (2열 그리드):
- **자가용 이용 시**:
  - 아이콘: Car (`size={24}`)
  - 제목: `text-green-800`, 세리프, `font-bold`
  - 설명: "포천 산정호수 하동 주차장 방면으로 오시면 입구에 테라스 527 간판이 보입니다."
- **대중교통 이용 시**:
  - 아이콘: Bus (`size={24}`)
  - 제목: `text-blue-800`, 세리프, `font-bold`
  - 설명: "운천 시외버스터미널에서 택시 이용 시 약 15분 소요됩니다."

**연락처 카드** (오른쪽):
- 배경: `bg-white`
- 패딩: `p-8`
- 둥근 모서리: `rounded-3xl`
- 제목: "Contact Info" (세리프, `font-bold`, 하단 보더)
- 항목:
  - **전화**: Phone 아이콘
    - 배지: "Call Us" (`text-[10px]`, `text-gray-400`)
    - 번호: "010-0000-0000" (`text-sm`, `font-bold`)
    - 호버: `hover:bg-green-50 hover:text-green-700`
  - **카카오톡**: MessageSquare 아이콘
    - 배지: "KakaoTalk" (`text-[10px]`, `text-gray-400`)
    - 텍스트: "테라스 527 채널" (`text-sm`, `font-bold`)
    - 호버: `hover:bg-[#FEE500] hover:text-gray-800`

**체크인 포인트 카드** (오른쪽):
- 배경: `bg-green-900 text-white`
- 패딩: `p-10`
- 둥근 모서리: `rounded-3xl`
- 제목: "Check-in Point" (세리프, `font-bold`)
- 순서 리스트:
  1. "주차장 도착 후 관리동 방문"
  2. "예약 확인 및 이용 안내 (10분 소요)"
  3. "객실 열쇠 및 소모품 수령 후 입실"
- 각 항목: 번호 (`0{idx+1}`), `text-white/40`, `font-bold`

**레이아웃**:
- 전체: `grid-cols-1 lg:grid-cols-3`
- 왼쪽 (2열): 지도 + 접근 방법
- 오른쪽 (1열): 연락처 + 체크인 포인트

**반응형**:
- 모바일: 1열 레이아웃
- 데스크톱: 3열 레이아웃
```

---

## 📅 페이지 8: BOOKING (예약 안내)

### 프롬프트

```
Terrace 527 예약 안내 페이지를 구현해주세요. 예약 방법과 이용 안내를 제공하는 페이지입니다.

**기술 스택**: React + TypeScript + Tailwind CSS + React Router

**전체 구조**:
1. 헤더 섹션
2. 예약 안내 아코디언 (3개)
3. 예약 버튼 섹션
4. 스마트 오더 섹션

**헤더 섹션**:
- 중앙 정렬
- 제목: "예약 안내" (`text-4xl`, 세리프, `font-bold`)
- 부제목: `text-gray-500`

**예약 안내 아코디언** (3개):
각 아코디언은 동일한 구조:
- 컨테이너: `border border-gray-100`, `rounded-3xl`, `overflow-hidden`
- 헤더 버튼:
  - 클릭 시 열림/닫힘
  - 아이콘 (왼쪽): `w-10 h-10 rounded-full`
    - 닫힘: `bg-gray-100 text-gray-400`
    - 열림: `bg-green-900 text-white`
  - 제목: 세리프, `font-bold`, `text-lg`
  - 플러스 아이콘 (오른쪽): 회전 효과 (`rotate-45`)
- 콘텐츠 영역:
  - 트랜지션: `max-h-[2000px] opacity-100` (열림) / `max-h-0 opacity-0` (닫힘)
  - 패딩: `p-8 md:p-12`

**아코디언 1: 예약 및 이용 안내**
- 아이콘: Info
- 내용:
  - **체크인 · 체크아웃**
    - 체크인: 오후 3시 (`text-gray-900 font-bold`)
    - 체크아웃: 오전 11시 (`text-gray-900 font-bold`)
    - 주의사항: 작은 텍스트, `text-gray-400`
  - **이용 인원**
    - 불릿 리스트 (`list-disc list-inside`)
  - **이용 시 유의사항**
    - 불릿 리스트
  - **바비큐 및 체험 프로그램**
    - 불릿 리스트
  - **안전 및 매너**
    - 불릿 리스트

**아코디언 2: 예약 취소 및 환불 규정**
- 아이콘: AlertCircle
- 경고 텍스트: "(성수기·비성수기 동일 적용)" (`text-xs text-red-500 font-bold`)
- 환불 규정 그리드:
  - 2열 (모바일) / 3열 (데스크톱)
  - 각 카드:
    - 날짜: `text-[10px] text-gray-400 font-bold uppercase`
    - 환불률: `text-sm font-bold`
    - 당일~2일 전: `bg-red-50 border-red-100`, `text-red-600`
- 하단 주의사항: 작은 텍스트, `text-gray-400`

**아코디언 3: 자주 묻는 질문 (FAQ)**
- 아이콘: HelpCircle
- 10개 FAQ 항목:
  - 각 항목: `bg-gray-50/50`, `rounded-2xl`, `border border-gray-100`
  - 질문: `font-bold text-gray-900`
  - 답변: `text-gray-500`, `leading-relaxed`

**예약 버튼 섹션**:
- 레이아웃: 2열 그리드 (`grid-cols-1 md:grid-cols-2`)
- **네이버 실시간 예약** (큰 카드):
  - 배경: `bg-green-700`
  - 패딩: `p-12`
  - 둥근 모서리: `rounded-[3rem]`
  - 아이콘: Calendar (`size={56}`)
  - 제목: "네이버 실시간 예약" (세리프, `text-2xl`)
  - 설명: `text-white/70`
  - 버튼: "바로가기" (`bg-white/10`, `rounded-full`)
  - 호버: `hover:bg-green-800`
- **전화 예약 / 상담** (작은 카드):
  - 배경: `bg-gray-100`
  - 패딩: `p-10`
  - 아이콘: Phone (`size={32}`)
  - 제목: "전화 예약 / 상담"
  - 번호: "010-0000-0000"
- **카카오톡 문의** (작은 카드):
  - 배경: `bg-[#FEE500]`
  - 패딩: `p-10`
  - 아이콘: MessageSquare (`size={32}`)
  - 제목: "카카오톡 문의"
  - 설명: "실시간 채팅 상담"

**스마트 오더 섹션**:
- 배경: `bg-gray-50`
- 패딩: `p-16`
- 둥근 모서리: `rounded-[4rem]`
- 레이아웃: 2열 (`flex-col md:flex-row`)
- 왼쪽:
  - 배지: "Digital Service" (`bg-black text-white`, `rounded-full`)
  - 제목: "투숙객 전용 스마트 오더" (세리프, `text-3xl md:text-4xl`)
  - 설명: `text-gray-500`
  - 3단계 카드:
    - 각 카드: `bg-white`, `rounded-2xl`, `border border-gray-200`
    - Step 번호: `text-[10px] font-bold text-gray-300 uppercase`
    - 단계명: `text-sm font-bold`
- 오른쪽:
  - QR 코드 아이콘: `w-56 h-56`, `bg-white`, `rounded-3xl`
  - 아이콘: QrCode (`size={140}`, `text-gray-100`)

**상태 관리**:
- `openGuide` 상태로 열린 아코디언 관리
- 클릭 시 토글

**반응형**:
- 모바일: 1열 레이아웃
- 데스크톱: 2열 레이아웃
```

---

## 📋 페이지 9: NOTICE (이용 안내)

### 프롬프트

```
Terrace 527 이용 안내 페이지를 구현해주세요. FAQ, 환불 규정, 유의사항을 제공하는 페이지입니다.

**기술 스택**: React + TypeScript + Tailwind CSS + React Router

**전체 구조**:
1. 헤더 섹션
2. 자주 묻는 질문 (FAQ) 섹션
3. 환불 규정 섹션
4. 유의 사항 섹션

**헤더 섹션**:
- 중앙 정렬
- 제목: "이용 안내" (`text-4xl`, 세리프, `font-bold`)
- 부제목: `text-gray-500`

**FAQ 섹션**:
- 제목: "자주 묻는 질문 (FAQ)" (`text-2xl`, 세리프, `font-bold`, 하단 보더)
- 컨테이너: `bg-white`, `rounded-3xl`, `shadow-sm`, `border border-gray-100`
- 패딩: `px-10`
- FAQ 항목들:
  - 각 항목: `border-b border-gray-100` (마지막 제외)
  - 버튼:
    - 전체 너비, `py-6`
    - 질문: `font-bold text-gray-800`
    - 아이콘: ChevronDown / ChevronUp (열림 상태에 따라)
    - 호버: `hover:text-green-800`
  - 답변 영역:
    - 열림: `pb-6`, `animate-in fade-in`
    - 답변: `text-sm text-gray-500`, `leading-relaxed`

**FAQ 목록** (4개):
1. "바베큐 신청은 어떻게 하나요?"
2. "반려동물 동반이 가능한가요?"
3. "겨울에도 따뜻한가요?"
4. "주변에 편의점이 있나요?"

**환불 규정 섹션**:
- 제목: "환불 규정" (`text-2xl`, 세리프, `font-bold`, 하단 보더)
- 컨테이너: `bg-gray-50`, `p-10`, `rounded-[3rem]`, `border border-gray-100`
- 경고 텍스트: "* 올바른 예약문화 정착을 위해 신중한 예약 부탁드립니다." (`text-red-600 font-bold`)
- 환불 규정 그리드:
  - 2열 (모바일) / 4열 (데스크톱)
  - 각 카드:
    - 배경: `bg-white`
    - 패딩: `p-6`
    - 둥근 모서리: `rounded-2xl`
    - 테두리: `border border-gray-200`
    - 날짜: `text-[10px] text-gray-400 font-bold uppercase`
    - 환불률: `font-bold`
    - 당일~2일 전: `text-red-600`
- 하단 주의사항: `text-[11px] text-gray-400`, `leading-relaxed`

**환불 규정 목록**:
- 10일 전: 100% 환불
- 7일 전: 70% 환불
- 3일 전: 30% 환불
- 당일~2일 전: 환불 불가 (빨간색 강조)

**유의 사항 섹션**:
- 제목: "유의 사항" (`text-2xl`, 세리프, `font-bold`, 하단 보더)
- 리스트:
  - 각 항목: `flex gap-4 items-start`
  - 불릿: `w-1.5 h-1.5 bg-red-400 rounded-full`
  - 텍스트: `text-sm text-gray-600`, `leading-relaxed`

**유의 사항 목록** (5개):
1. "전 객실 금연구역입니다. 지정된 장소에서만 흡연해 주세요."
2. "개인 화기(가스버너, 전기그릴, 촛불 등)의 지참 및 사용을 엄격히 금지합니다."
3. "오후 10시부터는 매너타임입니다. 고성방가 및 소음 발생에 각별히 유의해 주세요."
4. "시설물 파손 및 침구 오염 시 배상 책임이 발생할 수 있습니다."
5. "미성년자는 부모님 동행 없이 이용이 불가합니다."

**상태 관리**:
- 각 FAQ 항목별 `isOpen` 상태 관리
- 클릭 시 토글

**반응형**:
- 모바일: 1열 레이아웃, 작은 텍스트
- 데스크톱: 2-4열 그리드
```

---

## 🎨 디자인 가이드라인 요약

### 공통 디자인 원칙
1. **여백**: 넉넉한 여백 사용 (`py-24`, `py-32`, `gap-16`, `gap-20`)
2. **둥근 모서리**: 큰 반경 사용 (`rounded-2xl`, `rounded-3xl`, `rounded-[2.5rem]`)
3. **그림자**: 부드러운 그림자 (`shadow-xl`, `shadow-2xl`)
4. **트랜지션**: 부드러운 애니메이션 (`duration-300`, `duration-700`, `duration-1000`)
5. **타이포그래피**: 세리프 폰트는 제목에만, 본문은 산세리프
6. **색상**: 에메랄드 그린을 주요 색상으로 사용, 페이지별로 보조 색상 변경

### 이미지 처리
- 모든 이미지는 `object-cover` 사용
- 호버 시 확대 효과 (`group-hover:scale-110`)
- 긴 트랜지션 시간 (`duration-[3000ms]`)

### 반응형 브레이크포인트
- 모바일: 기본 (1열)
- 태블릿: `md:` (768px 이상)
- 데스크톱: `lg:` (1024px 이상)

---

## 📝 구현 시 주의사항

1. **이미지 경로**: 모든 이미지는 `IMAGE/` 폴더에 있으며 `.webp` 형식
2. **라우팅**: HashRouter 사용 (`/#/path`)
3. **상태 관리**: React Hooks (useState, useEffect) 사용
4. **아이콘**: Lucide React 라이브러리 사용
5. **폰트**: Google Fonts에서 로드 (Noto Serif KR, Pretendard)
6. **스타일링**: Tailwind CSS CDN 사용 (또는 빌드 설정)
7. **애니메이션**: Tailwind의 `animate-in` 유틸리티 또는 CSS 트랜지션 사용

---

이 프롬프트들을 사용하여 각 페이지를 독립적으로 구현할 수 있습니다. 각 프롬프트는 해당 페이지의 모든 세부사항을 포함하고 있으므로, AI 툴에 그대로 제공하면 동일한 디자인과 기능을 가진 페이지를 생성할 수 있습니다.
