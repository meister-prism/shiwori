import { createAppContainer, createStackNavigator } from 'react-navigation';
import BleManagerScreen from './screens/BleManagerScreen';

const AppContainer = createStackNavigator({
    BleManager: {
      screen: BleManagerScreen,
      navigationOptions: {
        header: null,
      }
    }
  });
export default createAppContainer(AppContainer);


