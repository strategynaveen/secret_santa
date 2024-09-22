import React,{ useState } from 'react'
import './App.css'
import './index.css'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Inputpage from './Components/Inputpage';
import OutputPage from './Components/Outputpage';


function App() {


  const [value, setValue] = useState(null)

  const handleChange = (newValue) => {
    setValue(newValue)
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inputpage/>} />
          <Route path='/output' element ={<OutputPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
