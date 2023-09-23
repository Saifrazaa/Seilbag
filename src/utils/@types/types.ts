import {GestureResponderEvent} from 'react-native';
import {SvgProps} from 'react-native-svg';

export type ControlType = {
  id: number;
  label: string;
  icon: {
    off: React.FC<SvgProps>;
    on: React.FC<SvgProps>;
  };
  onPress?: (event: GestureResponderEvent) => void;
};
