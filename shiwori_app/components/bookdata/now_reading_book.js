import React from 'react';
import { StyleSheet, Text, View, Button,Image} from 'react-native';
import {gbapi_search_specific} from '../../api/googleBooks/search'
import { connect } from 'react-redux';
import {add_recentlyViewed} from '../../redux/actions/search'
import { get } from '../../api/showori_server/statistics';
import { getBooksData_specific } from '../../api/googleBooks/getBooksData';
/**
 * 1. navigationを送ってください
 * 2. <Provider>で親コンポーネントを囲ってください。
 * here >> bookDetailsScreen.js
 */
class NowReadingBook extends React.Component {
    state={ getBookdata : null,
            nowReading_format:null,
            request_finish : false,
            change : false} 
    async _get_data_andGo(id,img){
        let res = await gbapi_search_specific(id);
        // error処理
        this.props.add_recentlyViewed(id,img);
        this.props.navigation.navigate('Details',{type:"keyword",bookdata:res.body});
    }
    _goDetail(id,img){
        this._get_data_andGo(id,img);
    }

    async _getBookdata(){
        if(this.props.now_reading_id != ''){
            let res = await gbapi_search_specific(this.props.now_reading_id);
            if(res.status_code==200){
                await this.setState({getBookdata:res.body});
            }
            this.setState({request_finish:true})
        }
    }
	componentDidMount(){
        this._getBookdata();
	}
    render() {
        console.log("rend!\n"+this.state.getBookdata);
        let screen;
        if(!this.state.request_finish){
            screen = <Text>読み込んでいます。</Text>
        }else{
            if(this.state.getBookdata==null){
                screen = <Text>現在読んでいる本に設定されている本はありません。</Text> 
            }else{
                // ここから、読みこんだときの処理
                /**
                 this.state.nowReading_formatに整形されたデータが入っている。
                 整形されたデータ形式(resultは整形前のデータ)
                    this.state.nowReading_format = {
                            id                          : result.id,
                            SelfLink                    : result.SelfLink,
                            title                       : result.volumeInfo.title,
                            subtitle                    : result.volumeInfo.subtitle,
                            authors                     : authors,
                            publisher                   : result.volumeInfo.publisher,
                            publishedDate               : result.volumeInfo.publishedDate,
                            pageCount                   : result.volumeInfo.pageCount,
                            imageLink_smallThumbnail    : imageLink_smallThumbnail,
                            imageLink_thumbnail         : imageLink_thumbnail,
                            imageLink_small             : imageLink_small,
                            imageLink_medium            : imageLink_medium,
                            imageLink_large             : imageLink_large,
                            imageLink_extraLarge        : imageLink_extraLarge,
                            description                 : description,
                        }
                 */
                // 画像の存在確認系の処理 ---
                let google_data = getBooksData_specific(this.state.getBookdata);
                let image;
                let imgLink = "none";
                if (google_data.imageLink_large != null) {
                    image = <Image source={{ uri: google_data.imageLink_large }} style={styles.img} />
                    imgLink = google_data.imageLink_large;
                } else if (google_data.imageLink_medium != null) {
                    image = <Image source={{ uri: google_data.imageLink_medium }} style={styles.img} />
                    imgLink = google_data.imageLink_medium;
                } else if (google_data.imageLink_thumbnail != null) {
                    image = <Image source={{ uri: google_data.imageLink_thumbnail }} style={styles.img} />
                    imgLink = google_data.imageLink_thumbnail;
                } else if (google_data.imageLink_smallThumbnail != null) {
                    image = <Image source={{ uri: google_data.imageLink_smallThumbnail }} style={styles.img} />
                    imgLink = google_data.imageLink_smallThumbnail;
                } else {
                    image = <Image onPress={()=>this._goDetail(google_data.id , imgLink)} source={require('../../assets/img/noimage.png')} style={styles.img} />
                    modal_image = <Image source={{ uri: google_data.imageLink_large }} style={styles.modalimg} />
                }
                // 画像の存在確認系の処理 --- 
                screen = <View style={styles.container}>
                            <View style={styles.infoContainer}>
                                <Text style={styles.title} onPress={()=>this._goDetail(google_data.id , imgLink)} >{google_data.title}</Text>
                                <Text style={styles.info_txt}>著者：{google_data.authors}</Text>
                            </View>
                            <View style={styles.imgContainer}>
                                {image}
                            </View>
                            {/* 本の詳細(description)は別途htmlタグ除去の操作が必要（description_convertっていう関数作った） */}
                        </View>
            }
        }
        return (
        <View style={{ }}>
            {screen}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#f3f3f3',
        flexDirection: 'row',
    },
    img:{
        width: 100, 
        height: 150,
        resizeMode : 'contain',
    }, 
    infoContainer:{
        width: '60%',
    },
    title: {
        paddingTop: 10,
        paddingRight: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    info_txt: {
        fontSize: 13,
        paddingRight: 10,
        fontWeight: 'bold',
        color: '#7d7d7d'
    },
    imgContainer: {
        width: '35%',
        alignItems: 'center',
    },    
});


const mapStateToProps = state => ({
    now_reading_id : state.bookdata.now_reading_id
})

const mapDispatchToProps = {
    add_recentlyViewed
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NowReadingBook) 