# GitHub 자동 동기화 가이드

## 1. 수동 동기화 (가장 간단한 방법)

### GitHub → 로컬 (변경사항 가져오기)
```bash
# 최신 변경사항 가져오기
git pull origin main

# 또는 fetch 후 merge
git fetch origin
git merge origin/main
```

### 로컬 → GitHub (변경사항 업로드)
```bash
# 변경사항 스테이징
git add .

# 커밋
git commit -m "변경사항 설명"

# GitHub에 푸시
git push origin main
```

## 2. 자동 동기화 스크립트 생성

### Windows PowerShell 스크립트

**`sync-from-github.ps1`** 파일 생성:
```powershell
# GitHub에서 최신 변경사항 가져오기
Write-Host "GitHub에서 최신 변경사항을 가져오는 중..." -ForegroundColor Green
git pull origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "동기화 완료!" -ForegroundColor Green
} else {
    Write-Host "동기화 중 오류 발생" -ForegroundColor Red
}
```

**`sync-to-github.ps1`** 파일 생성:
```powershell
# 로컬 변경사항을 GitHub에 업로드
Write-Host "변경사항을 GitHub에 업로드하는 중..." -ForegroundColor Green

git add .
$message = Read-Host "커밋 메시지를 입력하세요"
git commit -m $message
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "업로드 완료!" -ForegroundColor Green
} else {
    Write-Host "업로드 중 오류 발생" -ForegroundColor Red
}
```

## 3. 자동 동기화 설정 (Git Watch)

### 방법 1: Git Hooks 사용
`.git/hooks/post-merge` 파일에 자동 실행 스크립트 추가

### 방법 2: 파일 감시 스크립트
파일 변경을 감지하여 자동으로 커밋하고 푸시

### 방법 3: GitHub Actions (CI/CD)
GitHub에서 파일을 수정하면 자동으로 빌드 및 배포

## 4. 실시간 동기화 (고급)

### Git Auto Sync 도구 사용
- **GitWatch**: 파일 변경 감지 후 자동 커밋
- **GitHub Desktop**: GUI로 쉽게 동기화
- **SourceTree**: 시각적 Git 클라이언트

## 5. 권장 워크플로우

### 개발 시:
1. 작업 시작 전: `git pull origin main` (최신 코드 가져오기)
2. 작업 완료 후: `git add .` → `git commit -m "메시지"` → `git push origin main`

### GitHub에서 직접 수정한 경우:
1. 로컬에서: `git pull origin main` (변경사항 가져오기)

## 6. 충돌 해결

만약 GitHub와 로컬에서 동시에 수정한 경우:
```bash
git pull origin main
# 충돌 발생 시 수동으로 해결
git add .
git commit -m "충돌 해결"
git push origin main
```

## 7. 자동화 스크립트 실행

PowerShell에서:
```powershell
# GitHub에서 가져오기
.\sync-from-github.ps1

# GitHub에 업로드
.\sync-to-github.ps1
```
