# GitHub 연동 가이드

## 1. GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단의 **+** 버튼 클릭 → **New repository** 선택
3. 저장소 정보 입력:
   - **Repository name**: `terrace-527-website` (또는 원하는 이름)
   - **Description**: "테라스 527 글램핑 & 펜션 웹사이트"
   - **Visibility**: Public 또는 Private 선택
   - ⚠️ **중요**: "Initialize this repository with a README" 체크하지 않기
4. **Create repository** 클릭

## 2. 원격 저장소 연결

GitHub에서 저장소를 생성한 후, 다음 명령어를 실행하세요:

```bash
# 원격 저장소 추가 (YOUR_USERNAME과 YOUR_REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 기본 브랜치를 main으로 변경 (선택사항)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 3. 빠른 연결 명령어

GitHub 저장소 URL을 알고 있다면:

```bash
# 예시: https://github.com/username/terrace-527-website.git
git remote add origin https://github.com/username/terrace-527-website.git
git branch -M main
git push -u origin main
```

## 4. 인증 방법

### Personal Access Token 사용 (권장)
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. **Generate new token (classic)** 클릭
3. 권한 선택: `repo` 체크
4. 토큰 생성 후 복사
5. 푸시 시 비밀번호 대신 토큰 사용

### GitHub CLI 사용
```bash
# GitHub CLI 설치 후
gh auth login
git push -u origin main
```

## 5. 현재 상태 확인

```bash
# 원격 저장소 확인
git remote -v

# 현재 브랜치 확인
git branch

# 커밋 히스토리 확인
git log --oneline
```

## 6. 이후 변경사항 푸시

```bash
# 변경사항 스테이징
git add .

# 커밋
git commit -m "변경사항 설명"

# GitHub에 푸시
git push
```

## 7. 주의사항

- `.env.local` 파일은 `.gitignore`에 포함되어 있어 커밋되지 않습니다
- 민감한 정보(API 키 등)는 절대 커밋하지 마세요
- 이미지 파일이 많으므로 첫 푸시에 시간이 걸릴 수 있습니다
