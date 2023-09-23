import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import Layout from '@components/layout';
import Header from '@components/header';
import {Box} from '@theme/grid';
import {ptp} from '@utils/helper';
import {SPACE_X} from '@utils/variables';
import BatteryIndicatorIcon from '@assets/media/battery-indicator.svg';
import BrightnessIcon from '@assets/media/brightness.svg';
import LampIcon from '@assets/media/lamp.svg';
import {Colors} from '@theme/values/colors';
import PowerIcon from '@assets/media/power.svg';
import TriangleIcon from '@assets/media/triangle.svg';
import SquareIcon from '@assets/media/square.svg';
import ThreeTriangleIcon from '@assets/media/three-triangle.svg';
import LeftRightIcon from '@assets/media/left-right-arrow.svg';
import {RegularText} from '@theme/typography';

const CONTROLS = [
  {
    id: 0,
    label: 'LED ON/OFF',
    icon: PowerIcon,
  },
  {
    id: 1,
    label: 'Emergency',
    icon: TriangleIcon,
  },
  {
    id: 2,
    label: 'Color Change',
    icon: SquareIcon,
  },
  {
    id: 3,
    label: 'Brightness',
    icon: LampIcon,
  },
  {
    id: 4,
    label: 'Function',
    icon: ThreeTriangleIcon,
  },
  {
    id: 5,
    label: 'Direction',
    icon: LeftRightIcon,
  },
];

const Control = () => {
  return (
    <Layout>
      <Header />
      <Box>
        <Box style={styles.topPanel}>
          <Box row centered spaced style={{width: '100%'}}>
            <BatteryIndicatorIcon
              width={ptp(255.76 * 0.4)}
              height={ptp(125.09 * 0.4)}
            />
            <BrightnessIcon
              width={ptp(71.04 * 0.4)}
              height={ptp(71.04 * 0.4)}
            />
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
                        {marginHorizontal: index % 2 !== 0 ? ptp(5) : 0},
                      ]}
                    />
                  );
                })}
              </Box>
              <Box style={[styles.rectangularItem, {marginLeft: ptp(72)}]} />
            </Box>
            <Box row spaced style={{width: '100%', paddingHorizontal: ptp(10)}}>
              {Array.from(
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                (_, index) => {
                  return <Box key={index} style={styles.indicatorItem} />;
                },
              )}
            </Box>
          </Box>
        </Box>
        <Box row style={styles.controlContainer}>
          {CONTROLS.map((control, index) => (
            <Box
              style={[
                styles.controlBox,
                {
                  borderLeftWidth: index % 2 === 0 ? 0 : 1,
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                },
              ]}>
              <TouchableOpacity style={{width: '100%', height: '100%'}}>
                <Box centered justified style={{width: '100%', height: '100%'}}>
                  <control.icon width={ptp(56)} height={ptp(56)} />
                  <RegularText size={18} style={{marginTop: ptp(16)}}>
                    {control.label}
                  </RegularText>
                </Box>
              </TouchableOpacity>
            </Box>
          ))}
        </Box>
      </Box>
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
    backgroundColor: '#313449',
  },
  rectangularItem: {
    backgroundColor: '#313449',
    width: ptp(6),
    height: ptp(4),
  },
  controlContainer: {
    flexWrap: 'wrap',
    marginTop: ptp(32),
  },
  controlBox: {
    width: '50%',
    height: ptp(200),
    borderColor: Colors.fade,
    borderWidth: 1,
  },
});
