import {StyleSheet, Text, View, type ViewProps} from 'react-native';
import React, {type FC} from 'react';

interface ContainerProps extends ViewProps {}

const Container: FC<ContainerProps> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
