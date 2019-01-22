import React from 'react';
import { Text, View, Button ,FlatList} from 'react-native';
import HeaderIcon from '../components/HeaderIcon';
import GbAPIChecker from '../components/debug/gbapi_test';

class BooksScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '本棚',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });

  _keyResult(result){
    let titles=[];
    for(let i=0;i<result.items.length;i++){
      titles.push({title:result.items[i].volumeInfo.title});
    }
    let ret = <FlatList
                data={titles}
                renderItem={({item}) => <Text>{item.title}</Text>}
              />
    return ret;
  }
  render() {
    let result = this.props.navigation.getParam('result');
    let type = this.props.navigation.getParam('type');
    let ResultList;
    switch(type){
      case "key":
        ResultList = this._keyResult(result);
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