# Snap Search — Frontend

Next.js 14 frontend for the AI Shopping Assistant.

## Tech Stack
- **Next.js 14** — App Router, React 18+
- **Tailwind CSS** — responsive styling
- **Framer Motion** — micro-animations
- **Lucide React** — icons
- **Axios** — API client

## Setup

```bash
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL to your backend URL

npm install
npm run dev
```

Open http://localhost:3000

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API base URL | http://localhost:8000 |

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.js           # Root layout + SEO
│   │   ├── page.js             # Home page
│   │   ├── search/page.js      # Search results
│   │   ├── product/[id]/page.js # Product detail
│   │   └── categories/page.js  # Category listing
│   ├── components/
│   │   ├── SearchBar.jsx       # Dual-mode search
│   │   ├── ProductCard.jsx     # Card with AI score
│   │   ├── ScoreBreakdown.jsx  # Animated score rings
│   │   ├── ChatWidget.jsx      # Floating AI chat
│   │   ├── PriceComparison.jsx # Multi-store prices
│   │   ├── Navbar.jsx          # Glass nav bar
│   │   └── Footer.jsx
│   └── lib/
│       └── api.js              # Axios client
├── package.json
├── next.config.js
├── tailwind.config.js
└── Dockerfile
```

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import in Vercel
3. Set `NEXT_PUBLIC_API_URL` to your deployed backend URL
4. Deploy
