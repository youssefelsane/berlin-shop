import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css' // Tailwind directives

// يلاقي <div id="root"> → يحوّله React Root → يرسم <App />
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)