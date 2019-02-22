import React from 'react';
import { StyleSheet, Text, View, Button,Image,FlatList,TouchableHighlight} from 'react-native';
import {gbapi_search_specific} from '../../api/googleBooks/search'
import { connect } from 'react-redux';
import {add_recentlyViewed} from '../../redux/actions/search'
import { get } from '../../api/showori_server/statistics';

/**
 * 1. navigationを送ってください
 * 2. <Provider>で親コンポーネントを囲ってください。
 * <FinishedReadingList navigation = {this.props.navigation} />
 */
class FinishedReadingList extends React.Component {
    state={ readingList:null,
            request_finish : false} // res.body.record
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
        //* imageLink処理
        let image = <Text></Text>;
        let image_uri= require('../../assets/img/noimage.png');
        if(item.book!=null){
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
                image = <Text></Text>;
                image_uri= require('../../assets/img/noimage.png');
            }

        }
       
        // alert(image_uri);
        let ret =   <View style={styles.itemContainer}>
                        <TouchableHighlight
                            onPress={()=>{this._goDetail(item.book.book_id,image_uri)}}>
                            {image}
                        </TouchableHighlight>
                    </View>
        return ret;
	}
	async _getFinished(){
        let res = await get(this.props.user_id);
        // alert(JSON.stringify(res.body.records));
        if(res.status==200){
            this.setState({ readingList:res.body.records });
        }
        this.setState({request_finish:true})
	}
	componentDidMount(){
		this._getFinished();
	}
    render() {
        let screen;
        if(!this.state.request_finish){
            screen = <Text>読み込んでいます。</Text>
        }else{
            if(this.state.readingList==null){
                screen = <Text>読み終わった本はありません。</Text> 
            }else{
                for(let i;i<this.state.readingList.length;i++){
                    if(this.state.readingList[i].book.item.imgUrl==null){
                        alert("oioi");
                    }
                }
                screen = <FlatList
                            data={this.state.readingList}
                            renderItem={({item}) => this._createList(item)}
                            keyExtractor={({item}, index) => index.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            />
            }
        }
        return (
        <View style={{ height:150, alignItems: "center", }}>
            {screen}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    img:{
        width: 100, 
        height: 150,
        resizeMode : 'contain',
    },
});


const mapStateToProps = state => ({
    user_id : state.user.id
})

const mapDispatchToProps = {
    add_recentlyViewed
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishedReadingList)