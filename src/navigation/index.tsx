import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppDrawerParamList, HomeStackParamList} from '@utils/@types';
import Control from '@screens/control';
import Devices from '@screens/devices';
import Brightness from '@screens/brightness';
import ColorChange from '@screens/color-change';
import Functions from '@screens/functions';
import Directions from '@screens/directions';
import CustomDrawer from '@components/custom-drawer';
import Info from '@screens/info';
import Website from '@screens/website';
import Email from '@screens/email';
import SMS from '@screens/sms';
import InfoIcon from '@assets/media/info.svg';
import HomeIcon from '@assets/media/home.svg';
import EnvelopeIcon from '@assets/media/envelope.svg';
import GlobeIcon from '@assets/media/globe.svg';

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
        <HomeStack.Screen name="brightness" component={Brightness} />
      </HomeStack.Group>
      <HomeStack.Screen name="directions" component={Directions} />
    </HomeStack.Navigator>
  );
};

const DrawerScreens = () => {
  return (
    <AppDrawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerStyle: {
          width: '65%',
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <AppDrawer.Screen name="home" component={HomeScreens} />
      <AppDrawer.Screen
        name="info"
        component={Info}
        initialParams={{icon: InfoIcon}}
        options={{drawerLabel: 'Info'}}
      />
      <AppDrawer.Screen
        name="website"
        component={Website}
        initialParams={{icon: HomeIcon}}
      />
      <AppDrawer.Screen
        name="email"
        component={Email}
        initialParams={{icon: EnvelopeIcon}}
      />
      <AppDrawer.Screen
        name="sms"
        component={SMS}
        initialParams={{icon: GlobeIcon}}
      />
    </AppDrawer.Navigator>
  );
};

export default function Router() {
  return <DrawerScreens />;
}
