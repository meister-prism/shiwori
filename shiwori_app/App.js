import Drawer from "./src/Drawer";
import { createAppContainer, createStackNavigator } from 'react-navigation';
import WelcomeScreen from './screens/welcome/welcomeScreen';

const AppContainer = createStackNavigator({
    Welcome: {
      screen: WelcomeScreen,
    },
    Main: {
      screen: Drawer,
    },
  });
  
export default createAppContainer(AppContainer);