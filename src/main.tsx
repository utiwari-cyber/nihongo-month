import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'

// The hosted single-page build loads the same fonts from Google Fonts instead.
if (import.meta.env.MODE !== 'artifact') {
  import('@fontsource/shippori-mincho/700.css')
  import('@fontsource/zen-kaku-gothic-new/400.css')
  import('@fontsource/zen-kaku-gothic-new/700.css')
}

createRoot(document.getElementById('root')!).render(<App />)
