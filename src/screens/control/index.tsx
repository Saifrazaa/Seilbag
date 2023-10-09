import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {type FC, useMemo} from 'react';

import Layout from '@components/layout';
import Header from '@components/headers/header';
import {Box} from '@theme/grid';
import {ptp} from '@utils/helper';
import {SPACE_X} from '@utils/variables';
import BatteryIndicatorIcon from '@assets/media/battery-indicator.svg';
import BrightnessIcon from '@assets/media/brightness.svg';
import {Colors} from '@theme/values/colors';
import {BoldText, RegularText} from '@theme/typography';
import {useUI} from '@contexts/ui.context';
import IconButton from '@components/buttons/icon-button';
import {HomeScreenProps} from '@utils/@types';
import PowerIcon from '@assets/media/power.svg';
import PowerWhiteIcon from '@assets/media/power-white.svg';
import TriangleIcon from '@assets/media/triangle.svg';
import TriangleYellowIcon from '@assets/media/triangle-yellow.svg';
import SquareIcon from '@assets/media/square.svg';
import SquareWhiteIcon from '@assets/media/square-white.svg';
import ThreeTriangleIcon from '@assets/media/three-triangle.svg';
import ThreeTriangleWhiteIcon from '@assets/media/three-triangle-white.svg';
import LeftRightIcon from '@assets/media/left-right-arrow.svg';
import LeftRightWhiteIcon from '@assets/media/left-right-arrow-white.svg';
import LampIcon from '@assets/media/lamp.svg';
import LampWhiteIcon from '@assets/media/lamp-white.svg';
import {ControlType} from '@utils/@types';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Devices from '@screens/devices';
import {useTranslation} from 'react-i18next';

type ControlProps = HomeScreenProps<'control'>;

const Control: FC<ControlProps> = ({navigation}) => {
  const {connected, toggleConnected} = useUI();
  const {t} = useTranslation();

  const CONTROLS: Array<ControlType> = useMemo(
    () => [
      {
        id: 0,
        label: 'LED ON/OFF',
        icon: {off: PowerIcon, on: PowerWhiteIcon},
      },
      {
        id: 1,
        label: 'Emergency',
        icon: {off: TriangleIcon, on: TriangleYellowIcon},
      },
      {
        id: 2,
        label: 'Color Change',
        icon: {off: SquareIcon, on: SquareWhiteIcon},
        onPress: () => navigation.navigate('color-change'),
      },
      {
        id: 3,
        label: 'Brightness',
        icon: {off: LampIcon, on: LampWhiteIcon},
        onPress: () => navigation.navigate('brightness'),
      },
      {
        id: 4,
        label: 'Function',
        icon: {off: ThreeTriangleIcon, on: ThreeTriangleWhiteIcon},
        onPress: () => navigation.navigate('functions'),
      },
      {
        id: 5,
        label: 'Direction',
        icon: {off: LeftRightIcon, on: LeftRightWhiteIcon},
        onPress: () => navigation.navigate('directions'),
      },
    ],
    [],
  );

  console.log(connected);

  return (
    <Layout>
      <Header />
      <Box>
        <Box style={styles.topPanel}>
          <Box row centered spaced style={{width: '100%'}}>
            <Box>
              <BatteryIndicatorIcon
                width={ptp(255.76 * 0.4)}
                height={ptp(125.09 * 0.4)}
              />
              <Box style={styles.batteryPercentage}>
                {connected && (
                  <BoldText color={Colors.dim} size={24}>
                    100
                  </BoldText>
                )}
              </Box>
            </Box>
            <Box row centered>
              {connected && (
                <BoldText
                  size={24}
                  color={Colors.dim}
                  style={{marginRight: ptp(6)}}>
                  70
                </BoldText>
              )}
              <IconButton>
                <BrightnessIcon
                  width={ptp(71.04 * 0.4)}
                  height={ptp(71.04 * 0.4)}
                />
              </IconButton>
            </Box>
          </Box>
          <Box style={styles.indicator}>
            <Box row>
              <Box row style={{marginBottom: ptp(16)}}>
                {Array.from([1, 2, 3], (_, index) => {
                  return (
                    <Box
                      key={index}
                      style={[
                        styles.rectangularItem,
                        {
                          marginHorizontal: index % 2 !== 0 ? ptp(5) : 0,
                          backgroundColor: connected ? Colors.white : '#313449',
                        },
                      ]}
                    />
                  );
                })}
              </Box>
              <Box
                style={[
                  styles.rectangularItem,
                  {
                    marginLeft: ptp(72),
                    backgroundColor: connected ? '#0068FF' : '#313449',
                  },
                ]}
              />
            </Box>
            <Box row spaced style={{width: '100%', paddingHorizontal: ptp(10)}}>
              {Array.from(
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                (_, index) => {
                  return (
                    <Box
                      key={index}
                      style={[
                        styles.indicatorItem,
                        {
                          backgroundColor: connected
                            ? `rgba(255, 255, 255, ${_ * 0.1})`
                            : '#313449',
                        },
                      ]}
                    />
                  );
                },
              )}
            </Box>
          </Box>
        </Box>
        <Box row style={styles.controlContainer}>
          {CONTROLS.map((control, index) => (
            <Box
              key={index}
              style={[
                styles.controlBox,
                {
                  borderLeftWidth: index % 2 === 0 ? 0 : 1,
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                },
              ]}>
              <TouchableOpacity
                onPress={control.onPress}
                style={{width: '100%', height: '100%'}}
                disabled={!connected}>
                <Box centered justified style={{width: '100%', height: '100%'}}>
                  {connected ? (
                    <control.icon.on width={ptp(56)} height={ptp(56)} />
                  ) : (
                    <control.icon.off width={ptp(56)} height={ptp(56)} />
                  )}
                  <RegularText size={18} style={{marginTop: ptp(16)}}>
                    {t(control.label)}
                  </RegularText>
                </Box>
              </TouchableOpacity>
            </Box>
          ))}
        </Box>
      </Box>
      <SafeAreaProvider
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
        }}>
        <Devices
          handleConnection={(state: boolean) => toggleConnected(state)}
        />
      </SafeAreaProvider>
    </Layout>
  );
};

export default Control;

const styles = StyleSheet.create({
  topPanel: {
    paddingHorizontal: ptp(SPACE_X),
    width: '100%',
  },
  indicator: {
    width: '100%',
    marginTop: ptp(24),
    backgroundColor: '#1A1B28',
    paddingVertical: ptp(8),
    paddingHorizontal: ptp(16),
    borderRadius: 6,
  },
  indicatorItem: {
    width: ptp(10),
    height: ptp(10),
  },
  rectangularItem: {
    width: ptp(6),
    height: ptp(4),
  },
  controlContainer: {
    flexWrap: 'wrap',
    marginTop: ptp(32),
  },
  controlBox: {
    width: '50%',
    height: ptp(158),
    borderColor: Colors.fade,
    borderWidth: 1,
  },
  batteryPercentage: {
    position: 'absolute',
    top: ptp(7),
    left: ptp(12),
  },
});
