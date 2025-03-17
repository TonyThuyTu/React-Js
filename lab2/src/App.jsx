import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bai1 from './components/bai1'
import Bai2 from './components/bai2'
import Header from './components/header'
import Footer from './components/footer'  
import Bai4 from './components/bai4'
function App() {
  
  return (
    <>

      <Header />
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

      <Bai4 />

      <Footer /> 
    </>
  )
}

export default App
