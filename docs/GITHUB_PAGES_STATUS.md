# GitHub Pages 주의사항 해결 상태

## ⚠️ 주의사항별 해결 여부

### 1. 절대 경로 사용 금지 ✅ **해결 완료**

**상태**: `index.html`에서 상대 경로로 수정 완료

**수정된 코드:**
```html
<script type="module" src="./index.tsx"></script>
```

**해결 내용**:
- 절대 경로(`/index.tsx`) → 상대 경로(`./index.tsx`)로 변경
- GitHub Pages 서브디렉토리 호스팅에서도 정상 작동

**영향도**: ✅ 해결됨

---

### 2. 환경 변수 ⚠️ **부분 해결**

**상태**: 빌드 타임에 환경 변수 주입 설정됨

**현재 설정** (`vite.config.ts`):
```typescript
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.NAVER_MAP_CLIENT_ID': JSON.stringify(env.VITE_NAVER_MAP_CLIENT_ID || env.NAVER_MAP_CLIENT_ID || '')
}
```

**문제점**:
- GitHub Actions에서 빌드할 때 환경 변수가 없으면 빈 문자열로 주입됨
- GitHub Pages는 환경 변수를 지원하지 않음

**해결 방법**:
1. GitHub Actions Secrets에 환경 변수 설정
2. `.github/workflows/deploy-pages.yml`에서 환경 변수 주입

**영향도**: 🟡 중간 - 환경 변수가 없으면 일부 기능 작동 안 함

**현재 사용처**:
- `GEMINI_API_KEY`: 코드에서 직접 사용하는지 확인 필요
- `NAVER_MAP_CLIENT_ID`: `pages/Home.tsx`에서 `import.meta.env`로 사용 중

---

### 3. API 키 노출 ⚠️ **의도적 노출 (필요)**

**상태**: 네이버 지도 API Client ID가 클라이언트에 노출됨

**현재 코드** (`pages/Home.tsx`):
```typescript
const clientId = (import.meta.env.VITE_NAVER_MAP_CLIENT_ID || import.meta.env.NAVER_MAP_CLIENT_ID || 'fbpx62bug8').trim();
script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
```

**분석**:
- ✅ **정상**: 네이버 지도 API는 Client ID를 클라이언트에서 사용해야 함
- ✅ **보안**: Client ID는 공개되어도 되는 값 (Secret이 아님)
- ⚠️ **주의**: 하드코딩된 기본값(`'fbpx62bug8'`)이 있음

**권장사항**:
- 하드코딩된 기본값 제거 (프로덕션에서는 환경 변수 필수)
- Client ID는 공개되어도 되지만, 서비스 URL 제한으로 보안 유지

**영향도**: 🟢 낮음 - 네이버 지도 API 설계상 정상

---

### 4. 네이버 지도 API 서비스 URL 등록 ✅ **등록 완료**

**상태**: 네이버 클라우드 플랫폼 콘솔에 GitHub Pages URL 등록 완료

**등록된 URL**:
- ✅ `https://peterpkim.github.io`
- ✅ `https://peterpkim.github.io/terrace-527-homepage-test3`

**추가 권장 URL** (로컬 개발용):
- `http://localhost:3000`
- `http://localhost:5173`

**영향도**: ✅ 해결됨 - 지도 API 정상 작동 가능

---

## 📋 해결 필요 항목 우선순위

### ✅ 완료된 항목

1. **index.html script 경로 수정** ✅
   - 절대 경로(`/index.tsx`) → 상대 경로(`./index.tsx`) 완료

2. **네이버 지도 API 서비스 URL 등록** ✅
   - GitHub Pages URL 등록 완료

### 🟡 중요 (배포 전 권장)

2. **GitHub Actions 환경 변수 설정**
   - Secrets에 `VITE_NAVER_MAP_CLIENT_ID` 추가
   - 워크플로우에서 환경 변수 주입

3. **네이버 지도 API 서비스 URL 등록**
   - GitHub Pages 도메인 등록
   - 배포 후 테스트

### 🟢 선택 (기능 개선)

4. **하드코딩된 API 키 제거**
   - `pages/Home.tsx`의 기본값 제거
   - 환경 변수 필수로 변경

---

## ✅ 해결 완료 항목

- ✅ Base 경로 설정 (`base: './'`)
- ✅ HashRouter 사용 (GitHub Pages 호환)
- ✅ 이미지 상대 경로 사용
- ✅ 빌드 설정 완료
- ✅ GitHub Actions 워크플로우 생성

---

## 🚀 다음 단계

1. **즉시 수정 필요**:
   ```html
   <!-- index.html -->
   <script type="module" src="./index.tsx"></script>
   ```

2. **GitHub Actions Secrets 설정**:
   - Repository → Settings → Secrets and variables → Actions
   - `VITE_NAVER_MAP_CLIENT_ID` 추가

3. **네이버 지도 API 서비스 URL 등록**:
   - 배포 후 실제 URL로 등록

4. **배포 후 테스트**:
   - 모든 페이지 로드 확인
   - 이미지 로드 확인
   - 지도 API 작동 확인
