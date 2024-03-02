import { CSSProperties, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Catalog from './pages/Catalog'
import Contact from './pages/Contact'
import Favourite from './pages/Favourite'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Details from './pages/Details'
import List from './pages/Home/List'
import Men from './components/Men'
import Women from './components/Women'
import Electronic from './components/Electronic'
import Cart from './pages/Cart'

function App() {
  const styles={
    containerStyle:{
      display:"flex",
      flexDirection:"column",
      width:"100%",
      height:"100vh"
    } as CSSProperties
  }

  return (
    <div style={styles.containerStyle}>
      <Navbar />
      <MyRoutes />
    </div>
  )
}

export const MyRoutes =()=>{
  return(
    <>
    <Routes>
      <Route path='/home/*' element={<Home/>}/>
      <Route path='/catalog' element={<Catalog/>}/>
        <Route path='/catalog/men' element={<Men/>}/>
        <Route path='/catalog/women' element={<Women/>}/>
        <Route path='/catalog/electronic' element={<Electronic/>}/>
      <Route path='/favourite' element={<Favourite/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='*' element={<Navigate to="/home"/>}/>
    </Routes>
    
    </>
  )
}

export default App
