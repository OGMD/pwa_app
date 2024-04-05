import React from 'react'
import NavBar from '../components/NavBar'
import '../styles/Home.css'
import Wifilogo from '../assets/websocket.png'
import Blelogo from '../assets/Bluetooth.png'
import { VscSymbolInterface } from "react-icons/vsc";
import { MdDeviceHub } from "react-icons/md";
import { TbManualGearbox,TbPhotoSensor } from "react-icons/tb";
import { GrVirtualMachine } from "react-icons/gr";
import { FaNetworkWired } from "react-icons/fa";
import Footer from '../components/Footer'


let name = 'OGMD'
let ID = 'ESP32OGMD_123'

function Home() {
  return (
    <>
      <NavBar/>
      <div className='homeContainer'>
        <div className="homegrid">
            <div className="header2 rdnc">
            <div className="flexheader2">
              <div className="bar"></div>
              <div className="header2flexcnt">
                <h1 className="h1home">FlexSeal</h1>
                <h3 className="h3home">Emplayado Seguro</h3>
              </div>
            </div>
            </div>
            <div className="device rdnc">
              <div className="deviceflex">
                <div className="imguser">
                    <img src="#" alt="#" className="imgusuario" />
                </div>
                <div className="userdata">
                      <h2 className="h2username">Username: {name}</h2>
                    <h2 className="h2sysID">Device ID: {ID}</h2>
                </div>
              </div>
            </div>
            <div className="wifi rdnc">
              <div className="wififlex">
                <div className="wifilogo">
                  <img src={Wifilogo} alt="websockets"/>
                </div>
                <div className="wificontent">
                  <h2 className="h2wifi">
                    RealTime Monitoring WebSocket
                  </h2>
                  <h4 className="h4wifi">
                    Desea monitorear su maquina mediante Websockets 
                    y los Servidores de Firebase.
                  </h4>
                  <button className="button-17">Monitorear</button>
                </div>
              </div>
            </div>
            <div className="settings rdnc">
              <div className="settingslogo">
                <img src="#" alt="#" className="setlogo" />
                <h2 className="h2set">Settings</h2>
              </div>
              <div className="setlist">
                <ul className="ulsetlist">
                  <li className="li1">
                      <VscSymbolInterface />
                      <div className='configdata'>
                       Color Interface
                      </div>
                  </li>
                  <li className="li2">
                      <MdDeviceHub />
                      <div className='configdata'>
                       Device Name
                      </div>
                  </li>
                  <li className="li3">
                      <TbManualGearbox />
                      <div className='configdata'>
                       Manual Control
                      </div>
                  </li>
                  <li className="li4">
                      <GrVirtualMachine />
                      <div className='configdata'>
                       Machine Test
                      </div>
                  </li>
                  <li className="li5">
                      <FaNetworkWired />
                      <div className='configdata'>
                       Network Data
                      </div>
                  </li>
                  <li className="li6">
                      <TbPhotoSensor />
                      <div className='configdata'>
                       Sensor Detection
                      </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="BLE rdnc">
              <div className="BLEflex">
                <div className="BLEcontent">
                  <h2 className="h2BLE">
                    RealTime Monitoring BLE
                  </h2>
                  <h4 className="h4BLE">
                    Desea monitorear su maquina mediante WebBluetooth 
                    y componentes locales.
                  </h4>
                  <button className="button-17">Monitorear</button>
                </div>
                <div className="BLElogo">
                  <img src={Blelogo} alt="Bluetooth" />
                </div>
              </div>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home