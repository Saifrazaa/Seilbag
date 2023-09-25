import {GestureResponderEvent} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {AppDrawerParamList} from '@utils/@types';

export type ControlType = {
  id: number;
  label: string;
  icon: {
    off: React.FC<SvgProps>;
    on: React.FC<SvgProps>;
  };
  onPress?: (event: GestureResponderEvent) => void;
};

export type DrawerItemType = {
  id: number;
  name: string;
  icon: React.FC<SvgProps>;
  route: keyof AppDrawerParamList;
};
