# robots.txt 및 Sitemap 설정 가이드 (네이버 웹마스터 기준)

## 개요

- **robots.txt**: 사이트 루트에 두며, 검색 로봇에 수집 허용/제한 규칙을 알립니다.
- **sitemap.xml**: 페이지 목록을 제공해 검색 로봇이 콘텐츠를 더 잘 수집하도록 돕습니다.

두 파일 모두 `public/` 폴더에 있으며, 빌드 시 `dist/` 루트로 복사됩니다.

---

## 1. robots.txt

### 위치 및 제공

- **파일 경로**: `public/robots.txt`
- **배포 후 URL**: `https://사이트도메인/robots.txt` (반드시 루트, text/plain)

### 현재 설정

- **User-agent: *** → 모든 검색 로봇
- **Allow: /** → 전체 사이트 수집 허용
- **User-agent: Yeti** → 네이버 검색 로봇에도 동일 규칙 적용

### 네이버 가이드 요약

| HTTP 응답 | 동작 |
|-----------|------|
| 2xx | 규칙 적용 (text/plain 권장) |
| 3xx | 리다이렉트 5회까지 추적 |
| 4xx | “모두 허용”으로 해석 |
| 5xx | “모두 비허용”으로 해석 (이전 규칙 일시 사용 가능) |

- 파비콘, JS/CSS 리소스는 문서와 동일하게 허용하는 것이 좋습니다.
- Sitemap URL을 넣을 때는 **배포 후 실제 사이트 URL**을 사용하세요.

### 파비콘 (Favicon) – 네이버 검색 가이드

- **위치**: `public/favicon.png` (빌드 시 `dist/` 루트로 복사)
- **마크업**: `index.html`의 `<head>` 내 `rel="shortcut icon"`, `rel="icon"`, `rel="apple-touch-icon"` 각 1개씩 사용
- **규칙**: 정사각형, 최소 16px 이상 권장. 검색 결과에는 15×15px로 노출되므로 해당 크기에서 선명한지 확인
- **절대 경로**: 네이버 가이드는 파비콘 `href`에 **절대 경로** 사용을 권장합니다. 배포 URL이 정해지면 `index.html`에서 `href="./favicon.png"`를 `href="https://실제도메인/favicon.png"` 형태로 바꾸면 검색 노출에 유리합니다.

### Sitemap 줄 추가 방법

배포 URL이 정해지면 `public/robots.txt` 맨 아래에 한 줄 추가합니다.

**GitHub Pages (프로젝트 사이트) 예:**

```
Sitemap: https://YOUR_USERNAME.github.io/Terrace527-homepage_ver01/sitemap.xml
```

**커스텀 도메인 예:**

```
Sitemap: https://www.terrace527.com/sitemap.xml
```

추가 후 저장하고 다시 배포하면 됩니다.

---

## 2. sitemap.xml

### 위치

- **파일 경로**: `public/sitemap.xml`
- **배포 후 URL**: `https://사이트도메인/sitemap.xml`

### 수정 방법

1. `public/sitemap.xml`을 엽니다.
2. `YOUR_SITE_DOMAIN`을 **실제 배포 주소**로 모두 바꿉니다.

**GitHub Pages (프로젝트 사이트) 예:**

- 도메인: `https://YOUR_USERNAME.github.io/Terrace527-homepage_ver01`
- `<loc>https://YOUR_SITE_DOMAIN/</loc>`  
  → `<loc>https://YOUR_USERNAME.github.io/Terrace527-homepage_ver01/</loc>`
- 나머지 `/story`, `/rooms/...` 등도 같은 도메인으로 통일합니다.

**커스텀 도메인 예:**

- `https://YOUR_SITE_DOMAIN` → `https://www.terrace527.com`

3. 저장 후 빌드·배포하면 새 sitemap이 반영됩니다.

### 포함된 경로 (예시)

- `/` (홈)
- `/story`
- `/rooms/classic-glamping`, `/rooms/signature-glamping`, `/rooms/classic-stay`, `/rooms/signature-stay`
- `/experience/heal`, `/experience/play`, `/experience/service`
- `/booking`, `/access`, `/notice`

페이지가 늘거나 주소가 바뀌면 `public/sitemap.xml`에 `<url>` 항목을 추가/수정하면 됩니다.

---

## 3. 배포 후 확인

1. **robots.txt**  
   브라우저에서 `https://(배포URL)/robots.txt` 로 접속해 내용이 보이고, 일반 텍스트로 열리는지 확인합니다.

2. **sitemap.xml**  
   `https://(배포URL)/sitemap.xml` 로 접속해 XML이 정상적으로 보이는지 확인합니다.

3. **네이버 서치어드바이저**  
   [네이버 웹마스터도구](https://searchadvisor.naver.com/)에서 사이트 등록 후, robots.txt 수집 요청 및 Sitemap 제출을 하면 검색 수집에 도움이 됩니다.

---

## 4. 특정 경로만 차단하고 싶을 때

관리자·비공개 페이지 등 **수집 불가** 경로가 있다면 `public/robots.txt`에 다음처럼 추가할 수 있습니다.

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private*/

User-agent: Yeti
Allow: /
Disallow: /admin/
Disallow: /private*/
```

이 프로젝트는 현재 전체 공개를 전제로 하므로, 기본값은 `Allow: /` 만 두었습니다.
