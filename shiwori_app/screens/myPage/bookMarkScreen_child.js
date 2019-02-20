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
        let res = del('6ba7fead-df7e-4aa2-afd8-9c3ac3a77b1a',item.bm_id);
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
    _renderItem(item,index){
        const swipeoutButtons = [{
                                    text:'削除',
                                    backgroundColor : '#d11a2a',
                                    onPress : ()=>{this._deleteBookMark(item,index)}
                                }];
        let ret =   <Swipeout   right={swipeoutButtons} 
                                autoClose={true}>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => {this._goBookMarkDetails(item)}}>
                                <View style={styles.container2}>
                                    <View style={styles.infoContainer}>
                                        <Text numberOfLines={1}style={styles.title}>{item.book.title}</Text>
                                        <Text style={styles.page_num}>{item.page_num}</Text>
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
        paddingBottom:3,
        paddingTop:3,
        paddingHorizontal:6,
    },
    container2: {
        flexDirection:'row',
        height:50
    },
    infoContainer:{
        backgroundColor: '#f0f0f0',
        marginRight:3
    },
    title:{
        width:width/2.1,
        flex:1,
        fontSize:15,
        paddingTop:5,
        // fontWeight:'bold',
    },
    page_num:{
        flex:1,
        fontSize:18,
        paddingLeft:40,
        marginBottom:5
        // fontWeight:'bold',
    },
    button:{
        fontSize:13,
        color:'#666666',
    },
    memoContainer:{
        width:width/2.1,
        marginLeft:3,
        backgroundColor: '#f0f0f0',
    },
    memo:{
        flex:1,
        fontSize:13,
    }
  });

