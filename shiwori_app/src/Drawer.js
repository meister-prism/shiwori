import Tab from './Tab';
import { createDrawerNavigator } from 'react-navigation';
import ContactScreen from '../screens/hamburger/contactScreen';
import HelpScreen from '../screens/hamburger/helpScreen';
import SettingsScreen from '../screens/hamburger/settingsScreen';


export default createDrawerNavigator({
  Home: {
      screen: Tab,
      navigationOptions: {
          drawerLabel: "Home"
        }
  },
  Settings: {
      screen: SettingsScreen,
      navigationOptions: {
          drawerLabel: "Settings"
      }
  },
  Help: {
      screen: HelpScreen,
      navigationOptions: {
          drawerLabel: "Help"
      }
  },
  Contact: {
      screen: ContactScreen,
      navigationOptions: {
          drawerLabel: "Contact"
      }
  },
  Review: {
      screen: ContactScreen,
      navigationOptions: {
          drawerLabel: "Review"
      }
  },
  Login: {
      screen: ContactScreen,
      navigationOptions: {
          drawerLabel: "Login"
      }
  }
},{
    drawerWidth: 200
});