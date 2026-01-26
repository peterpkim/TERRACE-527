# GitHub Pages 배포 가능성 체크리스트

## ✅ 확인 완료 항목

### 1. index.html 위치
- ✅ **상태**: 루트 디렉토리에 위치 (`/index.html`)
- ✅ **결과**: GitHub Pages가 자동으로 인식 가능

### 2. 라우터 설정
- ✅ **상태**: `HashRouter` 사용 (`App.tsx`에서 확인)
- ✅ **결과**: GitHub Pages에서 라우팅 정상 작동
- ✅ **이유**: HashRouter는 `#` 기반 라우팅으로 서버 설정 불필요

### 3. Base 경로 설정
- ✅ **상태**: `vite.config.ts`에서 `base: './'` 설정됨
- ✅ **결과**: 상대 경로 사용으로 서브디렉토리 호스팅 가능

### 4. 이미지 경로
- ✅ **상태**: `IMAGE/...` 형식의 상대 경로 사용
- ✅ **결과**: 빌드 시 `dist/IMAGE/`로 복사되어 정상 작동

### 5. 빌드 설정
- ✅ **상태**: `dist` 폴더로 빌드 출력
- ✅ **결과**: GitHub Pages가 `dist` 또는 루트에서 서빙 가능

## ⚠️ 수정 필요 항목

### 1. index.html의 script 경로
- ❌ **문제**: 절대 경로 `/index.tsx` 사용
- ⚠️ **영향**: GitHub Pages 서브디렉토리에서 깨질 수 있음
- ✅ **해결**: 상대 경로로 변경 필요

**현재:**
```html
<script type="module" src="/index.tsx"></script>
```

**수정 필요:**
```html
<script type="module" src="./index.tsx"></script>
```

## 📋 배포 준비 체크리스트

### 필수 확인사항
- [x] index.html이 루트에 위치
- [x] HashRouter 사용
- [x] base 경로 설정 (`./`)
- [x] 이미지 상대 경로 사용
- [ ] index.html script 경로 수정 (필요)
- [ ] .gitignore에 dist 제외 확인
- [ ] 빌드 테스트 완료

### 선택 확인사항
- [ ] 404.html 파일 추가 (선택)
- [ ] CNAME 파일 (커스텀 도메인 사용 시)
- [ ] 환경 변수 확인 (필요한 경우)

## 🚀 배포 방법

### 방법 1: GitHub Actions 사용 (추천)

1. `.github/workflows/deploy.yml` 파일 생성
2. 빌드 및 배포 자동화

### 방법 2: 수동 배포

1. `npm run build` 실행
2. `dist` 폴더 내용을 `gh-pages` 브랜치에 푸시
3. GitHub Settings에서 Pages 설정

## ⚠️ 주의사항

1. **절대 경로 사용 금지**: 모든 경로는 상대 경로로 작성
2. **환경 변수**: GitHub Pages는 환경 변수를 지원하지 않음
3. **API 키**: 클라이언트에 노출되므로 주의 필요
4. **네이버 지도 API**: 서비스 URL에 GitHub Pages 도메인 등록 필요

## 📝 다음 단계

1. index.html의 script 경로 수정
2. 빌드 테스트
3. GitHub Pages 배포 설정
4. 배포 후 테스트
