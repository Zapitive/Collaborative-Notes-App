import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NotesPage from './pages/NotesPage'
import SignupPage from './pages/SignupPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignupPage />} />
          <Route path='/notes' element={<NotesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
