import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bai1 from './components/bai1'
import Bai2 from './components/bai2'
import Bai3 from './components/bai3'  
import Bai4 from './components/bai4'
function App() {
  
  return (
    <>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <Bai1 />

      <Bai2 />

      <Bai3 />   

      <Bai4 /> 
    </>
  )
}

export default App
