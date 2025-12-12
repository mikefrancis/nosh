import { Routes, Route } from 'react-router-dom'
import { FeedProvider } from '@/components/feed-provider'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import HomePage from '@/pages/HomePage'

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <FeedProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add more routes here as the app grows */}
        </Routes>
      </FeedProvider>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
