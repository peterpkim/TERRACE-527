# GitHub 업로드 자동화 스크립트
# 사용법: powershell -ExecutionPolicy Bypass -File ./github-upload.ps1

param(
    [string]$RepoName = "terrace-527-website",
    [string]$GitHubUsername = "",
    [string]$Description = "테라스 527 글램핑 & 펜션 웹사이트"
)

Write-Host "=== GitHub 업로드 자동화 스크립트 ===" -ForegroundColor Green
Write-Host ""

# 1. 리포지토리 이름 확인
if ([string]::IsNullOrWhiteSpace($RepoName)) {
    $RepoName = Read-Host "GitHub 리포지토리 이름을 입력하세요 (예: terrace-527-website)"
}

Write-Host "리포지토리 이름: $RepoName" -ForegroundColor Cyan
Write-Host ""

# 2. GitHub 사용자명 확인
if ([string]::IsNullOrWhiteSpace($GitHubUsername)) {
    $GitHubUsername = Read-Host "GitHub 사용자명을 입력하세요"
}

Write-Host "GitHub 사용자명: $GitHubUsername" -ForegroundColor Cyan
Write-Host ""

# 3. Git 초기화 확인
if (-not (Test-Path ".git")) {
    Write-Host "[1/5] Git 저장소 초기화 중..." -ForegroundColor Yellow
    git init
    if ($LASTEXITCODE -ne 0) {
        Write-Host "오류: Git 초기화 실패" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Git 저장소 초기화 완료" -ForegroundColor Green
} else {
    Write-Host "[1/5] Git 저장소가 이미 초기화되어 있습니다." -ForegroundColor Green
}

# 4. 기본 브랜치를 main으로 설정
Write-Host "[2/5] 기본 브랜치를 main으로 설정 중..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ 브랜치 설정 완료" -ForegroundColor Green

# 5. 파일 추가 및 커밋
Write-Host "[3/5] 파일 추가 및 커밋 중..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "오류: 파일 추가 실패" -ForegroundColor Red
    exit 1
}

$commitMessage = "Initial commit: $Description"
git commit -m $commitMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "경고: 커밋 실패 (이미 커밋된 파일이 있을 수 있습니다)" -ForegroundColor Yellow
} else {
    Write-Host "✓ 커밋 완료" -ForegroundColor Green
}

# 6. 원격 저장소 확인 및 추가
Write-Host "[4/5] 원격 저장소 설정 중..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$GitHubUsername/$RepoName.git"

# 기존 원격 저장소 확인
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "기존 원격 저장소 발견: $existingRemote" -ForegroundColor Yellow
    $update = Read-Host "새로운 원격 저장소로 변경하시겠습니까? (Y/N)"
    if ($update -eq "Y" -or $update -eq "y") {
        git remote set-url origin $remoteUrl
        Write-Host "✓ 원격 저장소 URL 업데이트 완료" -ForegroundColor Green
    } else {
        Write-Host "기존 원격 저장소를 유지합니다." -ForegroundColor Green
        $remoteUrl = $existingRemote
    }
} else {
    git remote add origin $remoteUrl
    Write-Host "✓ 원격 저장소 추가 완료" -ForegroundColor Green
}

Write-Host ""
Write-Host "[5/5] GitHub에 푸시 준비 중..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  중요: GitHub에 리포지토리를 먼저 생성해야 합니다!" -ForegroundColor Red
Write-Host ""
Write-Host "다음 단계를 따라주세요:" -ForegroundColor Cyan
Write-Host "1. https://github.com/new 에서 새 리포지토리 생성" -ForegroundColor White
Write-Host "   - 리포지토리 이름: $RepoName" -ForegroundColor White
Write-Host "   - Public 또는 Private 선택" -ForegroundColor White
Write-Host "   - 'Initialize this repository with a README' 체크하지 않기" -ForegroundColor White
Write-Host ""
Write-Host "2. 리포지토리 생성 후 다음 명령어를 실행하세요:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host ""
Write-Host "또는 자동으로 푸시하려면 'Y'를 입력하세요:" -ForegroundColor Cyan
$autoPush = Read-Host "자동 푸시? (Y/N)"

if ($autoPush -eq "Y" -or $autoPush -eq "y") {
    Write-Host ""
    Write-Host "GitHub에 푸시 중..." -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✓ 업로드 완료!" -ForegroundColor Green
        Write-Host "리포지토리 URL: https://github.com/$GitHubUsername/$RepoName" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "오류: 푸시 실패" -ForegroundColor Red
        Write-Host "다음을 확인하세요:" -ForegroundColor Yellow
        Write-Host "  - GitHub 리포지토리가 생성되었는지" -ForegroundColor White
        Write-Host "  - 인증 정보가 올바른지 (Personal Access Token 필요할 수 있음)" -ForegroundColor White
        Write-Host "  - 인터넷 연결 상태" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "수동으로 푸시하려면 다음 명령어를 실행하세요:" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== 완료 ===" -ForegroundColor Green
