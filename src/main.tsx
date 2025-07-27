import { createRoot } from 'react-dom/client'
import './shadcn.css'
import App from './App'
import { register } from './serviceWorker'

const root = createRoot(document.getElementById('app')!)
root.render(<App />)

// Register service worker for PWA functionality
register()
