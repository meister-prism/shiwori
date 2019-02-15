import * as React from 'react';
import {  StyleSheet,Modal,  TouchableHighlight,Text, View, Button, Alert } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store,persistor } from '../../redux/store';
import ReduxChecker from '../../components/debug/reduxchecker_bookdata';
import RecentlyViewedList from '../../components/bookdata/recentlyViewedList'
import ProgressCircle from '../../components/charts/progressCircle'
import BarChart from '../../components/charts/barChart';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <Provider  store={store}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="読書記録の編集"
          onPress={() => this.props.navigation.navigate('Edit')}
        /> 
        <BarChart/>
        {/* 最近読んだ本 */}        
        {/* <RecentlyViewedList type='Home' navigation={this.props.navigation}/> */}
        </View>
        {/* <ReduxChecker /> */}
      </Provider>
    );
  }
}

export default HomeScreen;
