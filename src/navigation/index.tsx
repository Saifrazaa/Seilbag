import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppDrawerParamList, HomeStackParamList} from '@utils/@types';
import Control from '@screens/control';
import Devices from '@screens/devices';
import Brightness from '@screens/brightness';
import ColorChange from '@screens/color-change';
import Functions from '@screens/functions';

const AppDrawer = createDrawerNavigator<AppDrawerParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeScreens = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="control"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="control" component={Control} />
      <HomeStack.Group
        screenOptions={{presentation: 'containedTransparentModal'}}>
        <HomeStack.Screen name="devices" component={Devices} />
        <HomeStack.Screen name="color-change" component={ColorChange} />
        <HomeStack.Screen name="functions" component={Functions} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

const DrawerScreens = () => {
  return (
    <AppDrawer.Navigator screenOptions={{headerShown: false}}>
      <AppDrawer.Screen name="home" component={HomeScreens} />
    </AppDrawer.Navigator>
  );
};

export default function Router() {
  return <DrawerScreens />;
}
