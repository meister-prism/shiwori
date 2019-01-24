import React from 'react';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import {gbapi_search,INITIAL_CONFIG} from '../../api/googleBooks/search';
import SearchBox from '../../components/searchBox';
class KeywordScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'キーワード検索',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });

  state = {search_txt:null}
  
  async _get_result(){
    let config = Object.assign({}, INITIAL_CONFIG);
    config.maxResults = 40;
    let res = await gbapi_search(this.state.search_txt,config);
    this.props.navigation.navigate('Books',{result:res.body,type:"key"});
  }
  
  _goBooks(){
    this._get_result();
  }

  render() {
    return (
      <View style={{ flex:1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Keyword Screen</Text>
        <SearchBox 
          TextInput_style={styles.inputStyle}
          TextInput_onChangeText={text=>{this.setState({search_txt:text})}}
          TextInput_placeholder='検索キーワード...'
          TextInput_autoCorrect = {false}
          Button_Onpress = {() => {
            if(this.state.search_txt!=null)this._goBooks();
          }}
          Button_title="seach"
          />
      </View>
    );
  }
}
export default KeywordScreen;

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    height: 30,
    width:200,
    borderWidth: 1,
    borderColor: '#333'
  }
});