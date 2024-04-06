import { useState,useEffect, useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import BleWeb from './pages/ble'
import Dashboard from './pages/DashBoard'
import Configuracion from './pages/Configuracion'
import BleAPP from './pages/ble2'
import BluetoothComponent from './pages/ble3'
import './App.css'
import './styles/NavBar.css'
import './styles/Dashb.css'
import './styles/modal.css'

function App() {

  function useMediaQuery (query){
    const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
    const [match, setMatch] = useState(mediaQuery.matches);

    var location = useLocation();
    console.log(location.pathname);

    useEffect(() => {
      const onChange = () => setMatch(mediaQuery.matches);
      mediaQuery.addEventListener("change", onChange);

      return () => mediaQuery.removeEventListener("change", onChange);
    }, [mediaQuery])
    return match
  }

  function useMediaQueries(){
    const md = useMediaQuery("(min-width: 800px)")
    const lg = useMediaQuery("(min-width: 1200px)")

    return {md, lg};
  }

  function ResponsiveComponent(){
    const {md, lg} = useMediaQueries();

    if(lg){
      return console.log("Desktop Device")
    }
    if(md){
      return console.log("Tablet device")
    }
    return console.log("mobile device")
  }

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/BLEDash' element={<BleWeb/>}/>
      <Route path='/BLEDash2' element={<BleAPP/>}/>
      <Route path='/BLEDash3' element={<BluetoothComponent/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Configuracion" element={<Configuracion/>}/>
      <Route path='*' />
    </Routes>
    <ResponsiveComponent/>
    </>
  )
}


export default App
