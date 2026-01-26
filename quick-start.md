# 빠른 시작 가이드

## 프리뷰 서버 접속이 안 될 때

### 문제: dist 폴더가 없음

프리뷰 서버는 빌드된 `dist` 폴더가 있어야 실행됩니다.

## 해결 방법

### 1단계: 빌드 실행

터미널에서 다음 명령어를 실행하세요:

```bash
npm run build
```

빌드가 성공하면 다음과 같은 메시지가 표시됩니다:
```
✓ built in xxx ms
```

그리고 `dist` 폴더가 생성됩니다.

### 2단계: 프리뷰 서버 실행

빌드가 완료된 후, 다음 명령어를 실행하세요:

```bash
npm run preview
```

### 3단계: 브라우저에서 접속

터미널에 표시된 URL (예: `http://localhost:4173`)을 브라우저에서 열어주세요.

## 한 번에 실행하기

빌드와 프리뷰를 한 번에 실행하려면:

```bash
npm run build:test
```

## 빌드 오류가 발생하는 경우

1. **의존성 확인**
   ```bash
   npm install
   ```

2. **TypeScript 오류 확인**
   ```bash
   npx tsc --noEmit
   ```

3. **에러 메시지 확인**
   - 빌드 시 표시되는 에러 메시지를 확인하세요
   - 일반적으로 import 경로 오류나 타입 오류일 수 있습니다

## 체크리스트

- [ ] `npm install` 실행 완료
- [ ] `npm run build` 실행 완료
- [ ] `dist` 폴더 생성 확인
- [ ] `npm run preview` 실행
- [ ] 브라우저에서 `http://localhost:4173` 접속
