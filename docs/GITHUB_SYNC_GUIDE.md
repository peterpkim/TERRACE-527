# GitHub 자동 동기화 가이드

## 빠른 사용법

### GitHub에서 변경사항 가져오기 (로컬 업데이트)
```bash
npm run sync:from
```
또는
```bash
npm run pull
```

### 로컬 변경사항을 GitHub에 업로드
```bash
npm run sync:to
```
또는
```bash
npm run push
```

## 상세 가이드

### 1. GitHub → 로컬 (변경사항 가져오기)

#### 방법 A: npm 스크립트 사용 (권장)
```bash
npm run sync:from
```
- 변경사항 확인
- 충돌 경고 표시
- 자동으로 pull 실행

#### 방법 B: 직접 Git 명령어
```bash
git pull origin main
```

#### 방법 C: PowerShell 스크립트 직접 실행
```powershell
.\sync-from-github.ps1
```

### 2. 로컬 → GitHub (변경사항 업로드)

#### 방법 A: npm 스크립트 사용 (권장)
```bash
npm run sync:to
```
- 변경된 파일 확인
- 커밋 메시지 입력
- 자동으로 add, commit, push 실행

#### 방법 B: 직접 Git 명령어
```bash
git add .
git commit -m "변경사항 설명"
git push origin main
```

#### 방법 C: PowerShell 스크립트 직접 실행
```powershell
.\sync-to-github.ps1
```

## 자동화 옵션

### 옵션 1: 파일 감시 스크립트 (고급)

**`watch-and-sync.ps1`** 파일을 생성하여 파일 변경을 감지하고 자동으로 커밋:

```powershell
# 파일 변경 감지 후 자동 커밋 (주의: 자동 커밋은 신중하게 사용)
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = "."
$watcher.Filter = "*.*"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

Register-ObjectEvent $watcher "Changed" -Action {
    Write-Host "파일이 변경되었습니다: $($Event.SourceEventArgs.FullPath)"
    # 자동 커밋은 위험할 수 있으므로 주석 처리
    # git add .
    # git commit -m "Auto commit: $(Get-Date)"
    # git push origin main
}
```

### 옵션 2: GitHub Actions (CI/CD)

`.github/workflows/sync.yml` 파일 생성:
```yaml
name: Auto Sync
on:
  push:
    branches: [ main ]
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
```

### 옵션 3: Git Hooks 활용

`.git/hooks/post-merge` 파일이 이미 생성되어 있습니다.
이 파일은 `git pull` 후 자동으로 실행됩니다.

## 주의사항

⚠️ **자동 커밋은 위험할 수 있습니다:**
- 테스트하지 않은 코드가 커밋될 수 있음
- 충돌이 자동으로 해결되지 않을 수 있음
- 민감한 정보가 실수로 커밋될 수 있음

✅ **권장 워크플로우:**
1. 작업 전: `npm run sync:from` (최신 코드 가져오기)
2. 작업 후: 테스트 및 검토
3. 커밋: `npm run sync:to` (변경사항 업로드)

## 충돌 해결

GitHub와 로컬에서 동시에 수정한 경우:

```bash
# 1. GitHub 변경사항 가져오기
git pull origin main

# 2. 충돌 파일 확인
git status

# 3. 충돌 해결 (수동으로 파일 편집)
# <<<<<<< HEAD
# 로컬 변경사항
# =======
# GitHub 변경사항
# >>>>>>> origin/main

# 4. 해결 후 커밋
git add .
git commit -m "충돌 해결"
git push origin main
```

## 문제 해결

### 인증 오류
- Personal Access Token 사용 필요
- GitHub CLI 사용: `gh auth login`

### 권한 오류
- PowerShell 실행 정책 변경: `Set-ExecutionPolicy RemoteSigned`

### 충돌 발생
- 수동으로 해결하거나 `git stash` 사용
