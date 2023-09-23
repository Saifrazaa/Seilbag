import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import React, {FC} from 'react';

interface IconButtonProps extends TouchableOpacityProps {}

const IconButton: FC<IconButtonProps> = ({children, ...props}) => {
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
};

export default IconButton;
