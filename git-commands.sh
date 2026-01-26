#!/bin/bash
# GitHub 업로드 명령어 스크립트 (Linux/Mac용)
# 사용법: bash git-commands.sh

echo "=== GitHub 업로드 스크립트 ==="
echo ""

# 리포지토리 이름 입력
read -p "GitHub 리포지토리 이름을 입력하세요 (예: terrace-527-website): " REPO_NAME
read -p "GitHub 사용자명을 입력하세요: " GITHUB_USERNAME

echo ""
echo "리포지토리 이름: $REPO_NAME"
echo "GitHub 사용자명: $GITHUB_USERNAME"
echo ""

# 1. Git 초기화
if [ ! -d ".git" ]; then
    echo "[1/5] Git 저장소 초기화 중..."
    git init
    echo "✓ Git 저장소 초기화 완료"
else
    echo "[1/5] Git 저장소가 이미 초기화되어 있습니다."
fi

# 2. 기본 브랜치를 main으로 설정
echo "[2/5] 기본 브랜치를 main으로 설정 중..."
git branch -M main
echo "✓ 브랜치 설정 완료"

# 3. 파일 추가 및 커밋
echo "[3/5] 파일 추가 및 커밋 중..."
git add .
git commit -m "Initial commit: 테라스 527 글램핑 & 펜션 웹사이트"
echo "✓ 커밋 완료"

# 4. 원격 저장소 설정
echo "[4/5] 원격 저장소 설정 중..."
REMOTE_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# 기존 원격 저장소 확인
if git remote get-url origin &>/dev/null; then
    echo "기존 원격 저장소 발견"
    read -p "새로운 원격 저장소로 변경하시겠습니까? (Y/N): " UPDATE
    if [ "$UPDATE" = "Y" ] || [ "$UPDATE" = "y" ]; then
        git remote set-url origin $REMOTE_URL
        echo "✓ 원격 저장소 URL 업데이트 완료"
    fi
else
    git remote add origin $REMOTE_URL
    echo "✓ 원격 저장소 추가 완료"
fi

# 5. GitHub에 푸시
echo ""
echo "[5/5] GitHub에 푸시 준비 중..."
echo ""
echo "⚠️  중요: GitHub에 리포지토리를 먼저 생성해야 합니다!"
echo ""
echo "다음 단계를 따라주세요:"
echo "1. https://github.com/new 에서 새 리포지토리 생성"
echo "   - 리포지토리 이름: $REPO_NAME"
echo "   - 'Initialize this repository with a README' 체크하지 않기"
echo ""
read -p "리포지토리를 생성하셨나요? (Y/N): " READY

if [ "$READY" = "Y" ] || [ "$READY" = "y" ]; then
    echo ""
    echo "GitHub에 푸시 중..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✓ 업로드 완료!"
        echo "리포지토리 URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    else
        echo ""
        echo "오류: 푸시 실패"
        echo "인증 정보를 확인하세요 (Personal Access Token 필요할 수 있음)"
    fi
else
    echo ""
    echo "리포지토리 생성 후 다음 명령어를 실행하세요:"
    echo "  git push -u origin main"
fi

echo ""
echo "=== 완료 ==="
