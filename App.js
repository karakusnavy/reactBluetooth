import React from 'react'
import { View, Text } from 'react-native'
import { BleManager } from 'react-native-ble-plx';

export default class App extends React.Component {
  constructor() {
    super();
    this.manager = new BleManager();
  }
  componentDidMount() {
    const subscription = this.manager.onStateChange((state) => { //auth işlemi
      if (state == 'PoweredOn') { //bluetooth açıksa
        this.scanAndConnect()
        subscription.remove();
      }
    }, true);
  }
  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      console.log(device)
      if (error) {
        //error verirse oto sistem durdurma
        return
      }
      if (device.name != null) {// gelen cihaz ismi
        console.log(device)
        this.manager.stopDeviceScan(); // atamayı durdur
      }
    });
  }


  //yazma işlemi
  /*
  writeCharacteristicWithResponseForDevice(
    deviceIdentifier: DeviceId,
    serviceUUID: UUID,
    characteristicUUID: UUID,
    base64Value: Base64,
    transactionId: TransactionId?
  ): Promise<Characteristic>
*/
  //yukarıdaki girdi açıklamaları
  /*
  deviceIdentifier(DeviceId) Device identifier.
  serviceUUID(UUID) Service UUID.
  characteristicUUID(UUID) Characteristic UUID.
  base64Value(Base64) Value in Base64 format.
  transactionId(TransactionId ?) optional transactionId which can be used in cancelTransaction() function.
    */


  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Text>
          Bluetooth Test
        </Text>
      </View>
    )
  }
}