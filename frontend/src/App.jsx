import React, { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'
import NotesPage from './pages/NotesPage'
import SignupPage from './pages/SignupPage'

function App() {
  const [usertoken, setUsertoken] = useState('')

  return (
    <>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignupPage />} />
          <Route path='/notes' element={<NotesPage />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
    </>
  )
}

export default App
