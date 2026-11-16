import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Las páginas llegan ya generadas al compilar: se hidratan. En desarrollo se renderizan desde cero.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
