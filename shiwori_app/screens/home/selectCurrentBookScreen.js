import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableHighlight, Text, View, Button, Alert } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store, persistor } from '../../redux/store';
import SelectBook_Child from './selectCurrentBookScreen_child'
class SelectCurrentBookScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: '購読する本の選択',
        headerLeft: <HeaderIcon navigation={navigation} />,
        headerStyle: {
            backgroundColor: '#FAE4EB',
        },
    });
    render() {
        return (
            <Provider store={store}>
				<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<SelectBook_Child navigation={this.props.navigation}/>
				</View>
			</Provider>
        );
    }
}