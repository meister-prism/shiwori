import React from 'react';
import {View,Text,Button} from 'react-native';
import Startup from '../../components/welcome/startup';
import {Provider} from 'react-redux';
import {store} from '../../redux/store'; 
import Logout from '../../components/logout';
class WelcomeScreen extends React.Component {
  render() {
    // 起動時welcomeに入ってない
    // Hambargerからここ＝＞ログアウトからwelcome
    return (
      <Provider store={store}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Logout navigation={this.props.navigation}/>
        </View>
      </Provider>
    );
  }
}

export default WelcomeScreen;