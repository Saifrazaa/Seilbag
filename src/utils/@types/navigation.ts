import {DrawerScreenProps} from '@react-navigation/drawer';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type {CompositeScreenProps} from '@react-navigation/native';
export {
  type CompositeNavigationProp,
  DrawerActions,
} from '@react-navigation/native';
export type {NativeStackScreenProps} from '@react-navigation/native-stack';
export type {NativeStackNavigationProp} from '@react-navigation/native-stack';
export type {DrawerScreenProps} from '@react-navigation/drawer';
export type {DrawerNavigationProp} from '@react-navigation/drawer';

export type AppDrawerParamList = {
  home: NavigatorScreenParams<HomeStackParamList>;
};

export type HomeStackParamList = {
  control: undefined;
  devices: undefined;
  brightness: undefined;
  functions: undefined;
  'color-change': undefined;
  directions: undefined;
};

export type HomeScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    DrawerScreenProps<AppDrawerParamList>
  >;
