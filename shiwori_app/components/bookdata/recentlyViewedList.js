import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList ,Image,TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import { gbapi_search_specific } from '../../api/googleBooks/search';
import {add_recentlyViewed,delete_recentlyViewed} from '../../redux/actions/search'

/**
 * 1. navigationを送ってください
 * 2. <Provider>で親コンポーネントを囲ってください。
 * <RecentlyViewed navigation = {this.props.navigation} />
 */
class RecentlyViewedList extends React.Component {
    state = {
        recently_img: [],
        recently_id: [],
    };
    // 本の詳細ページへ飛ぶ
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
        image =  <Image source={{uri: item.img}} style={{width: 100, height: 150,resizeMode : 'contain'}} />
        // child
        let ret =  <View style={styles.listContainer}>
                        <TouchableHighlight
                            onPress={()=>{this._goDetail(item.id,item.img)}}>
                            {image}
                        </TouchableHighlight>
                    </View>
        return ret;
    }


    async _init() {
        let img = [], id = [];
        for (let i = 0; i < this.props.recentlyViewed.img.length; i++) {
            img.push(this.props.recentlyViewed.img[i]);
            id.push(this.props.recentlyViewed.id[i])
            // error処理はここ
        }
        await this.setState({ recently_img: img, recently_id: id });
    }
    componentDidMount() {
        this.interval = setInterval(() => {if(this.props.navigation.isFocused())this._init()}, 200);
    }
    render() {
        let data =[];
        let screen;
        if(this.state.recently_img.length==0)data.push("none");
        else{
            for(let i=0;i<this.state.recently_img.length;i++){
                data.push({img:this.state.recently_img[this.state.recently_img.length-i-1],id:this.state.recently_id[this.state.recently_img.length-i-1]});
            }
        }
        if(data.length==0 || this.state.recently_img.length==0){
            screen = <View style={{height: 150, alignItems: "center",justifyContent: "center"}}>
                        <Text>最近チェックした本はありません。</Text>
                    </View>
        }else{
            screen = <View style={{ height: 150, alignItems: "left", }}>
                        <FlatList
                            data={data}
                            extraData={data}
                            renderItem={({item}) => this._createkeyList(item)}
                            keyExtractor={(item,index)=>index.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            />
                    </View>
        }
        return (
            <View>
                {screen}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        height: 30,
        width: 350,
        borderWidth: 1,
        borderColor: '#333'
    }
});


const mapStateToProps = state => ({
    recentlyViewed: state.search.recentlyViewed // [id,id,id,...] 先頭が古く、末尾が新しい
})

const mapDispatchToProps = {
    add_recentlyViewed,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecentlyViewedList)