# GitHub Pages 문제 해결 가이드

## 페이지가 안 나오는 주요 원인

### 1. GitHub Pages 설정 문제 ⚠️ **가장 흔한 원인**

**문제**: GitHub Desktop으로 업로드만 했고, GitHub Pages 설정을 하지 않았을 수 있습니다.

**해결 방법**:
1. GitHub 저장소로 이동: https://github.com/peterpkim/terrace-527-homepage-test3
2. **Settings** → **Pages** 메뉴 선택
3. **Source**에서 **GitHub Actions** 선택 (중요!)
4. 저장

**주의**: 
- "Deploy from a branch"를 선택하면 안 됩니다
- 반드시 **"GitHub Actions"**를 선택해야 합니다

### 2. GitHub Actions가 실행되지 않음

**확인 방법**:
1. GitHub 저장소의 **Actions** 탭 확인
2. 워크플로우가 실행되었는지 확인
3. 빌드가 성공했는지 확인

**해결 방법**:
- 코드를 다시 푸시하면 자동으로 실행됩니다
- 또는 Actions 탭에서 "Run workflow" 버튼 클릭

### 3. 빌드 실패

**확인 방법**:
- Actions 탭에서 빌드 로그 확인
- 에러 메시지 확인

**가능한 원인**:
- 환경 변수 누락 (Secrets에 설정 필요)
- 의존성 설치 실패
- TypeScript 오류

### 4. Base 경로 문제

**현재 설정**: `base: './'` (상대 경로)

**GitHub Pages 서브디렉토리 호스팅**:
- URL: `https://peterpkim.github.io/terrace-527-homepage-test3/`
- 이 경우 base를 `/terrace-527-homepage-test3/`로 설정해야 할 수 있음

**해결 방법**:
- 환경에 따라 base 경로 조정 필요

### 5. index.html 경로 문제

**현재**: `src="./index.tsx"` (상대 경로) ✅

이것은 올바릅니다.

## 빌드 테스트 및 수정
