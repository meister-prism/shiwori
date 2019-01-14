import Tab from './Tab';
import { createDrawerNavigator } from 'react-navigation';
import ContactScreen from '../screens/hamburger/contactScreen';
import HelpScreen from '../screens/hamburger/helpScreen';
import SettingsScreen from '../screens/hamburger/settingsScreen';
import WelcomeScreen from '../screens/welcome/welcomeScreen';
import LoginScreen from '../screens/welcome/loginScreen';

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
      screen: LoginScreen,
      navigationOptions: {
          drawerLabel: "Login"
      }
  },
  Logout: {
      screen: WelcomeScreen,
      navigationOptions: {
          drawerLabel: "Logout"
      }
  }
},{
    drawerWidth: 200
});