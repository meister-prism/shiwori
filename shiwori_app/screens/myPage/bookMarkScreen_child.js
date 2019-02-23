import React from 'react';
import { StyleSheet, Text, View, Button, Alert,
        FlatList,Dimensions,TouchableOpacity } from 'react-native';
var { width, height, scale } = Dimensions.get('window'); //get window size
import HeaderIcon from '../../components/HeaderIcon';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import {del} from '../../api/showori_server/bookmark'

/**
 * bookMarkScreen.js >> here
 * here(list) => (bookmarkdetails) 
 * this.props.navigation.navigate('BookMarkDetails') ブックマーク詳細画面
 * @this.props.boookmarks // bookmarks (res.body)
 */
class BookMarkScreen_Child extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'ブックマーク一覧',
        headerLeft: <HeaderIcon navigation={navigation} />,
        headerStyle: {
            backgroundColor: '#FAE4EB',
          }
    });
    state={
        bookmarks : this.props.bookmarks,
    }
    _goBookMarkDetails(item){
        this.props.navigation.navigate('BookMarkDetails',{item:item});
    }
    
    async _refreshFlatList(){
        await this.setState({refreshFlatList: !this.state.refreshFlatList})
    }

    async _delete(item,index){
        let res = del(this.props.user_id,item.bm_id);
        // error処理
        // alert(JSON.stringify(res));
        // refresh
        let tmp = this.state.bookmarks;
        tmp.splice(index,1);
        this.setState({bookmarks:tmp});
    }
    _deleteBookMark(item,index){
        Alert.alert(
            '本当に削除しますか？',
            '削除されたブックマークは二度と見ることができなくなります。',
            [
                {text:'キャンセル',style:'cancel'},
                {text:'削除する',onPress:() =>{this._delete(item,index)}},
            ]
        )
    }
    _changeBookMark(item,index){
        this.props.navigation.navigate('BookMarkChange',{item:item,index:index,that:this});
    }
    _renderItem(item,index){
        const swipeoutButtons = [
                                    {
                                        text:'変更',
                                        backgroundColor:'#81C784',
                                        onPress : ()=>{this._changeBookMark(item,index)}
                                    },
                                    {
                                        text:'削除',
                                        backgroundColor : '#d11a2a',
                                        onPress : ()=>{this._deleteBookMark(item,index)}
                                    },
                                ];
        const swipeoutButtons2 = [{
                                    text:'変更',
                                    backgroundColor:'#81C784',
                                    onPress : ()=>{this._changeBookMark(item,index)}
                                }];
        let ret =   <Swipeout   right={swipeoutButtons} 
                                // left ={swipeoutButtons2}
                                autoClose={true}>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => {this._goBookMarkDetails(item)}}>
                                <View style={styles.container2}>
                                    <View style={styles.infoContainer}>
                                        <Text numberOfLines={1}style={styles.date}>{item.update_date}</Text>
                                        <Text numberOfLines={1}style={styles.title}>{item.book.title}</Text>
                                        <Text style={styles.page_num}>{item.page_num}ページ</Text>
                                        {/* <Text styles={styles.button}>本の詳細へ</Text> */}
                                    </View>
                                    <View style={styles.memoContainer}>
                                        <Text numberOfLines={3} style={styles.memo}>{item.memo}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Swipeout>
        return ret;
    }
    render() {
        let bookmarks = this.state.bookmarks;
        let navigation = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <FlatList   data = {bookmarks} 
                            extraData={bookmarks}
                            renderItem={({item,index})=> this._renderItem(item,index)}
                            keyExtractor={(item,index)=>index.toString()}
                           />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    // jsonから取って来たデータを代入 
    user_id : state.user.id,
})

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookMarkScreen_Child);

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        padding:5,
        margin: 5,
        backgroundColor: '#fff',
    },
    container2: {
        flexDirection:'row',
        height:80,
    },
    infoContainer:{
        width: '40%',
        padding:5,
    },
    title:{
        flex:1,
        fontSize:15,
        paddingTop:5,
        // fontWeight:'bold',
    },
    date: {
        color: '#3C914A',
        fontSize:11,
    },
    page_num:{
        fontSize:13,
        // fontWeight:'bold',
    },
    button:{
        fontSize:13,
        color:'#666666',
    },
    memoContainer:{
        width: '58%',
        padding: 5,
    },
    memo:{
        flex:1,
        fontSize:13,
    }
  });

