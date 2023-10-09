import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Container from '@components/container';
import {Box} from '@theme/grid';
import {ptp} from '@utils/helper';
import Logo from '@assets/media/logo.svg';
import InfoIcon from '@assets/media/info.svg';
import HomeIcon from '@assets/media/home.svg';
import EnvelopeIcon from '@assets/media/envelope.svg';
import GlobeIcon from '@assets/media/globe.svg';
import {RegularText} from '@theme/typography';
import {AppDrawerParamList, DrawerItemType} from '@utils/@types';
import {Colors} from '@theme/values/colors';
import IconButton from './buttons/icon-button';
import {useTranslation} from 'react-i18next';

const DRAWER_ITEMS: Array<DrawerItemType> = [
  {
    id: 0,
    name: 'SW Info',
    icon: InfoIcon,
    route: 'info',
  },
  {
    id: 1,
    name: 'Website',
    icon: HomeIcon,
    route: 'website',
  },
  {
    id: 2,
    name: 'Send e-mail',
    icon: EnvelopeIcon,
    route: 'email',
  },
  {
    id: 3,
    name: 'SMS',
    icon: GlobeIcon,
    route: 'sms',
  },
];

const routeMapper: Record<keyof AppDrawerParamList, string> = {
  info: 'Info',
  website: 'Website',
  email: 'Send e-mail',
  sms: 'SMS',
  home: 'Home',
};

const CustomDrawer: FC<DrawerContentComponentProps> = ({navigation, state}) => {
  const {t} = useTranslation();

  return (
    <Container style={styles.container}>
      <Box style={styles.drawerHeader} centered justified>
        <IconButton onPress={() => navigation.navigate('home')}>
          <Logo width={ptp(263.68 * 0.4)} height={ptp(125.93 * 0.4)} />
        </IconButton>
      </Box>
      <DrawerContentScrollView contentContainerStyle={styles.contentView}>
        {state.routes.map((route, index) => {
          if (index !== 0) {
            const {params} = route;
            const isFocused = state.index === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(route.name)}>
                <Box
                  style={[
                    styles.drawerItem,
                    {
                      backgroundColor: isFocused
                        ? 'rgba(0,0,0,0.09)'
                        : Colors.transparent,
                    },
                  ]}
                  row
                  centered>
                  <params.icon width={ptp(28)} height={ptp(28)} />
                  <Box style={{flex: 1}} centered>
                    <RegularText size={18}>
                      {t(routeMapper[route.name])}
                    </RegularText>
                  </Box>
                </Box>
              </TouchableOpacity>
            );
          }
        })}
      </DrawerContentScrollView>
    </Container>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
  },
  drawerHeader: {
    width: '100%',
    minHeight: ptp(232),
    backgroundColor: '#C0BFBE',
  },
  contentView: {
    marginTop: ptp(24),
    marginHorizontal: ptp(24),
  },
  drawerItem: {
    paddingVertical: ptp(16),
    paddingLeft: ptp(8),
    borderRadius: ptp(8),
  },
});
