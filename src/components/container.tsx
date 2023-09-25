import {StyleSheet, Text, View, type ViewProps} from 'react-native';
import React, {type FC} from 'react';

interface ContainerProps extends ViewProps {}

const Container: FC<ContainerProps> = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
