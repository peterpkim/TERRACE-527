# 버그 수정 완료

## Bug 1: 중복 Script 태그 ✅ 수정 완료

### 문제
- `terrace-527-website/index.html`에 두 개의 script 태그가 있었음
- 라인 48: `src="index.tsx"` (상대 경로)
- 라인 49: `src="/index.tsx"` (절대 경로)
- 이로 인해 React 앱이 두 번 초기화되어 충돌 발생

### 수정 내용
- 중복 script 태그 제거
- 상대 경로(`./index.tsx`) 하나만 유지
- 불필요한 importmap 및 CSS 링크 제거

### 수정된 파일
- `terrace-527-website/index.html`

## Bug 2: 하드코딩된 Base 경로 ✅ 수정 완료

### 문제
- `vite.config.ts`에서 리포지토리 이름을 하드코딩: `/terrace-527-homepage-test3/`
- 실제 리포지토리 이름이 다를 수 있음
- GitHub Pages URL과 base 경로가 불일치하여 에셋 로딩 실패

### 수정 내용
- Base 경로를 동적으로 설정
- GitHub Actions에서 `GITHUB_REPOSITORY_NAME` 환경 변수 전달
- `vite.config.ts`에서 환경 변수로 리포지토리 이름 읽기

### 수정된 파일
- `vite.config.ts`: 동적 base 경로 설정
- `.github/workflows/deploy-pages.yml`: 리포지토리 이름 환경 변수 추가

### 수정 전
```typescript
base: process.env.GITHUB_PAGES === 'true' ? '/terrace-527-homepage-test3/' : './'
```

### 수정 후
```typescript
base: process.env.GITHUB_PAGES === 'true' && process.env.GITHUB_REPOSITORY_NAME 
  ? `/${process.env.GITHUB_REPOSITORY_NAME}/` 
  : './'
```

## 추가 개선사항

### terrace-527-website/index.html 정리
- 불필요한 importmap 제거 (Vite가 자동 처리)
- 존재하지 않는 `/index.css` 링크 제거

## 테스트 권장사항

1. **로컬 빌드 테스트**:
   ```bash
   npm run build
   ```

2. **GitHub Pages 빌드 테스트**:
   ```bash
   $env:GITHUB_PAGES = "true"
   $env:GITHUB_REPOSITORY_NAME = "terrace-527-homepage-test3"
   npm run build
   ```

3. **배포 후 확인**:
   - 모든 에셋이 정상 로드되는지 확인
   - 라우팅이 정상 작동하는지 확인
   - 이미지가 정상 표시되는지 확인

## 다음 단계

1. 코드 커밋 및 푸시
2. GitHub Actions에서 빌드 확인
3. 배포 후 실제 URL에서 테스트
