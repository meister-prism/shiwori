import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store,persistor } from '../../redux/store';
import ReduxChecker from '../../components/debug/reduxchecker_userdata';


class CategoryScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'カテゴリー検索',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <Provider store={store}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Category Screen</Text>
        <Button
          title="ct1"
          onPress={() => this.props.navigation.navigate('Books')}
        />
        <Button
          title="ct2"
          onPress={() => this.props.navigation.navigate('Books')}
        />
      </View>
      <ReduxChecker />
      </Provider>
    );
  }
}

export default CategoryScreen;