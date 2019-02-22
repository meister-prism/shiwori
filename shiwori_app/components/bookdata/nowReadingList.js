import React from 'react';
import { StyleSheet, Text, View, Button,TextInput,Image,FlatList,TouchableHighlight} from 'react-native';
import {gbapi_search_specific} from '../../api/googleBooks/search'
import { connect } from 'react-redux';
import {add_recentlyViewed} from '../../redux/actions/search'

/**
 * 1. navigationを送ってください
 * 2. <Provider>で親コンポーネントを囲ってください。
 * <RecentlyViewed navigation = {this.props.navigation} />
 */
class NowReadingList extends React.Component {
    async _get_data_andGo(id,img){
        let res = await gbapi_search_specific(id);
        // error処理
        this.props.add_recentlyViewed(id,img);
        this.props.navigation.navigate('Details',{type:"keyword",bookdata:res.body});
    }
    _goDetail(id,img){
        this._get_data_andGo(id,img);
    }

    _createList(item){
        if(item.img == "none")return <Text></Text>;
        let image;
        image=  <Image source={{uri: item.imgLink}} style={{width: 70, height: 100,resizeMode : 'contain'}} />
        let ret =   <View style={styles.itemContainer}>
                        <TouchableHighlight
                            onPress={()=>{this._goDetail(item.id,item.img)}}>
                            {image}
                        </TouchableHighlight>
                    </View>
        return ret;
    }
    render() {
        let now_reading = this.props.now_reading_data;
        let screen;
        if(now_reading.length==0){
            screen = <Text style={styles.nodata}>現在読んでいる本はありません</Text>
        }else{
            screen = <FlatList
                        data={now_reading}
                        renderItem={({item}) => this._createList(item)}
                        keyExtractor={(item,index)=>index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        />
        }
        return (
        <View style={{ height:130, alignItems: "center", }}>
            {screen}
        </View>
        );
    }
}

const styles = StyleSheet.create({
  itemContainer:{
  },
  nodata:{

  }
});


const mapStateToProps = state => ({
    now_reading_data : state.bookdata.now_reading_data, // [id,id,id,...] 先頭が古く、末尾が新しい
})

const mapDispatchToProps = {
    add_recentlyViewed
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NowReadingList)