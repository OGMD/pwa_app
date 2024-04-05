import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ProgressBar from '../components/progressBar';
import Footer from '../components/Footer';
import Slider from '../components/slider';
const socket = io("/");

/*Obtener cuantos sensores hay */
var NewObj = {};
var myObj = {};
var myArray = [];
var ArrayDatos = [];
var ArrayLength;


function obtainData ( ){

  socket.once('sensClientData', (data) => {
   NewObj = JSON.parse(data)
   myArray = Object.keys(NewObj)
   ArrayLength = myArray.length
   return console.log(ArrayLength)
  })
/*   socket.off('sensClient',(data) =>{
    console.log(data)
  }) */
}

obtainData()



const DashBoard = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [response, setResponse] = useState(0);
  const [sens2, setSens2] = useState(0);
  const [sens3, setSens3] = useState(0);
  const [sens4, setSens4] = useState(0);
  const [sens5, setSens5] = useState(0);
  const [sens6, setSens6] = useState(0);
  var referencia = useRef()
  //var myObj = [];
  //const [percentage, setPercentage] = useState(35);

  //var sens1 = "Hola";
  ArrayDatos = [response,sens2,sens3,sens4,sens5,sens6];
  //console.log(ArrayDatos);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });
    socket.on('sensClientData',(data) => {
      //console.log(data);
      //console.log(mysens);
      //console.log(typeof data);
      myObj = JSON.parse(data);
    
      //console.log(myObj);
      //console.log(typeof myObj.sens1);
      setResponse(myObj.sens1);
      setSens2(myObj.sens2);
      setSens3(myObj.sens3);
      setSens4(myObj.sens4);
      setSens5(myObj.sens5);
      setSens6(myObj.sens6);
      //console.log(`Sens1: ${setResponse(myObj.sens1)}`)

    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, [])


/*
  const sendPing = () => {
    var data = "Encender";
    socket.emit('ButtonMain', data);
    console.log(`${data} Machine ----`)
  }*/

  return (
    <div>
     {/*} <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>*/}

  <div className="grid-Container">
      <div className="sens1 sensItemCard CardRounded">
        <div className="containerFlexCard">
            <div className="SensData">
             <ProgressBar className="ProgressBar" percentage={response} circleWidth="140" MaxVal={4096}/>
            </div>
            <div className="SensInfo">
                <h2 className="sensInfoh2">Temperatura</h2>
                <p className="sensInfop">
                    Muestra la lectura en grados celcius del ambiente.
                </p>
               <button className="button-17" role="button">Ver datos</button>
            </div>
        </div>
      </div>
      <div className="sens2 sensItemCard">
      <div className="containerFlexCard">
            <div className="SensData">
              <ProgressBar className="ProgressBar" percentage={sens2} circleWidth="140" MaxVal={4096}/> 
            </div>
            <div className="SensInfo">
                <h2 className="sensInfoh2">Humedad</h2>
                <p className="sensInfop">
                    Muestra la lectura del ambiente en forma de porcentaje.
                </p>
               <button className="button-17" role="button">Ver datos</button>
            </div>
        </div>
      </div>
      <div className="sens3 sensItemCardn">   
            <div className="containerFlexCard">
                <div className="SensInfoN">
                    <h2 className="sensInfoNh2">Nivel 1</h2>
                    <p className="sensInfNop">
                    Muestra el estado del Nivel1 en activo o No.
                    </p>
                <button className="BtnN" role="button">Ver datos</button>
                </div>
                <div className={sens3 == 1 ? "SensDataN" : "SensDataChangeColor" }>
                       <h1 className="sensh1">
                        {sens3}
                        </h1> 
                </div>
            </div>
        </div>
      <div className="sens4 sensItemCardn">
      <div className="containerFlexCard">
                <div className="SensInfoN">
                    <h2 className="sensInfoNh2">Nivel 2</h2>
                    <p className="sensInfNop">
                    Muestra el estado del Nivel1 en activo o No.
                    </p>
                <button className="BtnN" role="button">Ver datos</button>
                </div>
                <div className={sens4 == 1 ? "SensDataN" : "SensDataChangeColor" }>
                <h1 className="sensh1">
                        {sens4}
                        </h1> 
                </div>
            </div>
      </div>
      <div className="sens5 sensItemCardn">
      <div className="containerFlexCard">
                <div className="SensInfoN">
                    <h2 className="sensInfoNh2">Nivel 3</h2>
                    <p className="sensInfNop">
                    Muestra el estado del Nivel1 en activo o No.
                    </p>
                <button className="BtnN" role="button">Ver datos</button>
                </div>
                <div className={sens5 == 1 ? "SensDataN" : "SensDataChangeColor" }>
                <h1 className="sensh1">
                        {sens5}
                        </h1> 
                </div>
            </div>
      </div>
      <div className="sens6 sensItemCard">
      <div className="containerFlexCard">
            <div className="SensData">
            <ProgressBar className="ProgressBar" percentage={sens6} circleWidth="140" MaxVal={10000}/>
            </div>
            <div className="SensInfo">
                <h2 className="sensInfoh2">Caudal</h2>
                <p className="sensInfop">
                    Muestra la lectura del flujo de agua en volumen.
                </p>
               <button className="button-17" role="button">Ver datos</button>
            </div>
        </div>
      </div>
    </div>
    <div ref={referencia} className="SliderContainer">
      <Slider carousel={referencia} mySensLength={myArray} DataSens={ArrayDatos}/>
    </div>
{/*}
      <button onClick={ sendPing }>Send ping</button>
      <input type="range" min="1" max="4096" step="1" value={percentage} onChange={(ev) => setPercentage(ev.target.value)}/>
  */}
  <Footer/>
    </div>
  )
}

export default DashBoard