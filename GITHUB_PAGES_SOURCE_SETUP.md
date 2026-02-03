# GitHub Pages Source 설정 가이드

## 📋 현재 프로젝트 분석

**프로젝트 타입**: React + Vite (빌드 필요)
- ✅ `package.json`에 `build` 스크립트 존재
- ✅ `.github/workflows/deploy-pages.yml` 워크플로우 설정 완료
- ✅ 빌드 후 `dist/` 폴더 생성

**결론**: **GitHub Actions**를 선택해야 합니다.

---

## ✅ 올바른 설정: GitHub Actions 선택

### 설정 방법

1. **GitHub 저장소로 이동**
   - 저장소 페이지 → **Settings** 탭 클릭

2. **Pages 설정으로 이동**
   - 왼쪽 사이드바에서 **Pages** 클릭

3. **Build and deployment 섹션 설정**
   ```
   Source: [GitHub Actions] ← 이 옵션 선택
   ```

4. **저장**
   - 설정이 자동으로 저장됩니다

### 확인 사항

설정 후 다음을 확인하세요:

- ✅ **Source**가 "GitHub Actions"로 표시됨
- ✅ 워크플로우가 자동으로 실행됨 (Actions 탭에서 확인)
- ✅ 배포 완료 후 사이트 URL이 표시됨

---

## ❌ 잘못된 설정: Deploy from a branch (사용하지 않음)

### 왜 사용하면 안 되나요?

**"Deploy from a branch"** 옵션은:
- ✅ 단순 HTML/CSS/JS 파일만 있는 경우
- ✅ 빌드 과정이 없는 정적 파일만 있는 경우
- ❌ React/Vue/Next.js 등 빌드가 필요한 프로젝트에는 **사용 불가**

### 만약 잘못 선택했다면?

1. **문제점**:
   - 빌드되지 않은 소스 코드만 배포됨
   - React 컴포넌트가 작동하지 않음
   - `node_modules`가 없어 의존성 오류 발생

2. **해결 방법**:
   - Settings → Pages → Source를 **"GitHub Actions"**로 변경

---

## 🔍 프로젝트별 Source 선택 가이드

### 1. 단순 HTML 프로젝트
```
프로젝트 구조:
├── index.html
├── style.css
├── script.js
└── images/

✅ Source: Deploy from a branch
   - Branch: main (또는 gh-pages)
   - Folder: / (root)
```

### 2. React/Vue/Vite 프로젝트 (현재 프로젝트)
```
프로젝트 구조:
├── package.json
├── vite.config.ts (또는 webpack.config.js)
├── src/
└── .github/workflows/deploy-pages.yml

✅ Source: GitHub Actions
   - 워크플로우가 자동으로 빌드 및 배포 처리
```

### 3. Next.js 프로젝트
```
프로젝트 구조:
├── package.json
├── next.config.js
└── .github/workflows/deploy-pages.yml

✅ Source: GitHub Actions
   - Next.js는 정적 내보내기(export) 후 배포
```

### 4. Jekyll 프로젝트
```
프로젝트 구조:
├── _config.yml
├── _posts/
└── index.html

✅ Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Jekyll은 GitHub에서 자동 빌드
```

---

## 📝 현재 프로젝트의 워크플로우 확인

### `.github/workflows/deploy-pages.yml` 내용

현재 프로젝트는 다음 워크플로우가 설정되어 있습니다:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        env:
          GITHUB_PAGES: 'true'
          GITHUB_REPOSITORY_NAME: ${{ github.event.repository.name }}
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
  
  deploy:
    environment:
      name: github-pages
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### 워크플로우 동작 방식

1. **트리거**: `main` 브랜치에 푸시 시 자동 실행
2. **빌드**: `npm run build` 실행 → `dist/` 폴더 생성
3. **배포**: `dist/` 폴더를 GitHub Pages에 업로드

---

## 🚀 배포 확인 방법

### 1. GitHub Actions 탭에서 확인

1. 저장소 → **Actions** 탭 클릭
2. "Deploy to GitHub Pages" 워크플로우 확인
3. ✅ 초록색 체크 표시 = 배포 성공
4. ❌ 빨간색 X 표시 = 배포 실패 (로그 확인)

### 2. Pages 설정에서 확인

1. Settings → Pages
2. **Your site is live at** 섹션에서 URL 확인
3. URL 클릭하여 사이트 접속 테스트

### 3. 배포 URL 형식

```
https://[username].github.io/[repository-name]/
```

예시:
```
https://yourusername.github.io/Terrace527-homepage-ver01/
```

---

## ⚠️ 주의사항

### 환경 변수 설정

프로젝트에서 사용하는 환경 변수가 있다면 GitHub Secrets에 설정해야 합니다:

1. Settings → Secrets and variables → Actions
2. **New repository secret** 클릭
3. 다음 변수 추가 (필요한 경우):
   - `VITE_NAVER_MAP_CLIENT_ID`
   - `GEMINI_API_KEY`

### 첫 배포 시 시간

- 첫 배포는 5-10분 정도 소요될 수 있습니다
- 이후 배포는 2-3분 정도 소요됩니다

### 빌드 실패 시

1. Actions 탭에서 실패한 워크플로우 클릭
2. 빌드 단계의 로그 확인
3. 일반적인 원인:
   - 환경 변수 누락
   - 의존성 설치 실패
   - 빌드 스크립트 오류

---

## ✅ 최종 확인 체크리스트

배포 전 다음을 확인하세요:

- [ ] Settings → Pages → Source가 **"GitHub Actions"**로 설정됨
- [ ] `.github/workflows/deploy-pages.yml` 파일이 존재함
- [ ] `package.json`에 `build` 스크립트가 있음
- [ ] 필요한 환경 변수가 GitHub Secrets에 설정됨
- [ ] `main` 브랜치에 코드가 푸시됨
- [ ] Actions 탭에서 워크플로우가 실행 중이거나 완료됨

---

## 📞 문제 해결

### Source 옵션이 보이지 않는 경우

1. 저장소가 Public이거나 GitHub Pro 계정인지 확인
2. 저장소 Settings에 접근 권한이 있는지 확인

### 배포가 실패하는 경우

1. Actions 탭에서 로그 확인
2. 빌드 오류 메시지 확인
3. 환경 변수 설정 확인
4. `package.json`의 `build` 스크립트 확인

---

## 🎯 요약

**현재 프로젝트 (React + Vite)**:
- ✅ **Source: GitHub Actions** 선택
- ✅ 워크플로우가 자동으로 빌드 및 배포 처리
- ✅ `main` 브랜치 푸시 시 자동 배포

**단순 HTML 프로젝트**:
- ✅ **Source: Deploy from a branch** 선택
- ✅ Branch: `main`, Folder: `/`
