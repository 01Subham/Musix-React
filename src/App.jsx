import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import PlayList from './pages/PlayList'
import Liked from './pages/Liked'
import Search from './pages/Search'
import Nav from './components/Nav'


const App = () => {
  return (
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/playlist' element={<PlayList/>} />
          <Route path='/liked' element={<Liked/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App