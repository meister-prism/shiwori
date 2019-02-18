import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import BookMarkDetails_Child from './bookMarkDetailsScreen_child';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
/**
 * bookMarkScreen_child >> here
 * here >> bookMarkDetailsScreen_child.js
 */
class BookMarkDitailsScreen extends React.Component {
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