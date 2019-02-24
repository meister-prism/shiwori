import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity,
    Image, Modal, Button, FlatList, ScrollView
} from 'react-native';
var Dimensions = require('Dimensions');
var { width, height, scale } = Dimensions.get('window'); //get window size
import { connect } from 'react-redux';
import { get } from '../../api/showori_server/book'
import { gbapi_search, INITIAL_CONFIG } from '../../api/googleBooks/search';
import { add_nowBook } from '../../redux/actions/book_data'
/**
 * 本の詳細表示
 * screen/detailsScreen.js >> here
 * here >> BooksScreen.js (著者絞込検索 type:author)
 * here >> BookMarkRegisterScreen.js (ブックマーク登録画面)
 * here >> RecordRegisterSceen (感想登録画面)
 * here >> RecordDetailScreen (感想の詳細画面)
 */
class BookDetail extends React.Component {
    state = {
        modalVisible_discription: false,
        modalVisible_img: false,
        records_data: null,
        fetchfinish: false,
        reviewbook_id: this.props.google_data.id
    }
    setModalVisible_discription(visible) {
        this.setState({ modalVisible_discription: visible });
    }
    setModalVisible_img(visible) {
        this.setState({ modalVisible_img: visible });
    }
    /**
     * 著者絞り込み検索をして本棚ページに遷移させます。
     */
    async _authorSearch(authors) {
        let config = Object.assign({}, INITIAL_CONFIG);
        config.maxResults = 40;
        config.inauthor = true; // 著者絞り込み検索
        let res = await gbapi_search(authors, config);
        // error処理はここ
        this.props.navigation.navigate('Books', { result: res.body, type: "author", title: authors + 'の検索結果' });
    }

    /**
     * bookMark登録画面に遷移する
     */
    _goBookMarkRegisterScreen() {
        this.props.navigation.navigate('BookMarkRegister', { bookdata: this.props.google_data });
    }
    /**
     * 感想登録画面へ遷移する
     */
    _goRecordRegisterScreen() {
        this.props.navigation.navigate('RecordRegister', { bookdata: this.props.google_data });
    }
    /**
     * 感想詳細表示画面へ遷移する
     */
    _goRecordScreen(item) {
        this.props.navigation.navigate('RecordDetail', { bookdata: this.state.records_data.book, record: item });
    }
    
    /**
     * 今読んでいる本のリストに追加する
     */
    _addNowReadingBook(imgLink){
        // this.props.add_nowBook(id,title,author,0,imgLink);
        this.props.add_nowBook( this.props.google_data.id,
                                this.props.google_data.title,
                                prism,
                                imgLink
                                );
        alert('登録されました')
    }
    async _getRecords() {
        let res = await get(this.state.reviewbook_id);
        // alert(JSON.stringify(res))
        if (res.status == 200) {
            this.setState({ records_data: res.body, fetchfinish: true });

        }
    }
    _createRecordList(item) {
        return <View style={styles.recordlistContainer}>
            {/* <TouchableOpacity onPress={() => { this._goRecordScreen(item) }}> */}
                <View styles={styles.recordlistContainer2}>
                    {/* <View styles={{flexDirection:'row',height:100}}> */}
                    <View style={styles.record_infoContainer}>
                        <Text numberOfLines={1} style={styles.record_username}>{item.user_name ? item.user_name : '名無し'}さん</Text>
                        <Text numberOfLines={1} style={styles.record_star}>評価：{item.star}</Text>
                        <Text numberOfLines={1} style={styles.record_update}>{item.update_date}</Text>
                    </View>
                    <View style={styles.record_bodyContainer}>
                        <Text numberOfLines={5} style={styles.record_body}>{item.impression}</Text>
                    </View>
                </View>
            {/* </TouchableOpacity> */}
        </View>
    }
    componentDidMount() {
        this._getRecords();
    }
    render() {
        let data = this.props.google_data; //data:(obj)
        let image, modal_image;
        let imgLink = "none";
        if (data.imageLink_large != null) {
            image = <Image source={require('../../assets/img/noimage.png')} style={styles.img} />
            modal_image = <Image source={require('../../assets/img/noimage.png')} style={styles.modalimg} />
            imgLink = data.imageLink_large;
        } else if (data.imageLink_medium != null) {
            image = <Image source={require('../../assets/img/noimage.png')} style={styles.img} />
            modal_image = <Image source={require('../../assets/img/noimage.png')} style={styles.modalimg} />
            imgLink = data.imageLink_medium;
        } else if (data.imageLink_thumbnail != null) {
            image = <Image source={require('../../assets/img/noimage.png')} style={styles.img} />
            modal_image = <Image source={require('../../assets/img/noimage.png')} style={styles.modalimg} />
            imgLink = data.imageLink_thumbnail;
        } else if (data.imageLink_smallThumbnail != null) {
            image = <Image source={require('../../assets/img/noimage.png')} style={styles.img} />
            modal_image = <Image source={require('../../assets/img/noimage.png')} style={styles.modalimg} />
            imgLink = data.imageLink_smallThumbnail;
        } else {
            image = <Image source={require('../../assets/img/noimage.png')} style={styles.img} />
            modal_image = <Image source={require('../../assets/img/noimage.png')} style={styles.modalimg} />
        }
        // 初期状態の設定
        let ave, recordlist;
        if (this.state.records_data == null) {
            ave = '読み込み中';
            if (this.state.fetchfinish) recordlist = <Text>読み込み中</Text>
            else recordlist = <Text style={{backgroundColor:'#f0f0f0'}} >読み込み中</Text>
        } else {
            if (this.state.records_data.records == "") {
                ave = '情報なし';
                recordlist =    <View style={{backgroundColor:'#f0f0f0'}} >
                                    <View style={{flex:1,alignItems:'center',justifyContent:'center',height:100,backgroundColor:'#dfdfdf'}}>
                                        <Text style={styles.record_is_not_found}>情報なし</Text>
                                    </View>
                                </View>
            } else {
                ave = this.state.records_data.star_average;
                recordlist = <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <FlatList
                        key={this.state.records_data.records.record_id}
                        // extraData={this.props.google_data}
                        data={this.state.records_data.records}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => this._createRecordList(item)}
                    />
                </View>
            }
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.InfoContainer}>
                        <TouchableOpacity onPress={() => { this.setModalVisible_img(true); }}>
                            <View style={styles.imgContainer}>{image}</View>
                        </TouchableOpacity>
                        <View style={styles.info}>
                            <Text style={styles.title}>タイトル</Text>
                            <Text style={styles.star_average}>平均評価 : {ave}</Text>
                            <TouchableOpacity onPress={() => { this._authorSearch(data.authors) }}>
                                <Text style={styles.author}>高専太郎 >> </Text>
                            </TouchableOpacity>
                            <Text style={styles.info_txt}>{data.publishedDate}</Text>
                            <Text style={styles.info_txt}>東京高専</Text>
                        </View>
                    </View>
                    
                    <View　style={{flex: 1, flexDirection: 'row'}} >
                        <TouchableOpacity style={{width: '31%', margin: 2 }} onPress={() => this._goBookMarkRegisterScreen()}>
                            <View style={ styles.record_button }>
                                <Text style={styles.record_txt}>ブックマーク{"\n"}を登録</Text>
                                <Image source={require('../../assets/icons/bookmark-icon.png')} style={styles.icon}  />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: '31%', margin: 2 }} onPress={() => this._addNowReadingBook(imgLink)}>
                            <View style={ styles.record_button}>
                                <Text style={styles.record_txt}>読んでいる本{"\n"}に登録</Text>
                                <Image source={require('../../assets/icons/pin-icon.png')} style={styles.icon}  />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: '31%', margin: 2 }} onPress={() => this._goRecordRegisterScreen()}>
                            <View style={ styles.record_button}>
                                <Text style= { styles.record_txt }>感想を書く{"\n"} </Text>
                                <Image source={require('../../assets/icons/pen-icon.png')} style={styles.icon}  />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* description */}
                    <View style={styles.detailsContainer}>
                        <TouchableOpacity onPress={() => { this.setModalVisible_discription(true); }}>
                            <Text numberOfLines={5} style={styles.bookdetail_txt}>{data.description}</Text>
                        </TouchableOpacity>
                        {/* 最近読んだ本 */}
                        {/* <View style={{height:150}}>
                            <RecentlyViewedList navigation={this.props.navigation}/>
                        </View> */}
                    </View>

                    {/* user review */}
                    <View style={{ backgroundColor: '#f0f0f0' }}>
                        <Text style={styles.record}>レビュー</Text>
                        {recordlist}
                    </View>
                    
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
                                    onPress={() => { this.setModalVisible_discription(!this.state.modalVisible_discription); }}>
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
                                    onPress={() => { this.setModalVisible_img(!this.state.modalVisible_img); }}>
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
    add_nowBook,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookDetail);

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#FFFF',
        flex: 1,
        width: width,
        height: height
    },
    InfoContainer: {
        flexDirection: 'row',
    },
    imgContainer: {
        padding: 5,
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    img: {
        width: 150,
        height: 250,
        resizeMode: 'contain',
    },
    info: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 30,
        flexWrap: 'wrap',
    },
    title: {
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    author: {
        fontSize: 13,
        paddingBottom: 2,
        color: '#666666',
    },
    star_average: {
        color: '#3C914A',
        paddingBottom: 5,
    },
    info_txt: {
        color: '#666666',
        paddingBottom: 2,
    },
    detailsContainer: {
        backgroundColor: '#FFFF',
        padding: 10,
        // height: 310,
    },
    bookdetail: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
    },
    bookdetail_txt: {
        height: 90,
        padding: 10,
    },
    record_button: {
        alignItems: 'center',
        backgroundColor: '#67C175' ,
        margin: 5,
        width: '100%',
        height: 90,
    },
    record_txt: {
        fontSize: 12,
        textAlign: 'center',
        color: '#FFFF',
        padding: 10,
    },
    record_is_not_found: {
        width: width/1.1, 
        fontSize: 15, 
        textAlign:'center',
    },
    record: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
    },
    recordlistContainer: {
        flex: 1,
        paddingBottom: 3,
        backgroundColor: '#FFFF',
        paddingTop: 3,
        paddingHorizontal: 6,
    },
    recordlistContainer2: {
        flex: 1,
    },
    record_infoContainer: {
        width: width / 1.1,
        flexDirection: 'row',
        backgroundColor: '#FFFF',
        padding: 2,
    },
    record_username: {
        flex: 2,
        fontSize: 15,
        // paddingTop:5,
    },
    record_star: {
        flex: 1,
        fontSize: 15,
        // paddingTop:5,
    },
    record_update: {
        flex: 2,
        fontSize: 15,
        // paddingTop:5,
    },
    record_bodyContainer: {
        width: width / 1.1,
        backgroundColor: '#FFFF',
    },
    record_body: {
        flex: 1,
        fontSize: 13,
    },
    modalScreen: {
        flex: 1,
        padding: 20,
        backgroundColor: '#dfdfdf',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#dfdfdf'
    },
    modalImgContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#dfdfdf'
    },
    modalimg: {
        width: 300,
        height: 500,
        resizeMode: 'contain',
    },
    hidebutton_txt: {
        fontSize: 15,
        textAlign: 'right',
    }
});