import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppDrawerParamList, HomeStackParamList} from '@utils/@types';
import Control from '@screens/control';

const AppDrawer = createDrawerNavigator<AppDrawerParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeScreens = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="control"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="control" component={Control} />
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
