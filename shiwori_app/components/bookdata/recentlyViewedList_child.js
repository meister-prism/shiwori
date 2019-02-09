import React from 'react';
import { StyleSheet, Text, View,FlatList,Image,TouchableHighlight } from 'react-native';
import {gbapi_search_specific} from '../../api/googleBooks/search'
import { connect } from 'react-redux';
import {add_recentlyViewed,delete_recentlyViewed} from '../../redux/actions/search'

class RecentlyViewedChild extends React.Component{
    async _get_data_andGo(id,img){
        let res = await gbapi_search_specific(id);
        // error処理
        this.props.add_recentlyViewed(id,img);
        this.props.navigation.navigate('Details',{type:"keyword",bookdata:res.body});
    }
    _goDetail(id,img){
        this._get_data_andGo(id,img);
    }

    _createkeyList(item){
        if(item.img == "none")return <Text></Text>;
        let image;
        image=  <Image source={{uri: item.img}} style={{width: 100, height: 150,resizeMode : 'contain'}} />
        // child
        let ret =  <TouchableHighlight
                        onPress={()=>{this._goDetail(item.id,item.img)}}>
                        {image}
                    </TouchableHighlight>
        return ret;
    }

    render(){
        let img = this.props.img;
        let id = this.props.id;
        let data =[];
        // alert(result);
        if(img.length==0)data.push("none");
        else{
            for(let i=0;i<img.length;i++){
                data.push({img:img[img.length-i-1],id:id[img.length-i-1]});
            }
        }
        return  (
                <View>
                  <FlatList
                    data={data}
                    renderItem={({item}) => this._createkeyList(item)}
                    keyExtractor={(item,index)=>index.toString()}
                    horizontal={true}
                    />
                </View>
        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    add_recentlyViewed,
    delete_recentlyViewed,
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecentlyViewedChild)

const styles = StyleSheet.create({
});
