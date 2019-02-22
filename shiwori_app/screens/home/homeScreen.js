import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableHighlight, Text, View, Button, Alert } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store, persistor } from '../../redux/store';
import Home_Child from './homeScreen_child';

class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
        headerLeft: <HeaderIcon navigation={navigation} />,
        headerStyle: {
          backgroundColor: '#FAE4EB',
        }
    });
    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Home_Child navigation={this.props.navigation}/>
                </View>
            </Provider>
        );
    }
}

export default HomeScreen;
