import React, { useState, useEffect } from 'react';

var characteristics, characteristic, server, services
const deviceName ='ESP32';
const bleService = '8001e80e-f029-11ee-a951-0242ac120002';
const ledCharacteristic = '8001ea3e-f029-11ee-a951-0242ac120002';
const limtCharacteristic = '8001ee58-f029-11ee-a951-0242ac120002';
const limbCharacteristic = '8001efc0-f029-11ee-a951-0242ac120002';

const BluetoothComponent = () => {
    const [supportsBluetooth, setSupportsBluetooth] = useState(false);
    const [isDisconnected, setIsDisconnected] = useState(true);
  const [characteristic1Value, setCharacteristic1Value] = useState(null);
  const [characteristic2Value, setCharacteristic2Value] = useState(null);

  useEffect(() => {
    if (navigator.bluetooth) {
      setSupportsBluetooth(true);
      console.log("Navegador soporta Web Bluetooth")
    }
  }, []);

  const onDisconnected = (event) => {
    alert(`The device ${event.target} is disconnected`);
    setIsDisconnected(true);
  }

  const handleConnectClick = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{
            name: deviceName,
            services: [bleService]
          }],
        optionalServices: [bleService], // Add your desired service UUID here
      });

      setIsDisconnected(false);
      // Add an event listener to detect when a device disconnects
      device.addEventListener('gattserverdisconnected', onDisconnected);

        // Iterate through each service
     server = await device.gatt.connect();
     services = await server.getPrimaryServices();
        for (const service of services) {
          console.log('Service UUID:', service.uuid);
          
          // Check if the service contains the desired characteristic1
          if (service.uuid === bleService) { // Replace with your service UUID
            characteristics = await service.getCharacteristics();
            
            // Iterate through characteristics of the service
            for (characteristic of characteristics) {
              console.log('Characteristic UUID:', characteristic.uuid);
              
              // Check if the characteristic matches the desired one
              if (characteristic.uuid === limbCharacteristic) { // Replace with your characteristic UUID
                // Set up characteristic1 notifications and read initial value
                characteristic.addEventListener('characteristicvaluechanged', handleCharacteristic1ValueChanged);
                await characteristic.startNotifications();
                const value1 = await characteristic.readValue();
                var decoder = new TextDecoder().decode(value1);
                setCharacteristic1Value(decoder);
              }
              // Repeat the same process for other characteristics if needed
            }
          }
        }
    } catch (error) {
      console.error('Error requesting Bluetooth device:', error);
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
  const handleCharacteristic1ValueChanged = (event) => {
    var decoder = new TextDecoder().decode(event.target.value);
    setCharacteristic1Value(decoder);
  };

  const handleCharacteristic2ValueChanged = (event) => {
    const value = event.target.value;
    setCharacteristic2Value(value);
  };

  return (
    <div>
      {supportsBluetooth && !isDisconnected ? (
        <div>
          <p>Connected to: {deviceName}</p>
            <div>
              <p>Characteristic 1 Value: {characteristic1Value}</p>
            </div>
          <button onClick={BLEdisconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={handleConnectClick}>Connect</button>
      )}
    </div>
  );
};

export default BluetoothComponent;
