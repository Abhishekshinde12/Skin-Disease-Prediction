import './App.css'
import Home from './components/Home'
import {Routes, Route} from 'react-router-dom'
import Upload from './components/Upload'
import Results from './components/Results'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/predict' element={<Prediction />} /> */}
        <Route path='/predict' element={<Upload />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </>
  )
}

export default App
