<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1CErh_CbEz3VS4S7wfpoh8_WiIHZw6PB-

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set environment variables in `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   VITE_NAVER_MAP_CLIENT_ID=your_naver_map_client_id_here
   ```
3. **네이버 지도 API 설정 (중요!):**
   - 네이버 클라우드 플랫폼에서 Maps API Application 등록
   - Client ID 발급 후 `.env.local`에 설정
   - **서비스 URL 등록 필수**: `http://localhost:3000` 등록
   - 자세한 설정 방법: [NAVER_MAP_API_SETUP.md](NAVER_MAP_API_SETUP.md) 참고
4. Run the app:
   `npm run dev`
