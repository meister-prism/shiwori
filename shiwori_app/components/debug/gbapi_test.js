// googleBooksApi_test
// reduxの動作確認用コンポーネント
import React, {Component} from 'react';
import { View, Text, Button} from 'react-native';
import {gbapi_search} from '../../api/googleBooks/search';

// googleBooksAPI check
export default class gbAPIChecker extends Component {
  state={data:null,data2:null,data3:null};

  async gbapiget(){
    let res = await gbapi_search("ひらがなはいけるかな？");
    this.setState({data:res.status_code});
    this.setState({data2:JSON.stringify(res.body)});
    this.setState({data3:JSON.stringify(res.body.items[0].volumeInfo.title)});
  }

  componentWillMount(){
    this.gbapiget();
  }
  render() {
    return (
      <View style={{flex: 1}}>
      <Text>「ひらがなはいけるかな？」検索結果（上位1件）</Text>
      <Text>status:{this.state.data}</Text>
      <Text>title:{this.state.data3}</Text>
      <Text>body:{this.state.data2}</Text>
      </View>
    )
  }
}