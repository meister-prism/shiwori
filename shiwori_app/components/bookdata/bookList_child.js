import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {gbapi_search_specific} from '../../api/googleBooks/search'
class BookList_Child extends React.Component{
    async _get_data_andGo(id){
        let res = await gbapi_search_specific(id);
        this.props.navigation.navigate('Details',{type:"keyword",bookdata:res.body});
    }

    _goDetail(id){
        this._get_data_andGo(id);
    }
    render(){
        let item = this.props.item;
        let image = this.props.image;
        return  (
                <View style={styles.container}>
                <TouchableOpacity onPress={()=>this._goDetail(this.props.item.id)}>
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

export default BookList_Child;

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