import React, {Component} from 'react';
import {  StyleSheet,Modal,  TouchableHighlight,Text, View, Button, Alert } from 'react-native';
import Startup from '../../components/welcome/startup';
import {Provider} from 'react-redux';
import {store} from '../../redux/store'; 

// class WelcomeScreen extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//           <Startup navigation={this.props.navigation}/>
//         </View>
//       </Provider>
//     );
//   }

class ModalScreen extends React.Component {
  state = {
    modalVisible: true,
  };
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    return (
      <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>Hello World!</Text>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);

                  }}>
                  <Text>Hide Modal1</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
    );
  }
}

class WelcomeScreen extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ModalScreen/>
          <ModalScreen/>
          <Startup navigation={this.props.navigation} state/>
        </View>
      </Provider>
    );
  }
}

export default WelcomeScreen;