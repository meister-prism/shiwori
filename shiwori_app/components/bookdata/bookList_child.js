import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {gbapi_search_specific} from '../../api/googleBooks/search'
import { connect } from 'react-redux';
import {add_recentlyViewed,delete_recentlyViewed} from '../../redux/actions/search'

/**
 * 本のリスト表示の中身
 * BookList.js >> here
 * here >> screen/detailsScreen.js
 */
class BookList_Child extends React.Component{
    async _get_data_andGo(id,img){
        let res = await gbapi_search_specific(id);
        // error処理
        this.props.add_recentlyViewed(id,img);
        this.props.navigation.navigate('Details',{type:"bookmark",bookdata:res.body});
    }

    _goDetail(id,img){
        this._get_data_andGo(id,img);
    }
    render(){
        let item = this.props.item;
        let image = this.props.image;
        return  (
                <View style={styles.container}>
                <TouchableOpacity onPress={()=>this._goDetail(this.props.item.id,this.props.img_uri)}>
                    <View style={styles.container2}>
                        <View style={styles.img}>{image}</View>
                        <View style={styles.infoContainer}>
                            <View style={styles.info}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.author}>{item.authors}</Text>
                                <Text style={styles.publiserDate}>{item.publishedDate}</Text>
                                <Text style={styles.publisher}>{item.publisher}</Text>
                            </View>
                        </View>
                    </View>
                    </TouchableOpacity>
                </View>
        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    // importしたactionCreator
    add_recentlyViewed,
    delete_recentlyViewed,
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookList_Child)

const styles = StyleSheet.create({
    container: {
        paddingBottom:3,
        paddingTop:3,
        paddingHorizontal:6,
    },
    container2:{
        flexDirection:'row',
        backgroundColor: '#f0f0f0',
    },
    img:{
        backgroundColor: 'powderblue',
    },
    infoContainer:{

    },
    info:{
        flex:1,
        flexWrap:'wrap',
    },
    title:{
        fontSize:17,
        fontWeight:'bold',
    },
    author:{
        fontSize:13,
        color:'#666666',
    },
    publisher:{
    },
    publiserDate:{
    } 
  });
