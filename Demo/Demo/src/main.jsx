import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import Bai3 from './bai3.jsx'
import Bai4 from './bai4.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <App />

    <Bai3 />

    <Bai4 />

  </StrictMode>,
)
