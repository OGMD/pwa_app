import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ProgressBar from '../components/progressBar';
//import Footer from '../components/Footer';
//import Slider from '../components/slider';
const socket = io("http://52.55.123.134:3000/");
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

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
  const [visible, setVisible] = useState(false);
  const [msg,setmsg] = useState('');
 // var referencia = useRef()
  //var myObj = [];
  //const [percentage, setPercentage] = useState(35);

  //var sens1 = "Hola";
  ArrayDatos = [response,sens2,sens3,sens4,sens5];
  //console.log(ArrayDatos);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log(isConnected);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log(isConnected);
    });

    socket.on('response', (message) => {
      console.log(message.msg)
    })

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
      setResponse(myObj.lim1);
      setSens2(myObj.lim1);
      setSens3(myObj.lim2);
      setSens4(myObj.Vueltas);
      setSens5(myObj.Emplaye);
      //console.log(`Sens1: ${setResponse(myObj.lim1)}`)

    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, [])



  const OnMachine = () => {
    var data = "Encender";
    socket.emit('OnMachine', data);
    console.log(`${data} Machine ----`)
  }

  const OffMachine = () => {
    var data = "Apagar";
    socket.emit('OffMachine', data);
    console.log(`${data} Machine ---`)
  }

  const OnElevador = () => {
    var data = "OnElevador";
    socket.emit('OnElevador', data);
    console.log(`${data} Machine ----`)
  }

  const OffElevador = () => {
    var data = "OffElevador";
    socket.emit('OffElevador', data);
    console.log(`${data} Machine ---`)
  }
  const OffEl = () => {
    var data = "OffEl";
    socket.emit('OffEl', data);
    console.log(`${data} Machine ---`)
  }

  const OnSpin = () => {
    var data = "OnSpin";
    socket.emit('OnSpin', data);
    console.log(`${data} Machine ----`)
  }

  const OffSpin = () => {
    var data = "OffSpin";
    socket.emit('OffSpin', data);
    console.log(`${data} Machine ---`)
  }

const sendMessage = () => {
  socket.emit('vueltas', msg)
  socket.emit('ask', msg);
}

  return (
  <div className='webapp'>
     {/*} <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>*/}
  <NavBar/>
  <Modal titulo={"Control Manual"} show={visible} handleClose={() => setVisible(false)}>
     <div className="gridmodalcontainer">
      <div className="ledprobe probeModal">
          <div className="btndiv">
          <button className='button-31' onClick={ OnMachine }>ON</button>
          <button className='button-32' onClick={ OffMachine }>OFF</button>
          </div>
          </div>
          <div className="elevprobe probeModal">
          <div className="btndiv">
            <button className='button-31' onClick={ OnElevador }>UP</button>
            <button className='button-32' onClick={ OffElevador }>DOWN</button>
            <button className='button-31' onClick={ OffEl }>STOP</button>
          </div>
          </div>
          <div className="elevBase probeModal">
          <div className="btndiv">
            <button className='button-32' onClick={ OnSpin }>OnSpin</button>
            <button className='button-31' onClick={ OffSpin }>OffSpin</button>
          </div>
          </div>
          <div className="vueltasProve probeModal">
          <div className="btndiv">
            <input type='text' className='inputProbe' placeholder='Vueltas' value={msg} onChange={(e) => setmsg(e.target.value)}/>
            <button className="button-31" onClick={sendMessage}>Send</button>
          </div>
      </div>
     </div>
  </Modal>
  <h1 className='socketh1'>WebSocket Connection</h1>
  <div className="grid-Container">
      <div className="sens1 sensItemCard CardRounded">
        <div className="containerFlexCard">
            <div className="SensData">
             <ProgressBar className="ProgressBar" percentage={sens4} circleWidth="140" MaxVal={4096}/>
            </div>
            <div className="SensInfo">
                <h2 className="sensInfoh2">Vueltas Emplaye</h2>
                <p className="sensInfop sensIm">
                   Muestra el numero de vueltas que se necesitan para el emplaye de la carga,
                   junto al calculo de muestra en metros del uso del emplaye.
                </p>
               <button className="button-17" role="button" >Ver datos</button>
            </div>
        </div>
      </div>
      <div className="sens2 sensItemCard">
      <div className="containerFlexCard">
            <div className="SensData">
              <ProgressBar className="ProgressBar" percentage={sens4} circleWidth="140" MaxVal={4096}/> 
            </div>
            <div className="SensInfo">
                <h2 className="sensInfoh2">Numero de vueltas</h2>
                <p className="sensInfop">
                    Muestra el numero de vueltas que se necesitan para la carga.
                </p>
               <button className="button-17 btnml" role="button" onClick={() => setVisible(true)}>Ver datos</button>
            </div>
        </div>
      </div>
        <div className="sens3 sensItemCardn">   
            <div className="containerFlexCard">
                <div className="SensInfoN">
                    <h2 className="sensInfoNh2">LimitSwitch Top</h2>
                    <p className="sensInfNop">
                    Muestra el nivel mas alto del elevador.
                    </p>
                <button className="BtnN" role="button">Ver datos</button>
                </div>
                <div className={sens2 == 1 ? "SensDataN" : "SensDataChangeColor" }>
                       <h1 className="sensh1">
                        {sens2}
                        </h1> 
                </div>
            </div>
        </div>
      <div className="sens4 sensItemCardn">
      <div className="containerFlexCard">
                <div className="SensInfoN">
                    <h2 className="sensInfoNh2">LimitSwitch Bottom</h2>
                    <p className="sensInfNop">
                    Muestra el nivel mas bajo del elevador.
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
      <div className="sens5 sensItemCardn">
      <div className="containerFlexCard">
                <div className="SensInfoN">
                    <h2 className="sensInfoNh2">Sensor Emplaye</h2>
                    <p className="sensInfNop">
                    Muestra la ausencia del emplaye
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
    </div>
    {/* <div ref={referencia} className="SliderContainer">
      <Slider carousel={referencia} mySensLength={myArray} DataSens={ArrayDatos}/>
    </div> */}
{/*}
      <input type="range" min="1" max="4096" step="1" value={percentage} onChange={(ev) => setPercentage(ev.target.value)}/>
  <Footer/>
  */}
    <Footer/>
    </div>
  )
}

export default DashBoard