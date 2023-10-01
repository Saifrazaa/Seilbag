import {
  NativeEventEmitter,
  NativeModules,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '@theme/values/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@utils/variables';
import {Box} from '@theme/grid';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ptp, requestBluetoothPermission} from '@utils/helper';
import {RegularText} from '@theme/typography';
import SettingIcon from '@assets/media/gear.svg';
import PrimaryButton from '@components/buttons/primary-button';
import BleManager from 'react-native-ble-manager';
import base64 from 'base-64';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Devices = ({
  handleConnection,
}: {
  handleConnection: (value: boolean) => void;
}) => {
  const insets = useSafeAreaInsets();
  const [showConnected, setShowConnected] = useState<boolean>(false);
  const [foundDevices, setFoundDevices] = useState([]);
  const [pairedDevices, setPairedDevice] = useState<any>();
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [modalOpen, setModalOpen] = useState(true);

  const serviceUUI = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
  const characteristicsUUI = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';

  const scanDevices = () => {
    BleManager.scan([], 3, false).then(() => {
      // Success code
      console.log('Scan started');
    });
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
  };

  const handleDiscoverPeripheral = (peripheral: any) => {
    setFoundDevices(prev => [...prev, peripheral]);
  };

  useEffect(() => {
    checkPermissions();
    getConnectedDevices();
  }, []);

  const checkPermissions = () => {
    requestBluetoothPermission()
      .then(res => {
        if (res) {
          // checkSubscription();
          scanDevices();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDeviceConnect = (device: any) => {
    BleManager.connect(device.id)
      .then(() => {
        setShowConnected(true);
        handleConnection(true);
        // Success code
        setConnectedDevice(device);
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  };

  const getConnectedDevices = () => {
    BleManager.getBondedPeripherals().then(peripheralsArray => {
      setPairedDevice(peripheralsArray);
    });
  };

  const writeData = () => {
    const data = [0];
    BleManager.write(connectedDevice?.id, serviceUUI, characteristicsUUI, data)
      .then(res => {
        // Success code
        console.log('Write: ' + data);
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  };

  return modalOpen ? (
    <Box
      style={[
        styles.root,
        {
          marginTop: insets.top,
        },
      ]}
      centered
      justified>
      <View style={styles.contentContainer}>
        {!showConnected ? (
          <>
            <RegularText size={16} color={Colors.darktext}>
              Detect SeilBag Device
            </RegularText>
            <RegularText size={16} color={Colors.darktext}>
              please select Device
            </RegularText>
            <ScrollView>
              <Box row end>
                <RegularText style={{marginTop: ptp(24)}}>
                  Paired Device
                </RegularText>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: '#CACAC9',
                    marginLeft: ptp(24),
                  }}
                />
              </Box>
              {pairedDevices?.map((device: any, index: any) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleDeviceConnect(device)}>
                  <Box
                    style={[
                      styles.device,
                      {borderTopWidth: index === 0 ? 0 : 1},
                    ]}>
                    <Box row centered spaced style={{width: '100%'}}>
                      <RegularText
                        color={Colors.darktext}
                        size={index === 0 ? 16 : 14}>
                        {device.name}
                      </RegularText>
                      <SettingIcon width={ptp(18)} height={ptp(18)} />
                    </Box>
                  </Box>
                </TouchableOpacity>
              ))}
              <Box row end>
                <RegularText style={{marginTop: ptp(24)}}>
                  New Device
                </RegularText>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: '#CACAC9',
                    marginLeft: ptp(24),
                  }}
                />
              </Box>
              {foundDevices.map((device: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleDeviceConnect(device)}>
                  <Box
                    style={[
                      styles.device,
                      {borderTopWidth: index === 0 ? 0 : 1},
                    ]}>
                    <Box row centered spaced style={{width: '100%'}}>
                      <RegularText color={Colors.darktext}>
                        {device.name || 'unknown'}
                      </RegularText>
                      <SettingIcon width={ptp(18)} height={ptp(18)} />
                    </Box>
                  </Box>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={{paddingHorizontal: ptp(10)}}>
              <PrimaryButton onPress={() => setModalOpen(false)}>
                OK
              </PrimaryButton>
            </View>
          </>
        ) : (
          <>
            <RegularText size={16} color={Colors.darktext}>
              Already Connected SeilBag Device.
            </RegularText>
            <Box centered style={styles.centeredHeading}>
              <RegularText size={16} style={{marginTop: ptp(24)}}>
                Connected Device
              </RegularText>
            </Box>
            <Box centered style={styles.centeredHeading}>
              <RegularText color={Colors.darktext} style={{marginTop: ptp(24)}}>
                {connectedDevice?.name}
              </RegularText>
            </Box>

            <View style={{paddingHorizontal: ptp(6), paddingVertical: ptp(12)}}>
              <PrimaryButton outlined>Device Name Change</PrimaryButton>
              <PrimaryButton outlined style={{marginVertical: ptp(16)}}>
                Delete Device
              </PrimaryButton>
              <PrimaryButton onPress={() => setModalOpen(false)}>
                OK
              </PrimaryButton>
            </View>
          </>
        )}
      </View>
    </Box>
  ) : null;
};

export default Devices;

const styles = StyleSheet.create({
  root: {
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  contentContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    width: SCREEN_WIDTH * 0.7,
    maxHeight: SCREEN_HEIGHT * 0.7,
    paddingVertical: ptp(12),
    paddingHorizontal: ptp(10),
  },
  device: {
    paddingVertical: ptp(16),
    paddingHorizontal: ptp(12),
    borderColor: '#CACAC9',
    borderTopWidth: 1,
  },
  centeredHeading: {
    paddingBottom: ptp(16),
    borderColor: '#CACAC9',
    borderBottomWidth: 1,
  },
});
