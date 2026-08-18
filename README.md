<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# VisionCode AI Studio - Next.js 14 App Router

Convert UI screenshots into clean Next.js 14+ App Router TypeScript code and UX/CRO Audit Reports powered by Gemini Vision API.

## Prerequisites

- Node.js 18+ and npm/yarn
- Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your Gemini API Key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser

## Build and Production

### Local Build

```bash
npm run build
npm start
```

### Deploy to Vercel

This app is optimized for Vercel deployment with Next.js 14 App Router.

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Connect your GitHub repository
   - Select this project

3. **Configure Environment Variables in Vercel:**
   - Add `GEMINI_API_KEY` with your API key
   - Click "Deploy"

### API Routes (Next.js 14 App Router)

- **`src/app/api/analyze/route.ts`** - Analyzes screenshots with Gemini Vision
  - POST `/api/analyze`
  - Request: `{ imageBase64, mimeType, promptOverride }`
  - Response: `{ success, data | error }`

- **`src/app/api/refine/route.ts`** - Refines generated code
  - POST `/api/refine`
  - Request: `{ currentCode, prompt }`
  - Response: `{ success, data | error }`

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts    # Screenshot analysis endpoint
│   │   └── refine/route.ts     # Code refinement endpoint
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Main app page
├── components/
│   ├── Uploader.tsx            # Image upload with compression
│   ├── CodeViewer.tsx          # Display generated code
│   ├── UxAuditReport.tsx       # UX audit results
│   └── ...
├── App.tsx                      # Main React component
└── index.css                    # Tailwind CSS styles
```

## Key Features

✅ **AI-Powered Screenshot Analysis** - Uses Gemini Vision API  
✅ **Automatic Code Generation** - Next.js 14 + Tailwind CSS + TypeScript  
✅ **UX/CRO Audit Reports** - Conversion rate optimization scoring  
✅ **Image Compression** - Automatic optimization under 1MB  
✅ **Robust Error Handling** - Safe JSON parsing and error responses  
✅ **Vercel Optimized** - Production-ready deployment

## Technologies

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **AI:** Google Gemini Vision API
- **Deployment:** Vercel

## Troubleshooting

### API returning 404 on Vercel

- Ensure `src/app/api/analyze/route.ts` and `src/app/api/refine/route.ts` exist
- Verify `.env` has `GEMINI_API_KEY` set
- Check Vercel build logs for errors

### Image upload fails

- Verify image is under 1MB (auto-compressed client-side)
- Check browser console for detailed error messages
- Ensure API key is valid in `.env.local`

### Gemini API errors

- Verify API key is active at https://aistudio.google.com/app/apikey
- Check your API quota and billing

## View your app in AI Studio

https://ai.studio/apps/b262929f-64de-4c86-9e1c-9dad36f9185e
