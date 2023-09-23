import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ptp} from '@utils/helper';
import {SPACE_X} from '@utils/variables';
import {Box} from '@theme/grid';
import IconButton from './buttons/icon-button';
import BarIcon from '@assets/media/bars.svg';
import BarIWhitecon from '@assets/media/bar-white.svg';
import LockCircleIcon from '@assets/media/lock-circle.svg';
import LockCircleWhiteIcon from '@assets/media/lock-circle-white.svg';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@utils/@types';
import Container from './container';
import {RegularText} from '@theme/typography';
import BluetoothCircleIcon from '@assets/media/bluetooth-circle.svg';
import BluetoothCircleWhiteIcon from '@assets/media/bluetooth-circle-white.svg';
import {Colors} from '@theme/values/colors';
import {useUI} from '@contexts/ui.context';

const Header = () => {
  const navigation = useNavigation();
  const {connected} = useUI();
  return (
    <View style={styles.header}>
      <Box row centered>
        <IconButton
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          {connected ? (
            <BarIWhitecon width={ptp(24)} height={ptp(24)} />
          ) : (
            <BarIcon width={ptp(24)} height={ptp(24)} />
          )}
        </IconButton>
        <Container>
          <Box centered>
            <Box row centered>
              {connected ? (
                <BluetoothCircleWhiteIcon width={ptp(24)} height={ptp(24)} />
              ) : (
                <BluetoothCircleIcon width={ptp(24)} height={ptp(24)} />
              )}
              <RegularText size={18} style={{marginLeft: ptp(12)}}>
                Device Name
              </RegularText>
            </Box>
          </Box>
        </Container>
        <IconButton>
          {connected ? (
            <LockCircleWhiteIcon width={ptp(28)} height={ptp(28)} />
          ) : (
            <LockCircleIcon width={ptp(28)} height={ptp(28)} />
          )}
        </IconButton>
      </Box>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingVertical: ptp(24),
    paddingHorizontal: ptp(SPACE_X),
    borderColor: Colors.fade,
    borderBottomWidth: 1,
    marginBottom: ptp(24),
  },
});
