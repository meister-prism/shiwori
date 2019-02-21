import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store, persistor } from '../../redux/store';
import Mypage_Child from './myPageScreen_child';
var Dimensions = require('Dimensions');
var { width, height, scale } = Dimensions.get('window'); //get window size
/**
 * tabNavigation => MypageScreen(here)
 * here => myPageScreen_child.js
 */
class MyPageScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'マイページ',
        headerLeft: <HeaderIcon navigation={navigation} />,
    });

    render() {
        return (
            <Provider store={store}>
                <View style={{ width:width,alignItems: "center", justifyContent: "center" }}>
                    <Mypage_Child navigation={this.props.navigation} />
                </View>
            </Provider>
        );
    }
}
export default MyPageScreen;