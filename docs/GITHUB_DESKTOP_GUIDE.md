# GitHub Desktop 사용 가이드

## 1. GitHub Desktop 설치

1. [GitHub Desktop 다운로드](https://desktop.github.com/) 페이지 방문
2. **Download for Windows** 클릭하여 설치
3. 설치 후 GitHub 계정으로 로그인

## 2. 저장소 열기

### 방법 1: 기존 로컬 저장소 추가
1. GitHub Desktop 실행
2. **File** → **Add Local Repository** 클릭
3. 프로젝트 폴더 선택:
   ```
   C:\Users\seung\Downloads\테라스-527-글램핑-&-펜션_fin (1)
   ```
4. **Add repository** 클릭

### 방법 2: GitHub에서 클론
1. GitHub Desktop 실행
2. **File** → **Clone Repository** 클릭
3. GitHub에서 저장소 URL 복사 후 입력
4. 로컬 경로 선택
5. **Clone** 클릭

## 3. GitHub에 저장소 생성 및 연결

### 저장소가 아직 GitHub에 없는 경우:

1. **File** → **Publish repository** 클릭
   - 또는 상단 메뉴에서 **Repository** → **Publish repository** 선택

2. 저장소 설정:
   - **Name**: `terrace-527-website` (또는 원하는 이름)
   - **Description**: "테라스 527 글램핑 & 펜션 웹사이트" (선택사항)
   - **Keep this code private**: 체크 여부 선택
   - **Organization**: 개인 계정 사용 시 비워두기

3. **Publish repository** 클릭

### 이미 GitHub에 저장소가 있는 경우:

1. **Repository** → **Repository settings** 클릭
2. **Remote** 탭에서 원격 저장소 URL 확인/추가
3. 또는 **Repository** → **Pull** 또는 **Push** 메뉴 사용

## 4. 변경사항 커밋 및 푸시

### 변경사항 확인
- 왼쪽 패널에서 변경된 파일 목록 확인
- 각 파일을 클릭하여 변경 내용(diff) 확인

### 커밋 작성
1. 왼쪽 하단 **Summary**에 커밋 메시지 입력
   - 예: "프로젝트 초기 설정"
   - 예: "홈페이지 UI 개선"
   
2. (선택) **Description**에 상세 설명 추가

3. 커밋할 파일 선택:
   - 전체 커밋: 모든 파일 자동 선택
   - 일부만 커밋: 원하는 파일만 체크박스 선택

4. **Commit to main** 버튼 클릭

### GitHub에 업로드 (Push)
1. 상단 메뉴에서 **Repository** → **Push** 클릭
   - 또는 오른쪽 상단의 **Push origin** 버튼 클릭
   
2. 첫 푸시 시 인증 요청:
   - GitHub 계정 로그인 정보 입력
   - Personal Access Token 필요할 수 있음

## 5. 이후 업로드 프로세스

변경사항이 있을 때마다:

1. **변경사항 확인** (자동으로 감지됨)
2. **Summary에 커밋 메시지 작성**
3. **Commit to main** 클릭
4. **Push origin** 클릭

## 6. 주의사항

### 커밋 전 확인사항
- ✅ `.gitignore`에 포함된 파일은 자동으로 제외됨
- ✅ 민감한 정보(API 키, 비밀번호 등)는 커밋하지 않기
- ✅ `node_modules`, `dist` 폴더는 자동 제외됨

### 현재 상태
현재 다음 파일들이 변경되었습니다:
- `.gitignore` (수정됨)
- `package.json` (수정됨)
- `TERRACE-527/` (새 폴더, 추적되지 않음)

이 파일들을 커밋하려면:
1. GitHub Desktop에서 해당 파일들 확인
2. 커밋 메시지 작성
3. 커밋 후 푸시

## 7. 유용한 기능

### 브랜치 관리
- **Branch** → **New branch**: 새 브랜치 생성
- **Branch** → **Merge into current branch**: 브랜치 병합

### 히스토리 확인
- **History** 탭: 커밋 히스토리 확인
- 각 커밋 클릭하여 상세 내용 확인

### 충돌 해결
- **Repository** → **Pull**: 원격 저장소 변경사항 가져오기
- 충돌 발생 시 GitHub Desktop에서 시각적으로 해결 가능

## 8. 문제 해결

### 인증 오류
- **File** → **Options** → **Accounts**에서 계정 재연결
- Personal Access Token 생성 필요 시:
  1. GitHub → Settings → Developer settings → Personal access tokens
  2. **Generate new token (classic)** 클릭
  3. `repo` 권한 선택
  4. 토큰 생성 후 GitHub Desktop에서 사용

### 푸시 실패
- 인터넷 연결 확인
- 원격 저장소 URL 확인: **Repository** → **Repository settings** → **Remote**
- **Repository** → **Pull** 먼저 실행 후 다시 푸시 시도

## 9. 빠른 시작 체크리스트

- [ ] GitHub Desktop 설치 및 로그인
- [ ] 로컬 저장소 추가 (File → Add Local Repository)
- [ ] GitHub에 저장소 생성 (File → Publish repository)
- [ ] 변경사항 커밋 (Summary 작성 → Commit to main)
- [ ] GitHub에 푸시 (Push origin)
