import React from 'react';
import { Text, View, Button ,FlatList,Image} from 'react-native';
import HeaderIcon from '../components/HeaderIcon';
import BookList_key from '../components/bookdata/bookList';
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
        ResultList = <BookList_key result={result}/>
      default:
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Books Screen</Text>
        {ResultList}
        <Button
          title="book1"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="book2"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}
export default BooksScreen;