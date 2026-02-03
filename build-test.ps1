# 빌드 테스트 스크립트
Write-Host "=== 빌드 테스트 시작 ===" -ForegroundColor Green
Write-Host ""

# 1. 의존성 확인
if (-not (Test-Path "node_modules")) {
    Write-Host "[1/4] 의존성 설치 중..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "오류: 의존성 설치 실패" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ 의존성 설치 완료" -ForegroundColor Green
} else {
    Write-Host "[1/4] 의존성이 이미 설치되어 있습니다." -ForegroundColor Green
}

# 2. 기존 dist 폴더 삭제
if (Test-Path "dist") {
    Write-Host "[2/4] 기존 dist 폴더 삭제 중..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "dist"
    Write-Host "✓ 삭제 완료" -ForegroundColor Green
} else {
    Write-Host "[2/4] dist 폴더가 없습니다." -ForegroundColor Green
}

# 3. 빌드 실행
Write-Host "[3/4] 빌드 실행 중..." -ForegroundColor Yellow
$env:GITHUB_PAGES = "true"
$env:GITHUB_REPOSITORY_NAME = "terrace-527-homepage-test3"
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "오류: 빌드 실패" -ForegroundColor Red
    exit 1
}

Write-Host "✓ 빌드 완료" -ForegroundColor Green

# 4. 빌드 결과 확인
Write-Host "[4/4] 빌드 결과 확인 중..." -ForegroundColor Yellow

if (Test-Path "dist/index.html") {
    Write-Host "✓ dist/index.html 존재" -ForegroundColor Green
} else {
    Write-Host "✗ dist/index.html 없음" -ForegroundColor Red
    exit 1
}

if (Test-Path "dist/IMAGE") {
    Write-Host "✓ dist/IMAGE 폴더 존재" -ForegroundColor Green
    $imageCount = (Get-ChildItem -Path "dist/IMAGE" -File).Count
    Write-Host "  이미지 파일: $imageCount 개" -ForegroundColor Cyan
} else {
    Write-Host "⚠ dist/IMAGE 폴더 없음" -ForegroundColor Yellow
}

if (Test-Path "dist/assets") {
    Write-Host "✓ dist/assets 폴더 존재" -ForegroundColor Green
    $assetCount = (Get-ChildItem -Path "dist/assets" -File).Count
    Write-Host "  에셋 파일: $assetCount 개" -ForegroundColor Cyan
} else {
    Write-Host "✗ dist/assets 폴더 없음" -ForegroundColor Red
    exit 1
}

$distSize = (Get-ChildItem -Path "dist" -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host ""
Write-Host "=== 빌드 성공! ===" -ForegroundColor Green
Write-Host "빌드 결과 크기: $([math]::Round($distSize, 2)) MB" -ForegroundColor Cyan
Write-Host ""
Write-Host "다음 단계:" -ForegroundColor Yellow
Write-Host "1. GitHub 저장소 Settings → Pages → Source를 'GitHub Actions'로 설정" -ForegroundColor White
Write-Host "2. 코드를 푸시하면 자동으로 배포됩니다" -ForegroundColor White
Write-Host "3. 배포 후 https://peterpkim.github.io/terrace-527-homepage-test3/ 접속" -ForegroundColor White
