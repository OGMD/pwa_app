import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProgressBar from '../components/progressBar';
import Footer from '../components/Footer';
let device,server,service,characteristic, characteristic2, characteristic3, characteristic4, characteristic5, characteristic6, data
var bleService = '8001e80e-f029-11ee-a951-0242ac120002';
var ledCharacteristic = '8001ea3e-f029-11ee-a951-0242ac120002';
//var sensorCharacteristic= '19b10001-e8f2-537e-4f6c-d104768a1214';
var limtCharacteristic = '8001ee58-f029-11ee-a951-0242ac120002';
var limbCharacteristic = '8001efc0-f029-11ee-a951-0242ac120002';
var VueltasCharacteristic = '8001f0e2-f029-11ee-a951-0242ac120002';
var EmplayeCharacteristic = '8001f1fa-f029-11ee-a951-0242ac120002';


var deviceName ='ESP32';

function BleWeb() {
 
const [supportsBluetooth, setSupportsBluetooth] = useState(false);
const [isDisconnected, setIsDisconnected] = useState(true);
//const [batteryLevel, setBatteryLevel] = useState(null);
const [limTop, setLimTop] = useState(null);
const [limBtm, setLimBtm] = useState(null);
const [vueltas, setVueltas] = useState(null);
const [Emplaye, setEmplaye] = useState(null);

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
  alert(`El dispositivo ${event.target} esta desconectado`);
  setIsDisconnected(true);
  console.log()
}

/**
 * Update the value shown on the web page when a notification is
 * received.
 */
const handleCharacteristicValueChanged = (event) => {
  const newValueReceived = new TextDecoder().decode(event.target.value);
 // setBatteryLevel(newValueReceived);
  setLimTop(newValueReceived);
  console.log(newValueReceived);
}

const handleCharacteristicValueChanged2 = (event) => {
  const newValueReceived2 = new TextDecoder().decode(event.target.value);
  setLimBtm(newValueReceived2);
 
  console.log(newValueReceived2); 
}
const handleCharacteristicValueChanged3 = (event) => {
  const newValueReceived3 = new TextDecoder().decode(event.target.value);
  setVueltas(newValueReceived3);
  
  console.log(newValueReceived3);
}
const handleCharacteristicValueChanged4 = (event) => {
  const newValueReceived4 = new TextDecoder().decode(event.target.value);
  setEmplaye(newValueReceived4);
  console.log(newValueReceived4);
}


const connectToDeviceAndSubscribeToUpdates = async () => {
  try {

    const device = await navigator.bluetooth
      .requestDevice({
        filters:[{
          name: deviceName,
          services: [bleService]
        }],
     /*    acceptAllDevices: true, */
      });

    setIsDisconnected(false);

    // Add an event listener to detect when a device disconnects
    device.addEventListener('gattserverdisconnected', onDisconnected);

    // Try to connect to the remote GATT Server running on the Bluetooth device
    server = await device.gatt.connect();

    // Get the battery service from the Bluetooth device
    service = await server.getPrimaryService(bleService);

    // Get the battery level characteristic from the Bluetooth device
  //  characteristic = await service.getCharacteristic(sensorCharacteristic);
    characteristic3 = await service.getCharacteristic(limtCharacteristic);
    characteristic4 = await service.getCharacteristic(limbCharacteristic);
    characteristic5 = await service.getCharacteristic(VueltasCharacteristic);
    characteristic6 = await service.getCharacteristic(EmplayeCharacteristic);

    // Subscribe to battery level notifications
  //  characteristic.startNotifications();
    characteristic3.startNotifications();
    characteristic4.startNotifications();
    characteristic5.startNotifications();
    characteristic6.startNotifications();

    // When the battery level changes, call a function
   // characteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);
    characteristic3.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);
    characteristic4.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged2);
    characteristic5.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged3);
    characteristic6.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged4);
    // Read the battery level value
   // const reading = await characteristic.readValue();
    const reading2 = await characteristic3.readValue();
    const reading3 = await characteristic4.readValue();
    const reading4 = await characteristic5.readValue();
    const reading5 = await characteristic6.readValue();

    // Show the initial reading on the web page
  //  var decoder = new TextDecoder().decode(reading);
    var decoder2 = new TextDecoder().decode(reading2);
    var decoder3 = new TextDecoder().decode(reading3);
    var decoder4 = new TextDecoder().decode(reading4);
    var decoder5 = new TextDecoder().decode(reading5);

  //  setBatteryLevel(decoder);
    setLimTop(decoder2);
    setLimBtm(decoder3);
    setVueltas(decoder4);
    setEmplaye(decoder5);

    console.log(decoder2)
    console.log(decoder3)
    console.log(decoder4)
    console.log(decoder5)
   // console.log(decoder);


    characteristic2 = await service.getCharacteristic(ledCharacteristic);
    
  } catch(error) {
    console.log(`Ocurrio un error: ${error}`);
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
  <div className="App">
    <h1>BLE Connection</h1>
    <div className="gridcontainer">
        <div className="buttonContainer sensItemCard2">
          {/* {supportsBluetooth && !isDisconnected &&
                <p>Datos recividos: {[batteryLevel]}</p>
          } */}
          {supportsBluetooth && isDisconnected &&
            <button className="button-17" onClick={connectToDeviceAndSubscribeToUpdates}>Conectar</button>
          }
          {!supportsBluetooth &&
            <p>Este navegador no soporta Web Bluetooth</p>
          }
            <button className="button-17" onClick={() => BLEdisconnect()}>Desconectar</button>
            <button className="button-17" onClick={() =>writeData(1)} >ON</button>
            <button className="button-17" onClick={() => writeData(0)} > OFF</button>
        </div>
        <div className="sens1 sensItemCard CardRounded">
          <div className="containerFlexCard">
              <div className="SensData">
              <ProgressBar className="ProgressBar" percentage={vueltas} circleWidth="140" MaxVal={15}/>
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
                <ProgressBar className="ProgressBar" percentage={[vueltas]} circleWidth="140" MaxVal={20}/> 
              </div>
              <div className="SensInfo">
                  <h2 className="sensInfoh2">Numero de vueltas</h2>
                  <p className="sensInfop">
                      Muestra el numero de vueltas que se necesitan para la carga.
                  </p>
                <button className="button-17 btnml" role="button">Ver datos</button>
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
                   <div className={[limTop] == 1 ? "SensDataN" : "SensDataChangeColor" }>
                        <h1 className="sensh1">
                          {limTop}
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
                  <div className={[limBtm] == 1 ? "SensDataN" : "SensDataChangeColor" }>
                        <h1 className="sensh1">
                          {limBtm}
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
                  <div className={[Emplaye] == 1 ? "SensDataN" : "SensDataChangeColor" }>
                  <h1 className="sensh1">
                          {Emplaye}
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