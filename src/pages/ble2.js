import React, { useState, useEffect } from 'react';

var characteristic2, server, service, characteristic, characteristic3,characteristics;
var myObj;
var objData;
const deviceName ='ESP32';
const bleService = '8001e80e-f029-11ee-a951-0242ac120002';
const ledCharacteristic = '8001ea3e-f029-11ee-a951-0242ac120002';
const limtCharacteristic = '8001ee58-f029-11ee-a951-0242ac120002';
//const limbCharacteristic = '8001efc0-f029-11ee-a951-0242ac120002';

function BleAPP() {
  const [supportsBluetooth, setSupportsBluetooth] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [limtVal, setLimtVal] = useState(null);
  const [limbVal, setLimbVal] = useState(null);
  const [vueltasVal, setVueltasVal] = useState(null);
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
    <div className="BleAPP">
      <h1>Get Device Battery Info Over Bluetooth</h1>
      {supportsBluetooth && !isDisconnected &&
           <p>Battery level: {batteryLevel}</p>
      }
            <p>HIGH Limit level: {limtVal}</p>
            <p>LOW Limit level: {limbVal}</p>
            <p>Vueltas: {vueltasVal}</p>
      {supportsBluetooth && isDisconnected &&
        <button onClick={connectToDeviceAndSubscribeToUpdates}>Connect to a Bluetooth device</button>
      }
      {!supportsBluetooth &&
        <p>This browser doesn't support the Web Bluetooth API</p>
      }
      <input type="text" placeholder='Numero Vueltas' value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button className="button-17" onClick={() =>writeData(Number(msg))} >Send</button>
      <button className="button-17" onClick={() => BLEdisconnect()}>Desconectar</button>
      <button className="button-17" onClick={() =>writeData(1)} >ON</button>
      <button className="button-17" onClick={() => writeData(0)} > OFF</button>
    </div>
  );
}

export default BleAPP;