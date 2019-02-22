import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {gbapi_search,INITIAL_CONFIG} from '../../api/googleBooks/search';
import {add_searchHistory,delete_searchHistory} from '../../redux/actions/search';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

class SearchHistoryChild extends React.Component {
    // text がタッチされたら
    async _onPress(item){
        let config = Object.assign({}, INITIAL_CONFIG);
        config.maxResults = 40;
        let res = await gbapi_search(item,config);
        // error処理はここ
        await this.props.add_searchHistory(item);
        this.props._this.setState({ searchHistoryList:this.props._this.props.searchHistory,
                        searchHistoryUpdate:this.props._this.state.searchHistoryUpdate+1});
        this.props.navigation.navigate('Books',{result:res.body,type:"key"});
    }

    render() {
        let item = this.props.item;
        return (
            <View style={styles.history_box}>
                <TouchableOpacity
                    onPress = {()=>{this._onPress(item)}} >
                    <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    history_box: {
      width: '100%',
      borderWidth: 0.5,
      borderBottomColor: '#7D7D7D',
    },
    text: {
      color: '#4D4D4D',
      fontSize:18,
      textAlign:'left',
      padding: 5,
      width: '100%',
    }
  });

const mapStateToProps = state => ({
    searchHistory: state.search.searchHistory //検索履歴（配列の先頭が古く、末尾が新しい）
})

const mapDispatchToProps = {
  add_searchHistory,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHistoryChild)