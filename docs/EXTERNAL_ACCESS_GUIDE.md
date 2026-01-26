# 외부 접근 가이드

로컬호스트를 외부에서 접근할 수 있도록 설정하는 방법입니다.

## 방법 1: 로컬 네트워크 접근 (같은 Wi-Fi)

### 1. 네트워크 IP 주소 확인

PowerShell에서 다음 명령어를 실행하세요:

```powershell
powershell -ExecutionPolicy Bypass -File get-network-ip.ps1
```

또는 직접 확인:

```powershell
ipconfig
```

IPv4 주소를 찾으세요 (예: `192.168.0.100`)

### 2. 서버 실행

#### 개발 서버 (포트 3000)
```bash
npm run dev
```

#### 프리뷰 서버 (포트 4173)
```bash
npm run build
npm run preview
```

### 3. 외부 접근

같은 Wi-Fi 네트워크에 연결된 기기에서 다음 주소로 접근:

- **개발 서버**: `http://[내-IP-주소]:3000`
- **프리뷰 서버**: `http://[내-IP-주소]:4173`

예시:
- `http://192.168.0.100:3000`
- `http://192.168.0.100:4173`

### 4. 방화벽 설정

Windows 방화벽에서 포트를 허용해야 할 수 있습니다:

1. **Windows 보안** → **방화벽 및 네트워크 보호**
2. **고급 설정**
3. **인바운드 규칙** → **새 규칙**
4. **포트** 선택 → **TCP** → 포트 번호 입력 (3000 또는 4173)
5. **연결 허용** 선택
6. 모든 프로필에 적용

## 방법 2: 인터넷을 통한 접근 (ngrok 사용)

로컬 네트워크 밖에서도 접근하려면 ngrok 같은 터널링 도구를 사용하세요.

### 1. ngrok 설치

[ngrok 다운로드](https://ngrok.com/download)

또는 npm으로 설치:
```bash
npm install -g ngrok
```

### 2. ngrok 실행

서버가 실행 중인 상태에서:

#### 개발 서버 (포트 3000)
```bash
ngrok http 3000
```

#### 프리뷰 서버 (포트 4173)
```bash
ngrok http 4173
```

### 3. 공유 링크

ngrok이 생성한 공용 URL을 공유하세요:

```
Forwarding  https://xxxx-xx-xx-xx-xx.ngrok-free.app -> http://localhost:4173
```

이 URL을 누구에게나 공유할 수 있습니다.

### 4. ngrok 무료 계정 제한

- 무료 계정은 세션당 2시간 제한
- URL이 매번 변경됨
- 동시 연결 수 제한

## 방법 3: Vite 설정 확인

`vite.config.ts`에서 이미 외부 접근이 허용되어 있습니다:

```typescript
server: {
  port: 3000,
  host: '0.0.0.0',  // 외부 접근 허용
},
preview: {
  port: 4173,
  host: '0.0.0.0',  // 외부 접근 허용
}
```

## 빠른 시작

### 로컬 네트워크 접근

1. IP 주소 확인:
   ```powershell
   powershell -ExecutionPolicy Bypass -File get-network-ip.ps1
   ```

2. 서버 실행:
   ```bash
   npm run build
   npm run preview
   ```

3. 공유할 주소:
   ```
   http://[내-IP-주소]:4173
   ```

### 인터넷 접근 (ngrok)

1. ngrok 설치 후 실행:
   ```bash
   ngrok http 4173
   ```

2. 생성된 URL 공유:
   ```
   https://xxxx-xx-xx-xx-xx.ngrok-free.app
   ```

## 문제 해결

### 연결이 안 될 때

1. **방화벽 확인**
   - Windows 방화벽에서 포트 허용 확인
   - 안티바이러스 소프트웨어 확인

2. **서버 실행 확인**
   - 서버가 실행 중인지 확인
   - 터미널에 에러 메시지가 없는지 확인

3. **네트워크 확인**
   - 같은 Wi-Fi 네트워크에 연결되어 있는지 확인
   - IP 주소가 올바른지 확인

4. **포트 확인**
   - 다른 프로그램이 포트를 사용 중인지 확인
   - 포트 번호가 올바른지 확인

### 보안 주의사항

- **개발/테스트 목적으로만 사용**
- 프로덕션 환경에서는 적절한 보안 설정 필요
- 민감한 정보가 포함된 경우 주의
- ngrok 무료 버전은 HTTPS가 자동 적용됨

## 추천 방법

- **로컬 테스트**: 같은 네트워크 접근 (방법 1)
- **원격 테스트**: ngrok 사용 (방법 2)
- **프로덕션**: 적절한 호스팅 서비스 사용 (Vercel, Netlify 등)
