import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import React, {FC} from 'react';
import {Box} from '@theme/grid';
import {RegularText} from '@theme/typography';
import {Colors} from '@theme/values/colors';
import {ptp} from '@utils/helper';

interface PrimaryButtonProps extends TouchableOpacityProps {
  outlined?: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  children,
  style,
  outlined,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.root,
        style,
        {
          backgroundColor: outlined ? Colors.transparent : Colors.secondary,
          borderWidth: outlined ? 1 : 0,
        },
      ]}
      {...props}>
      <Box centered>
        <RegularText color={outlined ? Colors.secondary : Colors.white}>
          {children}
        </RegularText>
      </Box>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
    borderColor: Colors.secondary,
    paddingVertical: ptp(8),
  },
});
