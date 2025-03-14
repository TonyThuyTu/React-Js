import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Bai1 from './bai1.jsx'
import Bai2 from './bai2.jsx'
import Bai3 from './components/Bai3.jsx'
import Bai4 from './components/bai4.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App />

    <Bai3 />

    <Bai4 />

    <Bai1 />

    <Bai2 />

  

  </StrictMode>,
)
