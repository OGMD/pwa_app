import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProgressBar from '../components/progressBar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

var characteristic2, server, service, characteristic, characteristic3,characteristics;
var objData;
const deviceName ='ESP32';
const bleService = '8001e80e-f029-11ee-a951-0242ac120002';
const ledCharacteristic = '8001ea3e-f029-11ee-a951-0242ac120002';
const limtCharacteristic = '8001ee58-f029-11ee-a951-0242ac120002';
//const limbCharacteristic = '8001efc0-f029-11ee-a951-0242ac120002';


function BleWeb() {
 
  const [supportsBluetooth, setSupportsBluetooth] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [visible, setVisible] = useState(false);
  const [limtVal, setLimtVal] = useState(0);
  const [limbVal, setLimbVal] = useState(0);
  const [vueltasVal, setVueltasVal] = useState(0);
  const [msg,setMsg] = useState('');
  // When the component mounts, check that the browser supports Bluetooth
  useEffect(() => {
    if (navigator.bluetooth) {
      setSupportsBluetooth(true);
      console.log("Navegador soporta Web Bluetooth")
    }

  }, []);

  /**
   * Let the user know when their device has been disconnected. 
   */
  const onDisconnected = (event) => {
    alert(`The device ${event.target} is disconnected`);
    setIsDisconnected(true);
  }

  /**
   * Update the value shown on the web page when a notification is
   * received.
   */
  const handleCharacteristicValueChanged = (event) => {
    var decoder = new TextDecoder().decode(event.target.value);
    setBatteryLevel(event.target.value.getUint16(0));
    console.log(decoder);
    console.log(typeof decoder);
    objData = decoder.split(',');
    console.log(objData);
    setVueltasVal(objData[2]);
    setLimbVal(objData[1]);
    setLimtVal(objData[0]);
  }


  /**
   * Attempts to connect to a Bluetooth device and subscribe to
   * battery level readings using the battery service.
   */
  const connectToDeviceAndSubscribeToUpdates = async () => {
    try {
      // Search for Bluetooth devices that advertise a battery service
      const device = await navigator.bluetooth
        .requestDevice({
          filters: [{
            name: deviceName,
            services: [bleService]
          }]
        });

      setIsDisconnected(false);

      // Add an event listener to detect when a device disconnects
      device.addEventListener('gattserverdisconnected', onDisconnected);

      // Try to connect to the remote GATT Server running on the Bluetooth device
       server = await device.gatt.connect();

      // Get the battery service from the Bluetooth device
       service = await server.getPrimaryService(bleService);
      //obtener caracteristicas 
    
       // Get the battery level characteristic from the Bluetooth device
      characteristic = await service.getCharacteristic(limtCharacteristic);
      characteristic.startNotifications();
      
      // Subscribe to battery level notifications

      // When the battery level changes, call a function
      characteristic.addEventListener('characteristicvaluechanged',
                                  handleCharacteristicValueChanged);

      
      // Read the battery level value
      const reading = await characteristic.readValue();
      const reading2 = await characteristic.readValue(); 

      var decoder = new TextDecoder().decode(reading2);
      
      // Show the initial reading on the web page
      setBatteryLevel(reading.getUint24(0) + '%');
      setLimtVal(decoder);
      console.log(decoder)
      
      characteristic2 = await service.getCharacteristic(ledCharacteristic);
    } catch(error) {
      console.log(`There was an error: ${error}`);
    }
  };

  async function BLEdisconnect(){
    try{
  
      console.log("Bluetooth desconectado")
      return server.disconnect();
    }
    catch(error){
      console.log(error)
    }
  }

  async function writeData(value){

    if (server && server.connected) {
      service.getCharacteristic(ledCharacteristic)
      .then(characteristic2 => {
          console.log("Caracteristicas encontradas: ", characteristic2.uuid);
          console.log(value);
          console.log(typeof value);
          const data = new Uint8Array([value]);
          return characteristic2.writeValue(data);
      })
      .then(() => {
          //latestValueSent.innerHTML = value;
          alert("Valor Escrito en Caracteristicas:" + value);
      })
      .catch(error => {
          alert("Error al escribir en caracteristicas: " + error);
      });
    } else {
        alert ("Bluetooth no esta conectado, no se pueden escribir caracteristicas.")
        window.alert("Bluetooth no esta conectado no se pueden escribir caracteristicas. \n Conecte el dispositivo!")
    }
  }

return (
  <>
  <NavBar/>
  <Modal titulo={"Control Manual"} show={visible} handleClose={() => setVisible(false)}>
     <div className="gridmodalcontainer">
      <div className="ledprobe probeModal">
          <div className="btndiv">
          <button className='button-31' onClick={() => writeData(1) }>ON</button>
          <button className='button-32' onClick={() => writeData(0) }>OFF</button>
          </div>
          </div>
          <div className="elevprobe probeModal">
          <div className="btndiv">
            <button className='button-31' onClick={ () => writeData('U') }>UP</button>
            <button className='button-32' onClick={ () => writeData('D') }>DOWN</button>
            <button className='button-31' onClick={ () => writeData('S') }>STOP</button>
          </div>
          </div>
          <div className="elevBase probeModal">
          <div className="btndiv">
            <button className='button-32' onClick={ () => writeData('0')}>OnSpin</button>
            <button className='button-31' onClick={ () => writeData('F') }>OffSpin</button>
          </div>
          </div>
          <div className="vueltasProve probeModal">
          <div className="btndiv">
            <input type='text' className='inputProbe' placeholder='Vueltas' value={msg} onChange={(e) => setmsg(e.target.value)}/>
            <button className="button-31" onClick={() =>writeData(Number(msg))}>Send</button>
          </div>
      </div>
     </div>
  </Modal>
  <div className="App">
    <h1>BLE Connection</h1>
    <div className="gridcontainer">
        <div className="buttonContainer sensItemCard2">
        <div className="connect">

          {/* {supportsBluetooth && !isDisconnected &&
                <p>Datos recividos: {[batteryLevel]}</p>
          } */}
          {supportsBluetooth && isDisconnected &&
            <button className="button-32" onClick={connectToDeviceAndSubscribeToUpdates}>Conectar</button>
          }
          {!supportsBluetooth &&
            <p>Este navegador no soporta Web Bluetooth</p>
          }
            <button className="button-31" onClick={() => BLEdisconnect()}>Desconectar</button>
        </div>
        </div>
        <div className="sens1 sensItemCard CardRounded">
          <div className="containerFlexCard">
              <div className="SensData">
              <ProgressBar className="ProgressBar" percentage={vueltasVal} circleWidth="140" MaxVal={15}/>
              </div>
              <div className="SensInfo">
                  <h2 className="sensInfoh2">Vueltas Emplaye</h2>
                  <p className="sensInfop sensIm">
                    Muestra el numero de vueltas que se necesitan para el emplaye de la carga,
                    junto al calculo de muestra en metros del uso del emplaye.
                  </p>
                <button className="button-17" role="button">Ver datos</button>
              </div>
          </div>
        </div>
        <div className="sens2 sensItemCard">
        <div className="containerFlexCard">
              <div className="SensData">
                <ProgressBar className="ProgressBar" percentage={vueltasVal} circleWidth="140" MaxVal={20}/> 
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
                   <div className={limtVal == 1 ? "SensDataN" : "SensDataChangeColor" }>
                        <h1 className="sensh1">
                          {limtVal}
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
                  <div className={limbVal == 1 ? "SensDataN" : "SensDataChangeColor" }>
                        <h1 className="sensh1">
                          {limbVal}
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
                  <div className={limbVal == 1 ? "SensDataN" : "SensDataChangeColor" }>
                  <h1 className="sensh1">
                          {limbVal}
                          </h1> 
                  </div>
              </div>
        </div>
      </div>
  </div>
  <Footer/>
  </>
);

}

export default BleWeb;