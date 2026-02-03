# 버그 수정 완료 요약

## ✅ Bug 1: 중복 Script 태그 수정 완료

### 발견된 문제
- `terrace-527-website/index.html` 파일에 두 개의 script 태그 존재
  - 라인 48: `<script type="module" src="index.tsx"></script>` (상대 경로)
  - 라인 49: `<script type="module" src="/index.tsx"></script>` (절대 경로)

### 문제점
- React 앱이 두 번 초기화되어 충돌 발생
- 상태 충돌 및 예측 불가능한 동작
- GitHub Pages 서브디렉토리에서 절대 경로가 깨짐

### 수정 내용
- ✅ 중복 script 태그 제거
- ✅ 상대 경로(`./index.tsx`) 하나만 유지
- ✅ 불필요한 importmap 제거
- ✅ 존재하지 않는 `/index.css` 링크 제거

### 수정된 파일
- `terrace-527-website/index.html`

---

## ✅ Bug 2: 하드코딩된 Base 경로 수정 완료

### 발견된 문제
- `vite.config.ts`에서 리포지토리 이름을 하드코딩: `/terrace-527-homepage-test3/`
- 실제 리포지토리 이름이 다를 수 있음
- GitHub Pages URL과 base 경로 불일치로 에셋 로딩 실패

### 문제점
- 리포지토리 이름 변경 시 수동 수정 필요
- 다른 리포지토리로 배포 시 경로 오류
- 모든 에셋(이미지, JS, CSS) 로딩 실패

### 수정 내용
- ✅ Base 경로를 동적으로 설정
- ✅ GitHub Actions에서 `GITHUB_REPOSITORY_NAME` 환경 변수 전달
- ✅ `vite.config.ts`에서 환경 변수로 리포지토리 이름 읽기

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

### 수정된 파일
- `vite.config.ts`
- `.github/workflows/deploy-pages.yml`

---

## 빌드 테스트

### 로컬 빌드 테스트
```bash
npm run build
```

### GitHub Pages 빌드 테스트
```bash
npm run build:test-script
```

또는:
```powershell
$env:GITHUB_PAGES = "true"
$env:GITHUB_REPOSITORY_NAME = "terrace-527-homepage-test3"
npm run build
```

---

## 다음 단계

1. **코드 커밋 및 푸시**
   ```bash
   git add .
   git commit -m "Fix: Remove duplicate script tags and use dynamic base path"
   git push origin main
   ```

2. **GitHub Pages 설정 확인**
   - Settings → Pages → Source = "GitHub Actions"

3. **배포 확인**
   - Actions 탭에서 빌드 성공 확인
   - https://peterpkim.github.io/terrace-527-homepage-test3/ 접속

4. **기능 테스트**
   - 모든 페이지 로드 확인
   - 이미지 로드 확인
   - 라우팅 작동 확인

---

## 수정 완료 체크리스트

- [x] 중복 script 태그 제거
- [x] Base 경로 동적 설정
- [x] GitHub Actions 환경 변수 추가
- [x] 빌드 테스트 스크립트 업데이트
- [ ] 빌드 테스트 실행
- [ ] 코드 푸시
- [ ] 배포 확인
