# 🍜 nosh

A modern RSS reader built with React and React Router.

## Features

- Modern React architecture with React Router v6 for client-side routing
- RSS feed aggregation and reading
- Dark mode support with next-themes
- Responsive UI built with Tailwind CSS and Radix UI components

## Tech Stack

- **Frontend**: React 19, React Router v6, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Backend API**: Express.js (for RSS feed parsing)
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: React Context with useReducer

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

The app requires both the frontend dev server and the backend API server to be running:

```bash
# Terminal 1 - Start the API server (runs on port 3001)
npm run dev:api

# Terminal 2 - Start the frontend dev server (runs on port 3000)
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Routing

The app uses React Router v6 for client-side routing:

- **`/`** - Main feed reader interface
- Routes are defined in `src/App.tsx`
- Navigation uses React Router's `<Link>` component for client-side navigation without page reloads
- Protected routes can use the `RequireAuth` component in `src/routes/RequireAuth.tsx`

### Server Configuration for Client-Side Routing

When deploying the app, make sure your server is configured to serve `index.html` for all routes to support client-side routing. This is necessary because React Router handles routing on the client side.

Example configuration for various servers:

**Nginx:**
```nginx
location / {
  try_files $uri /index.html;
}
```

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

**Express:**
```javascript
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
```

## Project Structure

```
nosh/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components (routes)
│   ├── routes/         # Route guards and utilities
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── App.tsx         # Main app with route definitions
│   ├── main.tsx        # App entry point with BrowserRouter
│   └── globals.css     # Global styles
├── server/             # Express API server
│   └── index.ts        # Feed parsing API endpoint
├── public/             # Static assets
└── index.html          # HTML entry point
```

## Available Scripts

- `npm run dev` - Start the frontend development server
- `npm run dev:api` - Start the backend API server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## License

MIT
