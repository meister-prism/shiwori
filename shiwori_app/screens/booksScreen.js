import React from 'react';
import { Text, View, Button ,FlatList,Image} from 'react-native';
import HeaderIcon from '../components/HeaderIcon';
import BookList_key from '../components/bookdata/bookList';
import {store} from '../redux/store';
import {Provider} from 'react-redux';
class BooksScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '本棚',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });

  render() {
    let result = this.props.navigation.getParam('result');
    let type = this.props.navigation.getParam('type');
    let ResultList;
    switch(type){
      case "key":
        ResultList = <BookList_key result={result} navigation={this.props.navigation}/>
      default:
    }
    return (
      <Provider store={store}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          {ResultList}
          </View>
      </Provider>
    );
  }
}
export default BooksScreen;