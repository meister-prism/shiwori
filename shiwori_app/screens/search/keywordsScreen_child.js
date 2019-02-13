import React from 'react';
import { StyleSheet, Text, View, Button,TextInput,FlatList } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';

import { connect } from 'react-redux';
import {add_searchHistory,delete_searchHistory} from '../../redux/actions/search';

import {gbapi_search,INITIAL_CONFIG} from '../../api/googleBooks/search';

import SearchHistoryChild from '../../components/search/searchHistoryChild';

class KeywordScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'キーワード検索',
        headerLeft: <HeaderIcon navigation={navigation}/>,
    });

    state = { search_txt:null,
                searchHistoryList:this.props.searchHistory,
                searchHistoryUpdate:0}
    
    async _get_result(){
        let config = Object.assign({}, INITIAL_CONFIG);
        config.maxResults = 40;
        let res = await gbapi_search(this.state.search_txt,config);
        // error処理はここ
        this.props.add_searchHistory(this.state.search_txt);
        this.setState({ searchHistoryList:this.props.searchHistory,
                        searchHistoryUpdate:this.state.searchHistoryUpdate+1});
        this.props.navigation.navigate('Books',{result:res.body,type:"key"});
    }
    
    _goBooks(){
        this._get_result();
    }

    // 検索履歴の要素を表示
    _createkeyList(item){
        return <SearchHistoryChild item={item} _this={this} navigation={this.props.navigation}/>
    }

    // 検索履歴の削除
    async _deleteSearchHistory(){
        await this.props.delete_searchHistory();
        this.setState({ searchHistoryList:this.props.searchHistory,
                        searchHistoryUpdate:this.state.searchHistoryUpdate+1});
    }

    render() {
        return (
        <View style={{ flex:1, alignItems: "center",marginTop:10 }}>
            <TextInput
                style={styles.inputStyle}
                onChangeText={text=>{this.setState({search_txt:text})}}
                placeholder='検索キーワード...'
                autoCorrect = {false}
                onSubmitEditing={()=>{if(this.state.search_txt!=null)this._goBooks();}}
                />
            {/* search history */}
            <View style={{}}>
                <Button title='検索履歴をすべて削除' 
                        onPress={()=>{this._deleteSearchHistory()}}
                        />
            </View>
            <FlatList data={this.state.searchHistoryList.reverse()}
                    extraData={this.state.searchHistoryUpdate}
                    renderItem={({item}) => this._createkeyList(item)}
                    keyExtractor={(item,index)=>index.toString()}
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        height: 30,
        width:350,
        borderWidth: 1,
        borderColor: '#333'
    }
});


const mapStateToProps = state => ({
    searchHistory: state.search.searchHistory //検索履歴（配列の先頭が古く、末尾が新しい）
})

const mapDispatchToProps = {
    // importしたactionCreator
    add_searchHistory,
    delete_searchHistory,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KeywordScreen)