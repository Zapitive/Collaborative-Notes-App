import React, { useState } from 'react'
import {AppContext} from './AppContext'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NotesPage from './pages/NotesPage'
import SignupPage from './pages/SignupPage'
import Note from './components/Note'

function App() {
  const [usertoken, setUsertoken] = useState('')

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={{usertoken:usertoken,setUsertoken:setUsertoken}}>
          <Routes>
            <Route path='/' element={<SignupPage />} />
            <Route path='/notes' element={<NotesPage />} />
            <Route path='/note' element={<Note/>} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
