import React from 'react';
import { StyleSheet, Text, View, Button,Alert,TextInput,FlatList,TouchableOpacity } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
// import SHA256 from 'crypto-js/sha256';
import { connect } from 'react-redux';
import {add_searchHistory,delete_searchHistory} from '../../redux/actions/search';

import {gbapi_search,INITIAL_CONFIG} from '../../api/googleBooks/search';

import SearchHistoryChild from '../../components/search/searchHistoryChild';

class KeywordScreenChild extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'キーワード検索',
        headerLeft: <HeaderIcon navigation={navigation}/>,
        headerStyle: {
            backgroundColor: '#FAE4EB',
        },
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
        this.props.navigation.navigate('Books',{result:res.body,type:"key",title : this.state.search_txt+'の検索結果'});
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

    _deleteAlert(){
        Alert.alert(
            '検索履歴を削除しますか？',
            '削除すると元に戻せません',
            [
                {text:'キャンセル',style:'cancel'},
                {text:'削除する',onPress:() =>{this._deleteSearchHistory()}},
            ]
        )
    }

    render() {
        return (
        <View style={styles.search_box}>
            <TextInput
                style={styles.inputStyle}
                onChangeText={text=>{this.setState({search_txt:text})}}
                placeholder='キーワードを入力...'
                autoCorrect = {false}
                onSubmitEditing={()=>{if(this.state.search_txt!=null)this._goBooks();}}
                // onSubmitEditing={()=>{alert(SHA256(this.state.search_txt).toString())}}
                />
            {/* search history */}
            <FlatList style={styles.history_list_box}
                    data={this.state.searchHistoryList.reverse()}
                    extraData={this.state.searchHistoryUpdate}
                    renderItem={({item}) => this._createkeyList(item)}
                    keyExtractor={(item,index)=>index.toString()}
            />
            <TouchableOpacity　style={styles.button_box} onPress={()=>{this._deleteAlert()}} >
                <View style={ styles.button }>
                    <Text style={styles.button_txt}>検索履歴を削除する</Text>
                </View>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    search_box:{
        flex:1,
        alignItems: "center",
        margin: 0,
        width: '100%'
    },
    history_list_box:{
        backgroundColor: '#fff',
        textAlign: 'left',
        width: '100%',
        marginTop: 2,  
    },
    button_box: {
        alignItems: 'center',
        width : '100%'
    },
    inputStyle: {
        backgroundColor: '#FFF',
        color: '#000',
        fontWeight: 'bold',
        padding: 10,
        fontSize: 20,
        width: '100%',
    },
    button: {
        backgroundColor: '#67C175' ,
        width: '90%',
        borderRadius: 10,
        marginBottom: 10,
    },
    button_txt: {
        fontSize: 12,
        textAlign: 'center',
        color: '#FFF',
        padding: 10,
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
)(KeywordScreenChild)