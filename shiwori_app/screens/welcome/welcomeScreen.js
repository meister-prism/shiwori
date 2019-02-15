import React from 'react';
import {View,Text} from 'react-native';
import Startup from '../../components/welcome/startup';
import {Provider} from 'react-redux';
import {store} from '../../redux/store'; 

class WelcomeScreen extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Startup navigation={this.props.navigation} state={this.state}/>
        </View>
      </Provider>
    );
  }
}

export default WelcomeScreen;