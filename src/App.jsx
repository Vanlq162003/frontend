import * as React from 'react'
import "./App.css";

import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import Register from './components/Auth/Register';
import Chats from './pages/Chats';



function App() {
  return <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chats' element={<Chats />} />
    </Routes>

  </>
}

export default App;
