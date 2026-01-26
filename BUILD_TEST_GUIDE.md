# 빌드 테스트 가이드

## 배포 전 빌드 테스트 방법

### 1. 의존성 확인 및 설치

프로젝트 루트 디렉토리에서 다음 명령어를 실행하세요:

```bash
npm install
```

### 2. 빌드 실행

```bash
npm run build
```

### 3. 빌드 결과 확인

빌드가 성공하면 `dist` 폴더가 생성됩니다. 다음을 확인하세요:

- ✅ `dist/index.html` 파일 존재
- ✅ `dist/assets/` 폴더에 번들 파일 생성
- ✅ 빌드 오류 없음

### 4. 프리뷰로 빌드 결과 테스트

빌드된 결과물을 로컬에서 테스트하려면:

```bash
npm run preview
```

브라우저에서 `http://localhost:4173` (또는 표시된 포트)을 열어 확인하세요.

### 5. 빌드 체크리스트

빌드 전 확인사항:

- [ ] 모든 의존성이 설치됨 (`node_modules` 존재)
- [ ] TypeScript 오류 없음
- [ ] 환경 변수 설정 확인 (필요한 경우)
- [ ] 이미지 파일 경로 확인
- [ ] 라우팅 설정 확인 (HashRouter 사용 중)

빌드 후 확인사항:

- [ ] `dist` 폴더 생성됨
- [ ] `dist/index.html` 파일 존재
- [ ] `dist/assets/` 폴더에 JS/CSS 파일 생성
- [ ] 프리뷰에서 모든 페이지 정상 작동
- [ ] 이미지 로드 정상
- [ ] 라우팅 정상 작동

### 6. 예상되는 빌드 결과

성공적인 빌드 후 `dist` 폴더 구조:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── (기타 에셋 파일들)
└── (기타 정적 파일들)
```

### 7. 문제 해결

#### 빌드 오류 발생 시

1. **TypeScript 오류**
   ```bash
   # TypeScript 타입 체크
   npx tsc --noEmit
   ```

2. **의존성 문제**
   ```bash
   # node_modules 삭제 후 재설치
   rm -rf node_modules
   npm install
   ```

3. **경로 문제**
   - 한글 경로가 포함된 경우 문제가 발생할 수 있습니다
   - 가능하면 영문 경로로 프로젝트 이동 권장

4. **환경 변수 오류**
   - `.env.local` 파일 확인
   - 빌드 시 환경 변수가 필요하면 설정 확인

### 8. 배포 준비

빌드 테스트가 성공하면:

1. `dist` 폴더의 내용을 웹 서버에 업로드
2. 정적 파일 호스팅 서비스 사용 시:
   - Vercel, Netlify, GitHub Pages 등
   - 각 플랫폼의 배포 가이드 참고

### 9. 빌드 최적화 확인

빌드 후 다음을 확인하세요:

- ✅ 파일 크기 최적화 (압축 확인)
- ✅ 불필요한 파일 제외 확인
- ✅ 소스맵 생성 여부 확인 (프로덕션에서는 비활성화 권장)

### 10. 빠른 빌드 테스트 명령어

한 번에 빌드와 프리뷰를 실행하려면:

```bash
npm run build && npm run preview
```

또는 PowerShell에서:

```powershell
npm run build; if ($?) { npm run preview }
```

---

**참고**: 현재 프로젝트는 Vite를 사용하므로, 빌드 결과물은 정적 파일로 생성됩니다. HashRouter를 사용하고 있어 모든 라우트가 정상 작동합니다.
