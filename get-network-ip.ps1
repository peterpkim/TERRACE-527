# 네트워크 IP 주소 확인 스크립트
Write-Host "=== 네트워크 IP 주소 확인 ===" -ForegroundColor Green
Write-Host ""

# 로컬 IP 주소 가져오기
$ipAddresses = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { 
    $_.IPAddress -notlike "127.*" -and 
    $_.IPAddress -notlike "169.254.*" 
} | Select-Object -ExpandProperty IPAddress

if ($ipAddresses) {
    Write-Host "로컬 네트워크 IP 주소:" -ForegroundColor Yellow
    foreach ($ip in $ipAddresses) {
        Write-Host "  - $ip" -ForegroundColor Cyan
    }
    Write-Host ""
    Write-Host "외부에서 접근하려면 다음 주소를 사용하세요:" -ForegroundColor Green
    Write-Host "  개발 서버: http://$($ipAddresses[0]):3000" -ForegroundColor Cyan
    Write-Host "  프리뷰 서버: http://$($ipAddresses[0]):4173" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "주의사항:" -ForegroundColor Yellow
    Write-Host "  1. 같은 Wi-Fi 네트워크에 연결된 기기만 접근 가능합니다" -ForegroundColor White
    Write-Host "  2. 방화벽 설정을 확인하세요" -ForegroundColor White
    Write-Host "  3. 서버가 실행 중이어야 합니다" -ForegroundColor White
} else {
    Write-Host "네트워크 IP 주소를 찾을 수 없습니다." -ForegroundColor Red
}

Write-Host ""
Write-Host "공용 인터넷에서 접근하려면 ngrok 같은 터널링 도구를 사용하세요." -ForegroundColor Yellow
