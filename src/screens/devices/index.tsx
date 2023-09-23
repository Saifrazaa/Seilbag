import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {type FC, useState} from 'react';
import {Colors} from '@theme/values/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@utils/variables';
import {Box} from '@theme/grid';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ptp} from '@utils/helper';
import {RegularText} from '@theme/typography';
import {PAIRED_DEVICES, UNPAIRED_DEVICES} from '@data/devices';
import SettingIcon from '@assets/media/gear.svg';
import PrimaryButton from '@components/buttons/primary-button';
import {HomeScreenProps} from '@utils/@types';

type DevicesProps = HomeScreenProps<'devices'>;

const Devices: FC<DevicesProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [showConnected, setShowConnected] = useState<boolean>(false);

  const toggleConnected = () => {
    setShowConnected(!showConnected);
  };
  return (
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
              {PAIRED_DEVICES.map((device, index) => (
                <TouchableOpacity key={index} onPress={toggleConnected}>
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
              {UNPAIRED_DEVICES.map((device, index) => (
                <TouchableOpacity key={index}>
                  <Box
                    style={[
                      styles.device,
                      {borderTopWidth: index === 0 ? 0 : 1},
                    ]}>
                    <Box row centered spaced style={{width: '100%'}}>
                      <RegularText color={Colors.darktext}>
                        {device.name}
                      </RegularText>
                      <SettingIcon width={ptp(18)} height={ptp(18)} />
                    </Box>
                  </Box>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={{paddingHorizontal: ptp(10)}}>
              <PrimaryButton onPress={() => navigation.goBack()}>
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
                Device Name
              </RegularText>
            </Box>

            <View style={{paddingHorizontal: ptp(6), paddingVertical: ptp(12)}}>
              <PrimaryButton onPress={toggleConnected} outlined>
                Device Name Change
              </PrimaryButton>
              <PrimaryButton
                onPress={toggleConnected}
                outlined
                style={{marginVertical: ptp(16)}}>
                Delete Device
              </PrimaryButton>
              <PrimaryButton onPress={toggleConnected}>OK</PrimaryButton>
            </View>
          </>
        )}
      </View>
    </Box>
  );
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
