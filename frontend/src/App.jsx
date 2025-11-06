import './App.css'
import Home from './components/Home'
import Prediction from './components/Prediction'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/predict' element={<Prediction />} />
      </Routes>
    </>
  )
}

export default App
