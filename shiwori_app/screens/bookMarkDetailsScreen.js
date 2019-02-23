import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import BookMarkDetails_Child from './bookMarkDetailsScreen_child';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import HeaderIcon from '../components/HeaderIcon';
/**
 * bookMarkScreen_child >> here
 * here >> bookMarkDetailsScreen_child.js
 */
class BookMarkDitailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'ブックマーク詳細',
        headerLeft: <HeaderIcon navigation={navigation} />,
        headerStyle: {
          backgroundColor: '#FAE4EB',
        }
    });
    render() {
        let item = this.props.navigation.getParam('item');
        return (
            <Provider store = {store}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <BookMarkDetails_Child navigation={this.props.navigation} item = {item}/>
                </View>
            </Provider>
        );
    }
}
export default BookMarkDitailsScreen;