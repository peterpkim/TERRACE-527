# 테라스 527 | 산정호수 글램핑 & 펜션

테라스 527 글램핑 & 펜션 공식 웹사이트입니다.

## 기술 스택

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Routing**: React Router v7 (HashRouter)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 빠른 시작

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
VITE_NAVER_MAP_CLIENT_ID=your_naver_map_client_id_here
GEMINI_API_KEY=your_gemini_api_key_here
```

## 네이버 지도 API 설정

네이버 지도 API를 사용하려면 다음 설정이 필요합니다:

1. [네이버 클라우드 플랫폼](https://www.ncloud.com/)에서 Maps API Application 등록
2. Client ID 발급 후 `.env.local`에 설정
3. 서비스 URL 등록 필수

자세한 설정 방법은 [NAVER_MAP_API_SETUP.md](./NAVER_MAP_API_SETUP.md)를 참고하세요.

## 배포

### GitHub Pages

이 프로젝트는 GitHub Pages 배포를 지원합니다.

1. GitHub 저장소에 코드 푸시
2. Settings → Pages → Source에서 **GitHub Actions** 선택
3. 자동으로 빌드 및 배포됩니다

자세한 배포 가이드는 [docs/GITHUB_PAGES_DEPLOY.md](./docs/GITHUB_PAGES_DEPLOY.md)를 참고하세요.

## 프로젝트 구조

```
├── components/          # 재사용 가능한 컴포넌트
├── pages/              # 페이지 컴포넌트
├── data/               # 정적 데이터
├── IMAGE/              # 이미지 파일
├── docs/               # 문서 가이드
├── .github/            # GitHub Actions 워크플로우
├── index.html          # 진입점 HTML
├── index.tsx            # React 진입점
├── App.tsx             # 메인 앱 컴포넌트
└── vite.config.ts      # Vite 설정
```

## 주요 기능

- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 네이버 지도 API 연동
- ✅ 이미지 갤러리
- ✅ 라우팅 (HashRouter)
- ✅ GitHub Pages 배포 지원

## 문서

자세한 문서는 [docs](./docs/) 폴더를 참고하세요.

## 라이선스

Private
