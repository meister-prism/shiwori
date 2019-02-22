import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store, persistor } from '../../redux/store';
import Mypage_Child from './myPageScreen_child';

/**
 * tabNavigation => MypageScreen(here)
 * here => myPageScreen_child.js
 */
class MyPageScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'マイページ',
        headerLeft: <HeaderIcon navigation={navigation} />,
        headerStyle: {
            backgroundColor: '#FAE4EB',
          }
    });

    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Mypage_Child navigation={this.props.navigation} />
                </View>
            </Provider>
        );
    }
}
export default MyPageScreen;