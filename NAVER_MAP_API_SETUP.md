# 네이버 지도 API 설정 가이드

## 문제 해결: "네이버 지도 Open API 인증이 실패했습니다" 오류

이 오류는 네이버 클라우드 플랫폼에서 지도 API 설정이 올바르지 않을 때 발생합니다.

## 1. 네이버 클라우드 플랫폼 설정

### Step 1: 네이버 클라우드 플랫폼 접속
1. [네이버 클라우드 플랫폼](https://www.ncloud.com/)에 접속
2. 회원가입 또는 로그인

### Step 2: AI·NAVER API 서비스 신청
1. **콘솔** → **Services** → **AI·NAVER API** → **Maps** 선택
2. **Application 등록** 클릭
3. 다음 정보 입력:
   - **Application 이름**: 원하는 이름 (예: "테라스527 웹사이트")
   - **Service 선택**: **Maps** 체크
   - **비즈니스 형태**: 개인/기업 선택

### Step 3: Client ID 발급
1. Application 등록 후 **Client ID**와 **Client Secret** 발급
2. **Client ID**를 복사해두세요 (이것이 API 키입니다)

### Step 4: 서비스 URL 등록 (중요!)
1. 등록한 Application을 클릭하여 상세 페이지로 이동
2. **서비스 환경** 또는 **환경 설정** 메뉴 찾기
3. **서비스 URL 등록** 섹션에서 다음 URL들을 등록:

   **로컬 개발 환경:**
   ```
   http://localhost:3000
   http://localhost:5173
   http://127.0.0.1:3000
   http://127.0.0.1:5173
   http://192.168.3.67:3000
   http://192.168.3.67:5173
   ```
   
   ⚠️ **참고**: 네트워크 IP 주소는 변경될 수 있으므로, `ipconfig` 명령어로 현재 IP를 확인한 후 등록하세요.

   **프로덕션 환경 (실제 도메인):**
   ```
   https://yourdomain.com
   https://www.yourdomain.com
   ```

   ⚠️ **중요**: 서비스 URL을 등록하지 않으면 인증 오류가 발생합니다!

### Step 5: API 사용량 확인
- 무료 플랜: 월 30,000건까지 무료
- 사용량 초과 시 유료 전환 필요

## 2. 프로젝트 설정

### Step 1: 환경 변수 파일 생성
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```env
VITE_NAVER_MAP_CLIENT_ID=발급받은_Client_ID_여기에_입력
```

**예시:**
```env
VITE_NAVER_MAP_CLIENT_ID=fbpx62bug8
```

### Step 2: 서버 재시작
환경 변수를 변경한 후에는 개발 서버를 재시작해야 합니다:

```bash
# 서버 중지 (Ctrl+C)
# 서버 재시작
npm run dev
```

## 3. 문제 해결 체크리스트

### ✅ 확인 사항
- [ ] 네이버 클라우드 플랫폼에 Application이 등록되어 있는가?
- [ ] Client ID가 올바르게 발급되었는가?
- [ ] `.env.local` 파일에 `VITE_NAVER_MAP_CLIENT_ID`가 설정되어 있는가?
- [ ] **서비스 URL이 네이버 클라우드 플랫폼에 등록되어 있는가?** (가장 중요!)
- [ ] 개발 서버를 재시작했는가?
- [ ] API 사용량이 초과되지 않았는가?

### 🔍 추가 디버깅

브라우저 개발자 도구(F12) → Console 탭에서 다음 오류를 확인:

1. **"인증이 실패했습니다"** 
   → 서비스 URL 미등록 또는 Client ID 오류

2. **"Client ID가 없습니다"**
   → `.env.local` 파일 확인

3. **CORS 오류**
   → 서비스 URL이 등록되지 않음

## 4. 네이버 클라우드 플랫폼 콘솔 확인

1. 네이버 클라우드 플랫폼 콘솔 접속
2. **AI·NAVER API** → **Maps** → 등록한 Application 선택
3. **통계** 또는 **사용량** 메뉴에서 API 호출 상태 확인
4. 오류 로그가 있다면 확인

## 5. 참고 자료

- [네이버 지도 API 공식 문서](https://navermaps.github.io/maps.js.ncp/)
- [네이버 클라우드 플랫폼 Maps API 가이드](https://guide.ncloud-docs.com/docs/ai-naver-maps-overview)

## 6. 빠른 해결 방법

가장 흔한 원인은 **서비스 URL 미등록**입니다:

1. 네이버 클라우드 플랫폼 콘솔 접속
2. Application 상세 페이지로 이동
3. **서비스 환경** 또는 **환경 설정** 찾기
4. 현재 사용 중인 URL 등록:
   - `http://localhost:3000` (로컬 접속용)
   - `http://192.168.3.67:3000` (네트워크 접속용 - IP 주소는 변경될 수 있음)
   - ⚠️ **IP 주소가 변경된 경우**: `ipconfig` 명령어로 현재 IP 확인 후 새로 등록
5. 저장 후 브라우저 새로고침

이렇게 하면 대부분의 인증 오류가 해결됩니다!

## 7. IP 주소 변경 시 대응 방법

네트워크 환경이 바뀌면 IP 주소가 변경될 수 있습니다:

1. **현재 IP 주소 확인:**
   ```bash
   # Windows PowerShell
   ipconfig
   
   # 또는
   ipconfig | Select-String -Pattern "IPv4"
   ```

2. **새로운 IP 주소를 네이버 클라우드 플랫폼에 등록:**
   - 예: `http://192.168.3.67:3000` (현재 IP)
   - IP 주소가 자주 변경되는 경우, `localhost`와 `127.0.0.1`만 사용하는 것을 권장

3. **개발 서버 재시작:**
   ```bash
   npm run dev
   ```
