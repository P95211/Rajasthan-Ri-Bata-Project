import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerSW } from './utils/caching'

// Register service worker for caching
registerSW();

// Preload critical resources
const link = document.createElement('link');
link.rel = 'preconnect';
link.href = 'https://lpjkfkvocnwdvxmjzrws.supabase.co';
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);
