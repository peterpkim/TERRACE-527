# GitHub 업로드 가이드

프로젝트를 GitHub에 업로드하는 단계별 가이드입니다.

## 빠른 시작 (자동화 스크립트)

### 방법 1: 자동화 스크립트 사용 (추천)

```powershell
powershell -ExecutionPolicy Bypass -File ./github-upload.ps1
```

스크립트가 다음을 자동으로 수행합니다:
1. Git 저장소 초기화
2. 파일 추가 및 커밋
3. 원격 저장소 연결
4. GitHub에 푸시

## 수동 업로드 (단계별)

### 1단계: GitHub에서 리포지토리 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단의 **+** 버튼 클릭 → **New repository** 선택
3. 저장소 정보 입력:
   - **Repository name**: `terrace-527-website` (또는 원하는 이름)
   - **Description**: "테라스 527 글램핑 & 펜션 웹사이트"
   - **Visibility**: Public 또는 Private 선택
   - ⚠️ **중요**: "Initialize this repository with a README" 체크하지 않기
4. **Create repository** 클릭

### 2단계: Git 초기화

프로젝트 폴더에서 다음 명령어 실행:

```bash
# Git 저장소 초기화
git init

# 기본 브랜치를 main으로 설정
git branch -M main
```

### 3단계: 파일 추가 및 커밋

```bash
# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 테라스 527 글램핑 & 펜션 웹사이트"
```

### 4단계: 원격 저장소 연결

```bash
# 원격 저장소 추가 (YOUR_USERNAME과 YOUR_REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

예시:
```bash
git remote add origin https://github.com/username/terrace-527-website.git
```

### 5단계: GitHub에 푸시

```bash
# GitHub에 푸시
git push -u origin main
```

## 전체 명령어 (한 번에 복사)

```bash
# 1. Git 초기화
git init
git branch -M main

# 2. 파일 추가 및 커밋
git add .
git commit -m "Initial commit: 테라스 527 글램핑 & 펜션 웹사이트"

# 3. 원격 저장소 연결 (YOUR_USERNAME과 YOUR_REPO_NAME 변경 필요)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 4. GitHub에 푸시
git push -u origin main
```

## 인증 방법

### Personal Access Token 사용 (권장)

GitHub는 2021년 8월부터 비밀번호 인증을 중단했습니다.

1. **토큰 생성**:
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - **Generate new token (classic)** 클릭
   - **Note**: "Terrace 527 Project" (설명)
   - **Expiration**: 원하는 기간 선택
   - **Scopes**: `repo` 체크 (모든 권한)
   - **Generate token** 클릭
   - ⚠️ **중요**: 토큰을 복사해 안전한 곳에 보관 (다시 볼 수 없음)

2. **토큰 사용**:
   - 푸시 시 비밀번호 대신 토큰 사용
   - Username: GitHub 사용자명
   - Password: Personal Access Token

### GitHub CLI 사용

```bash
# GitHub CLI 설치 후
gh auth login
git push -u origin main
```

## 문제 해결

### 이미 Git 저장소가 있는 경우

```bash
# 원격 저장소 확인
git remote -v

# 원격 저장소가 있으면 URL 변경
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 원격 저장소가 없으면 추가
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 이미 커밋이 있는 경우

```bash
# 현재 상태 확인
git status

# 변경사항이 있으면 추가
git add .

# 커밋
git commit -m "Update: 프로젝트 업데이트"

# 푸시
git push -u origin main
```

### 푸시 오류 해결

#### 오류: "remote origin already exists"

```bash
# 기존 원격 저장소 제거
git remote remove origin

# 새 원격 저장소 추가
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

#### 오류: "authentication failed"

- Personal Access Token을 사용하고 있는지 확인
- 토큰이 만료되지 않았는지 확인
- `repo` 권한이 있는지 확인

#### 오류: "repository not found"

- GitHub에서 리포지토리가 생성되었는지 확인
- 리포지토리 이름과 URL이 정확한지 확인
- 리포지토리 접근 권한이 있는지 확인

## 이후 업데이트 방법

변경사항이 있을 때마다:

```bash
# 변경사항 추가
git add .

# 커밋
git commit -m "변경사항 설명"

# GitHub에 푸시
git push
```

## 추천 리포지토리 이름

- `terrace-527-website`
- `terrace-527-glamping`
- `terrace-527-homepage`
- `terrace527-website`

## .gitignore 확인

다음 파일들은 자동으로 제외됩니다:
- `node_modules/`
- `dist/`
- `.env.local`
- 기타 설정 파일들

## 체크리스트

업로드 전 확인사항:

- [ ] GitHub 리포지토리 생성 완료
- [ ] Personal Access Token 준비 (필요한 경우)
- [ ] `.gitignore` 파일 확인
- [ ] 민감한 정보(API 키 등) 제외 확인
- [ ] `node_modules` 폴더 제외 확인
- [ ] Git 초기화 완료
- [ ] 파일 추가 및 커밋 완료
- [ ] 원격 저장소 연결 완료
- [ ] 푸시 성공 확인

## 추가 리소스

- [GitHub Docs](https://docs.github.com)
- [Git 공식 문서](https://git-scm.com/doc)
- [Personal Access Token 가이드](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

**참고**: 이 가이드는 Windows PowerShell 환경을 기준으로 작성되었습니다.
