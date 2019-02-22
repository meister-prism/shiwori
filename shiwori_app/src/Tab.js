import React from "react";
import { Button,View, Text, DrawerNavigator,TouchableOpacity, Image } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
//initial page
import WelcomeScreen from '../screens/welcome/welcomeScreen';
import LoginScreen from '../screens/welcome/loginScreen';
import TutorialScreen from '../screens/welcome/tutorialScreen';

//home
import HomeScreen from '../screens/home/homeScreen';
import EditScreen from '../screens/home/editScreen';
import SelectCurrentBookScreen from '../screens/home/selectCurrentBookScreen';

//search
import SearchScreen from '../screens/search/searchScreen';
import CodeScanScreen from '../screens/search/codeScanScreen';
import CategoryScreen from '../screens/search/categoryScreen';
import KeywordsScreen from '../screens/search/keywordsScreen';

//mypage
import MyPageScreen from '../screens/myPage/myPageScreen';
import BookMarkScreen from '../screens/myPage/bookMarkScreen';
import RecordDetailScreen from '../screens/search/recordDetailScreen';
import RecordRegisterScreen from '../screens/search/recordRegisterScreen';

//hamburger
import HanbergerScreen from '../screens/hamburger/hamburgerScreen';
import SettingsScreen from '../screens/hamburger/settingsScreen';
import HelpScreen from '../screens/hamburger/helpScreen';
import ContactScreen from '../screens/hamburger/contactScreen';

//general screen
import BookMarkDetailsScreen from '../screens/bookMarkDetailsScreen'
import BookMarkRegisterScreen from '../screens/bookMarkRegisterScreen'
import BookMarkChangeScreen from '../screens/myPage/bookMarkChangeScreen'
import RankingScreen from '../screens/rankingScreen'
import BooksScreen from '../screens/booksScreen'
import DetailsScreen from '../screens/detailsScreen'


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Edit: EditScreen,
  SelectCurrentBook : SelectCurrentBookScreen,
  Detail: DetailsScreen,
  Welcome: WelcomeScreen,
  Tutorial: TutorialScreen,
  Login: LoginScreen,
  Settings: SettingsScreen,
  Help: HelpScreen,
  Contact: ContactScreen,
});

const SearchStack = createStackNavigator({
  // Search: SearchScreen,
  Keyword: KeywordsScreen,
  // Category: CategoryScreen,
  // CodeScan: CodeScanScreen,
  Ranking: RankingScreen,
  Details: DetailsScreen,
  Books: BooksScreen,
  BookMarkDetails: BookMarkDetailsScreen,
  BookMarkRegister : BookMarkRegisterScreen,
  RecordDetail: RecordDetailScreen,
  RecordRegister : RecordRegisterScreen,
  Settings: SettingsScreen,
  Help: HelpScreen,
  Contact: ContactScreen,
});

const SubMenuesStack = createStackNavigator({
  Settings: SettingsScreen,
  Help: HelpScreen,
  Contact: ContactScreen,
});

const MyPageStack = createStackNavigator({
  MyPage: MyPageScreen,
  BookMark: BookMarkScreen,
  Books: BooksScreen,
  Details: DetailsScreen,
  BookMarkDetails: BookMarkDetailsScreen,
  BookMarkRegister:BookMarkRegisterScreen,
  BookMarkChange : BookMarkChangeScreen,
  Settings: SettingsScreen,
  Help: HelpScreen,
  Contact: ContactScreen,
})

const HamburgerStack = createStackNavigator({
  Hanberger: HanbergerScreen,
  Settings: SettingsScreen,
  Help: HelpScreen,
  Contact: ContactScreen,
})

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
    MyPage: MyPageStack,
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: '#000000',
      activeBackgroundColor: '#F8BCCF',
      inactiveTintColor: '#4D4D4D',
      inactiveBackgroundColor: '#FAE4EB',
    }
  }
  
);

export default TabNavigator