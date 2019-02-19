import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,
    Image,Modal ,Button,FlatList,ScrollView} from 'react-native';
var Dimensions = require('Dimensions');
var { width, height, scale } = Dimensions.get('window'); //get window size
import { connect } from 'react-redux';
import RecentlyViewedList from './recentlyViewedList'
import {get} from '../../api/showori_server/book'
import {gbapi_search,INITIAL_CONFIG} from '../../api/googleBooks/search';
import recordRegisterScreen_child from '../../screens/search/recordRegisterScreen_child';

/**
 * 本の詳細表示
 * screen/detailsScreen.js >> here
 * here >> BooksScreen.js (著者絞込検索 type:author)
 * here >> BookMarkRegisterScreen.js (ブックマーク登録画面)
 * here >> RecordRegisterSceen (感想登録画面)
 * here >> RecordDetailScreen (感想の詳細画面)
 */
class BookDetail extends React.Component{
    state = {   modalVisible_discription:false,
                modalVisible_img:false,
                records_data:null,
                fetchfinish : false,
            }
    setModalVisible_discription(visible) {
        this.setState({modalVisible_discription: visible});
    }
    setModalVisible_img(visible) {
        this.setState({modalVisible_img: visible});
    }
    /**
     * 著者絞り込み検索をして本棚ページに遷移させます。
     */
    async _authorSearch(authors){
        let config = Object.assign({}, INITIAL_CONFIG);
        config.maxResults = 40;
        config.inauthor=true; // 著者絞り込み検索
        let res = await gbapi_search(authors,config);
        // error処理はここ
        this.props.navigation.navigate('Books',{result:res.body,type:"author",title:authors+'の検索結果'});
    }

    /**
     * bookMark登録画面に遷移する
     */
    _goBookMarkRegisterScreen(){
        this.props.navigation.navigate('BookMarkRegister',{bookdata:this.props.google_data});
    }
    /**
     * 感想登録画面へ遷移する
     */
    _goRecordRegisterScreen(){
        this.props.navigation.navigate('RecordRegister',{bookdata:this.props.google_data});
    }
    /**
     * 感想詳細表示画面へ遷移する
     */
    _goRecordScreen(item){
        this.props.navigation.navigate('RecordDetail',{bookdata:this.state.records_data.book,record:item});
    }
    async _getRecords(){
        let res = await get(this.props.google_data.id);
        // alert(JSON.stringify(res))
        if(res.status==200){
            this.setState({records_data:res.body,fetchfinish:true});
        }
    }
    _createRecordList(item){
        return  <View style={styles.recordlistContainer}>
                    <TouchableOpacity onPress={() => {this._goRecordScreen(item)}}>
                        <View styles={styles.recordlistContainer2}>
                        {/* <View styles={{flexDirection:'row',height:100}}> */}
                            <View style={styles.record_infoContainer}>
                                <Text numberOfLines={1} style={styles.record_username}>ユーザー名：{item.user_name}</Text>
                                <Text numberOfLines={1} style={styles.record_star}>評価：{item.star}</Text>
                                <Text numberOfLines={1} style={styles.record_update}>更新日：{item.update_date}</Text>
                            </View>

                            <View style={styles.record_bodyContainer}>
                                <Text numberOfLines={5} style={styles.record_body}>{item.impression}</Text>
                            </View>
                        </View>
                        
                    </TouchableOpacity>
                </View>
    }
    componentDidMount(){
        this._getRecords();
    }
    render(){
        let data = this.props.google_data; //data:(obj)
        let image,modal_image;
        if(data.imageLink_large != null){
            image=<Image source={{uri: data.imageLink_large}} style={styles.img} />
            modal_image=<Image source={{uri: data.imageLink_large}} style={styles.modalimg} />
        }else if(data.imageLink_medium !=null){
            image=<Image source={{uri: data.imageLink_medium}} style={styles.img} />
            modal_image=<Image source={{uri: data.imageLink_medium}} style={styles.modalimg} />
        }else if(data.imageLink_thumbnail!=null){
            image=<Image source={{uri: data.imageLink_thumbnail}} style={styles.img} />
            modal_image=<Image source={{uri: data.imageLink_thumbnail}} style={styles.modalimg} />
        }else if(data.imageLink_smallThumbnail!=null){
            image=<Image source={{uri: data.imageLink_smallThumbnail}} style={styles.img} />
            modal_image=<Image source={{uri: data.imageLink_smallThumbnail}} style={styles.modalimg} />
        }else {
            image= <Image source={require('../../assets/img/noimage.png')} style={styles.img} />
            modal_image=<Image source={{uri: data.imageLink_large}} style={styles.modalimg} />
        }
        // 初期状態の設定
        let ave,recordlist;
        if(this.state.records_data==null){
            ave = '情報なし';
            if(this.state.fetchfinish) recordlist = <Text>まだレビューはありません</Text>
            else recordlist = <Text>読み込み中</Text>
        }else{
            ave = this.state.records_data.star_average;
            recordlist =    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <FlatList
                                    key={this.state.records_data.records.record_id}
                                    data={this.state.records_data.records}
                                    extraData={this.state.records_data.records}
                                    keyExtractor={(item,index)=>index.toString()}
                                    renderItem={({item}) => this._createRecordList(item)}
                                    />
                            </View>
        }                              
        return  (
                <View style={styles.container}>
                    <ScrollView>
                    <View style={styles.InfoContainer}>
                        <TouchableOpacity onPress={() => {this.setModalVisible_img(true);}}>
                            <View style={styles.imgContainer}>{image}</View>
                        </TouchableOpacity>
                            <View style={styles.info}>
                                <Text style={styles.title}>{data.title}</Text>
                                <TouchableOpacity onPress={()=>{this._authorSearch(data.authors)}}>
                                    <Text style={styles.author}>{data.authors} >> </Text>
                                </TouchableOpacity>                                
                                <Text style={styles.publiserDate}>{data.publishedDate}</Text>
                                <Text style={styles.publisher}>{data.publisher}</Text>
                                <Button title="ブックマークを登録" 
                                        onPress = {()=>this._goBookMarkRegisterScreen()}/>
                                <Text style={styles.star_average}>平均評価値 : {ave}</Text>
                            </View>
                    </View>
                    {/* description */}
                    <View style={styles.detailsContainer}>
                        <Text style={styles.bookdetail}>本の詳細</Text>
                        <TouchableOpacity　onPress={() => {this.setModalVisible_discription(true);}}>
                            <Text numberOfLines={5} style={styles.bookdetail_txt}>{data.description}</Text>
                        </TouchableOpacity>
                         {/* 最近読んだ本 */}
                        <View style={{height:150}}>
                            <RecentlyViewedList navigation={this.props.navigation}/>
                        </View>
                    </View>
                   
                    {/* user review */}
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.record}>レビュー</Text>
                        <Button style={{textAlign:'right'}}
                                title="感想を登録" 
                                onPress = {()=>this._goRecordRegisterScreen()}/>
                    </View>
                    {recordlist}
                    {/* Modal */}
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.modalVisible_discription}>
                        {/* description */}
                        <View style={styles.modalScreen}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.bookdetail}>本の詳細（全文）</Text>
                            <Text style={styles.bookdetail_txt}>{data.description}</Text>
                            <TouchableOpacity 
                                onPress={() => {this.setModalVisible_discription(!this.state.modalVisible_discription);}}>
                                <Text style={styles.hidebutton_txt}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.modalVisible_img}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalImgContainer}>
                                    {modal_image}
                                    <TouchableOpacity 
                                        onPress={() => {this.setModalVisible_img(!this.state.modalVisible_img);}}>
                                        <Text style={styles.hidebutton_txt}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    </Modal>
                    </ScrollView>
                </View>
        );
    }
}

const mapStateToProps = state => ({
    // jsonから取って来たデータを代入 
})

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookDetail);

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:width,
        height:height
    },
    InfoContainer:{
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
    title:{
        fontSize:18,
        fontWeight:'bold',
    },
    author:{
        fontSize:13,
        color:'#666666',
    },
    publisher:{
    },
    publiserDate:{
    },
    detailsContainer:{
        backgroundColor: '#f0f0f0',
        padding:10,
        height: 310,
    },
    bookdetail:{
        fontSize:18,
        fontWeight:'bold',
        padding:5, 
    },
    bookdetail_txt:{
    },
    record:{
        fontSize:18,
        fontWeight:'bold',
        padding:5, 
    },
    recordlistContainer:{
        paddingBottom:3,
        paddingTop:3,
        paddingHorizontal:6,
    },
    recordlistContainer2:{
        flex:1,
        width:width/1.1
    },
    record_infoContainer:{
        flexDirection:'row',
        backgroundColor: '#dfdfdf',
        padding:2,
    },
    record_username:{
        flex:2,
        fontSize:15,
        // paddingTop:5,
    },
    record_star:{
        flex:1,
        fontSize:15,
        // paddingTop:5,
    },
    record_update:{
        flex:2,
        fontSize:15,
        // paddingTop:5,
    },
    record_bodyContainer:{
        backgroundColor: '#dfdfdf',
    },
    record_body:{
        flex:1,
        fontSize:13,
    },
    modalScreen:{
        flex:1,
        padding:20,
        backgroundColor: '#dfdfdf',
    },
    modalContainer:{
        flex:1,
        justifyContent:'center',
        padding:20,
        backgroundColor:'#dfdfdf'
    },
    modalImgContainer:{
        flex:1,
        justifyContent:'center',
        padding:20,
        backgroundColor:'#dfdfdf'
    },
    modalimg:{
        width: 300, 
        height: 500,
        resizeMode : 'contain',
    },
    hidebutton_txt:{
        fontSize:15,
        textAlign:'right',
    }
  });