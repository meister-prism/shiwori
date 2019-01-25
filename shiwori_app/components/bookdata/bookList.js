import React from 'react';
import { StyleSheet, Text, View, FlatList,Image,Button } from 'react-native';
import { getBooksData } from '../../api/googleBooks/getBooksData';
import Child from './bookList_child';
/*
* 本をリスト表示する
* @prpps result : googleBooksからのres.body
*/
export default class BookList extends React.Component{
    _createkeyList(item,navigation){
        // item.title:title
        if(item == "none")return <Text>見つかりませんでした</Text>;
        let image;
        if(item.imageLink_large != null){
            image=<Image source={{uri: item.imageLink_large}} style={{width: 100, height: 150,resizeMode : 'contain'}} />
        }else if(item.imageLink_medium !=null){
            image=<Image source={{uri: item.imageLink_medium}} style={{width: 100, height: 150,resizeMode : 'contain'}} />
        }else if(item.imageLink_thumbnail!=null){
            image=<Image source={{uri: item.imageLink_thumbnail}} style={{width: 100, height: 150,resizeMode : 'contain'}} />
        }else if(item.imageLink_smallThumbnail!=null){
            image=<Image source={{uri: item.imageLink_smallThumbnail}} style={{width: 100, height: 150,resizeMode : 'contain'}} />
        }else {
            image= <Image source={require('../../assets/img/noimage.png')} style={{width: 100, height: 150,resizeMode : 'contain'}} />
        }
        let ret =   <Child item={item} image = {image} navigation={navigation}/>
        return ret;
    }
    render(){
        let navigation = this.props.navigation;
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
                    renderItem={({item}) => this._createkeyList(item,navigation)}
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