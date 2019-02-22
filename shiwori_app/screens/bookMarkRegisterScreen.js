import React from 'react';
import { Text, View, Button } from 'react-native';
import HeaderIcon from '../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import BookMarkRegisterChild from './bookMarkRegisterScreen_child';

/**
 * componnt/bookmarkDetail.js >> here
 * here >> bookMarkRegisterScreen_child.js
 * @param 'bookdata' : googleBooksData
 */
class BookMarkRegisterScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'ブックマーク登録画面',
        headerLeft: <HeaderIcon navigation={navigation} />,
        headerStyle: {
            backgroundColor: '#FAE4EB',
          }
    });
    
    render() {
        let bookdata = this.props.navigation.getParam('bookdata');
        return (
            <Provider store={store}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <BookMarkRegisterChild bookdata={bookdata}/>
                </View>
            </Provider>
        );
    }
}
export default BookMarkRegisterScreen;