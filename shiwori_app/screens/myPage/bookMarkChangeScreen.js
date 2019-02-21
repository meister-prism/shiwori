import React from 'react';
import { Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import BookMarkChange_Child from './bookMarkChangeScreen_child';
import { Provider } from 'react-redux';
import { store, persistor } from '../../redux/store';

/**
 * bookMarkScreen_child >> here
 * here >> bookmarkCangescreen_child.js
 */
class BookMarkChangeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'ブックマークの変更',
        headerLeft: <HeaderIcon navigation={navigation} />,
    });
    
    render() {
        let body = this.props.navigation.getParam('res');
        return (
            <Provider store={store}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <BookMarkChange_Child navigation={this.props.navigation} bookmarks={body}/>
                </View>
            </Provider>
        );
    }
}
export default  BookMarkChangeScreen;