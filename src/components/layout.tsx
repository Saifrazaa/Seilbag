import {StyleSheet, View, type ViewProps, ScrollView} from 'react-native';
import React, {type FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '@theme/values/colors';

interface LayoutProps extends ViewProps {}

const Layout: FC<LayoutProps> = ({children}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>{children}</View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
