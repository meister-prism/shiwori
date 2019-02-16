import Drawer from "./src/Drawer";
import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginScreen from './screens/welcome/loginScreen';
import BleManager from 'react-native-ble-manager';



const AppContainer = createStackNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      }
    },
    Main: {
      screen: Drawer,
      navigationOptions: {
        header: null,
      }
    },
  });
 
  
export default createAppContainer(AppContainer);
  
