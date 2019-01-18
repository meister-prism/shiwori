// googleBooksApi_test
// reduxの動作確認用コンポーネント
import React, {Component} from 'react';
import { View, Text, Button} from 'react-native';
import {gbapi_search,gbapi_searchStatus} from '../../api/googleBooks/search';

// googleBooksAPI check
export default class gbAPIChecker extends Component {
  state={data:null,data2:null};
  async gbapiget(){
    let res = await gbapi_search("python入門");
    this.setState({data2:JSON.stringify(res)});
  }

  async status(){
    let status = await gbapi_searchStatus("python入門")
    this.setState({data:status});
  }

  componentWillMount(){
    this.status();
  }
  render() {
    return (
      <View style={{flex: 1}}>
      <Button
					title="キーワード検索結果（タイトル）"
					onPress={() => this.gbapiget()}
          />  
      <Text>status:{this.state.data}</Text>
      <Text>title:{this.state.data2}</Text>
      </View>
    )
  }
}