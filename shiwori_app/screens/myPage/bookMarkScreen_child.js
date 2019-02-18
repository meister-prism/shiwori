import React from 'react';
import { StyleSheet, Text, View, Button,FlatList,Dimensions,TouchableOpacity } from 'react-native';
var { width, height, scale } = Dimensions.get('window'); //get window size
import HeaderIcon from '../../components/HeaderIcon';

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
    _renderItem(item,navigation){
        let ret =   <View style={styles.container}>
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
        return ret;
    }
    render() {
        let bookmarks = this.state.bookmarks;
        let navigation = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {/* <Text>{JSON.stringify(bookmarks)}</Text> */}
                <FlatList   data = {bookmarks} 
                            renderItem={({item})=> this._renderItem(item,navigation)}
                            keyExtractor={(item,index)=>index.toString()} 
                            />
                            
            </View>
        );
    }
}

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
        marginRight:1
    },
    title:{
        width:width/2.0,
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
        width:width/2.2,
        marginLeft:1,
        backgroundColor: '#f0f0f0',
    },
    memo:{
        flex:1,
        fontSize:13,
    }
  });

export default BookMarkScreen_Child;