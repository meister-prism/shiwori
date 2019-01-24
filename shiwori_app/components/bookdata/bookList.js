import React from 'react';
import { StyleSheet, Text, View, FlatList,Image } from 'react-native';
import { getBooksData } from '../../api/googleBooks/getBooksData';
import Child from './bookList_child';
/*
* 本をリスト表示する
* @prpps result : googleBooksからのres.body
*/
export default class BookList extends React.Component{
    _createkeyList(item){
        // item.title:title
        if(item == "none")return <Text>見つかりませんでした</Text>;
        let image;
        if(item.imageLink!=undefined)image = <Image source={{uri: item.imageLink}}
                                                style={{width: 100, height: 150}} />
        else image = <Image source={require('../../assets/img/noimage.png')}
                        style={{width: 100, height: 150}} />
        let ret =   <Child item={item} image = {image}/>
        return ret;
    }
    render(){
        let data=[];
        let result = this.props.result;
        if(result.totalItems==0)data.push("none");
        else{
            data=[];
            for(let i=0;i<result.items.length;i++){
                data.push(getBooksData(result,i));
            }
        }
        return  (
            <View>
                <View style={styles.flatlist}></View>
                  <FlatList
                    data={data}
                    renderItem={({item}) => this._createkeyList(item)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatlist: {
      flex:1
    }
  });