# GitHub Pages 배포 가이드

## 배포 가능성 확인 결과

### ✅ 준비 완료 항목

1. **index.html 위치**: 루트 디렉토리에 위치 ✓
2. **라우터**: HashRouter 사용 (GitHub Pages 호환) ✓
3. **Base 경로**: `./` 상대 경로 설정 ✓
4. **이미지 경로**: 상대 경로 사용 ✓
5. **빌드 설정**: `dist` 폴더로 출력 ✓

### ✅ 수정 완료

- **index.html script 경로**: 절대 경로(`/index.tsx`) → 상대 경로(`./index.tsx`)로 수정 완료

## 배포 방법

### 방법 1: GitHub Actions 자동 배포 (추천)

#### 1단계: GitHub Actions 워크플로우 확인

`.github/workflows/deploy-pages.yml` 파일이 생성되었습니다.

#### 2단계: GitHub 저장소 설정

1. GitHub 저장소로 이동
2. **Settings** → **Pages** 메뉴 선택
3. **Source**에서 **GitHub Actions** 선택
4. 저장

#### 3단계: 코드 푸시

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

#### 4단계: 배포 확인

- **Actions** 탭에서 배포 진행 상황 확인
- 배포 완료 후 `https://[username].github.io/[repository-name]` 접속

### 방법 2: 수동 배포 (gh-pages 브랜치)

#### 1단계: 빌드

```bash
npm run build
```

#### 2단계: gh-pages 브랜치에 배포

```bash
# gh-pages 설치 (한 번만)
npm install --save-dev gh-pages

# package.json에 배포 스크립트 추가 후
npm run deploy
```

#### 3단계: package.json에 스크립트 추가

```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

## 배포 후 확인사항

### 필수 확인

- [ ] 홈페이지 로드 확인
- [ ] 이미지 로드 확인
- [ ] 라우팅 작동 확인 (모든 페이지)
- [ ] 모바일 반응형 확인

### 문제 해결

#### 이미지가 안 보일 때

1. `dist/IMAGE` 폴더 확인
2. 이미지 경로가 상대 경로인지 확인
3. 브라우저 개발자 도구에서 404 오류 확인

#### 라우팅이 안 될 때

- HashRouter 사용 확인
- URL에 `#` 포함 확인 (예: `https://site.com/#/story`)

#### 404 오류

- `index.html`이 루트에 있는지 확인
- GitHub Pages 설정에서 Source 확인

## 커스텀 도메인 설정 (선택)

1. `dist` 폴더에 `CNAME` 파일 생성
2. 도메인 이름 입력 (예: `terrace527.com`)
3. DNS 설정에서 GitHub Pages IP로 연결

## 환경 변수 주의사항

GitHub Pages는 환경 변수를 지원하지 않습니다.

### 해결 방법

1. **빌드 타임에 주입**: `vite.config.ts`에서 환경 변수 처리
2. **런타임 설정**: 설정 파일을 public 폴더에 배치
3. **API 키**: 클라이언트에 노출되므로 주의 필요

## 네이버 지도 API 설정

GitHub Pages 배포 시:

1. 네이버 클라우드 플랫폼에서 서비스 URL 추가
2. GitHub Pages 도메인 등록:
   - `https://[username].github.io`
   - `https://[username].github.io/[repository-name]`
   - 커스텀 도메인 사용 시 해당 도메인도 등록

## 배포 URL 형식

### 기본 URL
```
https://[username].github.io/[repository-name]
```

### 예시
```
https://username.github.io/terrace-527-website
```

## 빌드 최적화

배포 전 확인:

- [ ] 빌드 성공 확인
- [ ] `dist` 폴더 크기 확인
- [ ] 불필요한 파일 제외 확인
- [ ] 이미지 최적화 확인

## 문제 해결

### 배포 실패 시

1. **Actions 탭 확인**: 에러 로그 확인
2. **빌드 로컬 테스트**: `npm run build` 로컬에서 실행
3. **의존성 확인**: `package.json` 확인

### 페이지가 업데이트되지 않을 때

1. 브라우저 캐시 삭제
2. GitHub Actions에서 재배포 실행
3. 배포 시간 확인 (몇 분 소요될 수 있음)

## 추천 워크플로우

1. 코드 수정
2. `git push origin main`
3. GitHub Actions 자동 빌드 및 배포
4. 배포 완료 후 확인

---

**참고**: 이 프로젝트는 GitHub Pages 배포에 최적화되어 있습니다.
