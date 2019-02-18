import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../components/HeaderIcon';
import {getBooksData_specific} from '../api/googleBooks/getBooksData';
import BookDetail from '../components/bookdata/bookDetail';
/**
 * component/book/bookList_child >> here @type keyword
 * screen/bookMarkDetailsScreen_child >> here @type bookmark
 * here >> component/book/bookDetail.js
 * @prop type: "keyword" : 呼び出し先：keyword:キーワード検索
 * @prop type: "bookmark" : 呼び出し先 : bookmark ブックマーク詳細ページ
 * @prop bookdata : 呼び出し元でdataを取得し、this.propsに格納してください。
 */
class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '本の詳細',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  
  _renderConfig(){
    let detail = this.props.navigation.getParam('bookdata'); // res.bodyが入っている。
    // detail (res.body >> 必要情報の抽出)
    let data = getBooksData_specific(detail);
    switch(this.props.navigation.getParam('type')){
      case "keyword":
      case "bookmark":
        return <BookDetail data={data} navigation={this.props.navigation} />
      default:
    }
  }
  render() {
    let detail = this._renderConfig();
    return (
      <View style={{flex:1, alignItems: "center", justifyContent: "center" }}>
        {detail}
      </View>
    );
  }
}

export default DetailsScreen;