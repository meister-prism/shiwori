import React from 'react';
import { Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import BookMark_Child from './bookMarkScreen_child';
import { Provider } from 'react-redux';
import { store, persistor } from '../../redux/store';

/**
 * myPageScreen_child.js >> here
 * this.props.navigation.goBack() => MypageScreen.js
 * here >> bookmarkscreen_child.js
 */
class BookMarkScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'ブックマーク一覧',
        headerLeft: <HeaderIcon navigation={navigation} />,
        headerStyle: {
            backgroundColor: '#FAE4EB',
          }
    });
    
    render() {
        let body = this.props.navigation.getParam('res');
        return (
            <Provider store={store}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" , backgroundColor: '#f0f0f0'}}>
                    <BookMark_Child navigation={this.props.navigation} bookmarks={body}/>
                </View>
            </Provider>
        );
    }
}
export default BookMarkScreen;