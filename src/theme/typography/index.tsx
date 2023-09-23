import {Colors} from '@theme/values/colors';
import {Fonts} from '@theme/values/fonts';
import {ptp} from '@utils/helper';
import {FC} from 'react';
import {ColorValue, Text, TextProps} from 'react-native';

interface CommonTextProps extends TextProps {
  color?: ColorValue;
  size?: number;
}

export const RegularText: FC<CommonTextProps> = ({
  children,
  color = Colors.foretext,
  size = 14,
  style,
  ...props
}) => {
  return (
    <Text
      style={[{color, fontSize: ptp(size), fontFamily: Fonts.regular}, style]}
      {...props}>
      {children}
    </Text>
  );
};
