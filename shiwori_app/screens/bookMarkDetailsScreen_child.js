import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity,Image,ScrollView } from 'react-native';
import { gbapi_search_specific } from '../api/googleBooks/search'
import { add_recentlyViewed } from '../redux/actions/search'
import { connect } from 'react-redux';
var Dimensions = require('Dimensions');
var { width, height, scale } = Dimensions.get('window'); //get window size

/**
 * bookmarkDetailsScreen >> here  
 * here >> screen/detailsScreen.js 本の詳細へ
 */
class BookMarkDitailsScreen_Child extends React.Component {
    // 本の詳細へ
    async _goBookDetail(id, img) {
        let res = await gbapi_search_specific(id);
        // error処理
        this.props.add_recentlyViewed(id, img);
        this.props.navigation.navigate('Details', { type: "bookmark", bookdata: res.body });
    }
    render() {
        let item = this.props.item;
        //** imageLink処理
        let image,image_uri;
        if(item.book.imgUrl.large != null){
            image=<Image source={{uri: item.book.imgUrl.large}} style={styles.img} />
            image_uri= item.book.imgUrl.large;
        }else if(item.book.imgUrl.medium !=null){
            image=<Image source={{uri: item.book.imgUrl.medium}} style={styles.img} />
            image_uri= item.book.imgUrl.medium;
        }else if(item.book.imgUrl.thumbnail!=null){
            image=<Image source={{uri: item.book.imgUrl.thumbnail}} style={styles.img} />
            image_uri= item.book.imgUrl.thumbnail;
        }else if(item.book.imgUrl.smallThumbnail!=null){
            image=<Image source={{uri: item.book.imgUrl.smallThumbnail}} style={styles.img} />
            image_uri= item.book.imgUrl.smallThumbnail;
        }else {
            image= <Image source={require('../assets/img/noimage.png')} style={styles.img} />
            image_uri= require('../assets/img/noimage.png');
        }
        
        return (
            <View style={styles.container}>
                <View style={styles.InfoContainer}>
                    <View style={styles.imgContainer}>
                        {image}
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.title}>{item.book.title}</Text>
                        {/* <TouchableOpacity onPress={()=>{this._authorSearch(item.book.authors)}}> */}
                        <Text style={styles.author}>{item.book.author}</Text>
                        {/* </TouchableOpacity>   */}
                        <Text style={styles.publisher}>{item.book.publication}</Text>
                        <Text style={styles.page_num}>ページ：{item.page_num}</Text>
                        <Button style={styles.goBookDetail_}
                        title='本の詳細へ'
                            onPress={() => { this._goBookDetail(item.book.book_id, image_uri) }} />
                    </View>
                </View>
                <View style={styles.memoContainer}>
                    <Text style={styles.memo}>{item.memo}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:width,
        height:height
    },
    InfoContainer: {
        flexDirection:'row',
        backgroundColor: '#f0f0f0',
    },
    imgContainer:{
        backgroundColor: 'powderblue',
        padding :5,
    },
    img:{
        width: 150, 
        height: 250,
        resizeMode : 'contain',
    },
    info:{
        flex:1,
        padding:10,
        flexWrap:'wrap',
    },
    title: {
        fontSize:18,
        fontWeight:'bold',
    },
    author:{
        fontSize:13,
        color:'#666666',
    },
    publisher:{
    },
    page_num: {
        fontSize:15,
    },
    goBookDetail_button:{
        fontSize:15,
    },
    memoContainer: {
        backgroundColor: '#f0f0f0',
        padding:10,
        flex:1, 
    },
    memo: {
        fontSize:18,
        fontWeight:'bold',
        padding:5, 
    },
    goBack_button_txt:{
        fontSize:15,
        textAlign:'right',
    },
});

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    add_recentlyViewed,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookMarkDitailsScreen_Child);