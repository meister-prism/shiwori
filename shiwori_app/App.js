import Drawer from "./src/Drawer";
import { createAppContainer, createStackNavigator } from 'react-navigation';
import WelcomeScreen from './screens/welcome/welcomeScreen';

// const AppContainer = createStackNavigator({
//     Welcome: {
//       headerMode: 'none',
//       screen: WelcomeScreen,
//       navigationOptions: {
//       headerVisible: false,
//       }
//     },
//     Main: {
//       headerMode: 'none',
//       screen: Drawer,
//       navigationOptions: {
//       headerVisible: false,
//       }
//     },
//   });
  
// export default createAppContainer(AppContainer);
  
export default createAppContainer(Drawer);