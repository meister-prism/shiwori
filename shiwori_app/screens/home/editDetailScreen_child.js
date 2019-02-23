import React from 'react';
import { StyleSheet, Text, View, Button,Alert,Image,TouchableOpacity,TextInput,KeyboardAvoidingView} from 'react-native';
import { connect } from 'react-redux';
import {gbapi_search_specific} from '../../api/googleBooks/search';
import { getBooksData_specific } from '../../api/googleBooks/getBooksData';
import { device_update } from '../../api/showori_server/device'
var Dimensions = require('Dimensions');
var { width, height, scale } = Dimensions.get('window'); //get window size
var moment = require("moment");

/**
 * 読書記録画面の編集(詳細表示)  
 * editDetailScreen.js >> here
 * here >> editDetailScreen
 */
class EditDetailScreen_Child extends React.Component {
    state={ book_data:null, // googleBooksAPIから、単体データ取得
            fetch_finish:false,
            input_page :'',
            input_read_time : '',
            change_finish : false,
            reading_finish : false,
    }
    // shiworiserver request
    async _selectToSetServer(){
        // min * 60000 >> ms
        let readtime = 60000*this.state.input_read_time;
        let res = await device_update(  this.props.navigation.getParam('item').id,
                                        this.props.user_id,
                                        this.props.navigation.getParam('item').book_id,
                                        this.state.input_page,
                                        readtime );
        alert(res);
        if(res==200){
            this.setState({change_finish:true});
        } else{
            alert('networkError');
        }
    }
    //入力値のエラー除去
    _inputError(pageCount){
        let msg='';
        if(this.state.input_page > pageCount){
            msg+='ページ数が範囲外です\n'
        }
        if(this.state.input_page == '' || this.state.input_read_time==''){
            msg+='ページ数または時間を入力してください。'
        }
        if(msg!=''){
            alert(msg);
            return false;
        }else return true;
    }
    _changeAlert(pageCount){
        if(this._inputError(pageCount)){
            Alert.alert(
                '読書記録を編集しますか？','',
                [
                    {text:'キャンセル',style:'cancel'},
                    {text:'確定',onPress:() =>{this._selectToSetServer()}},
                ]
            )
        }
    }
    async _getBookdata(){
        id = this.props.navigation.getParam('item').book_id;
        let res = await gbapi_search_specific(id);
        if(res.status_code==200){
            this.setState({book_data:res.body})
        }else{
            alert('ネットワークエラー ['+res.status_code+']\n再読み込みをしてください。')
        }
        this.setState({fetch_finish:true});
    }

    componentDidMount(){
        this._getBookdata();
    }
	render() {
        let readingRecord = this.props.navigation.getParam('item');
        let screen;
        if(this.change_finish){
            screen = <Text>変更が完了しました</Text>
        }else{
            if(!this.state.fetch_finish){
                screen=<Text>読み込み中</Text>
            }else{
                if(this.state.book_data==null){
                    screen = <Text>読書履歴はありません</Text>
                }else{
                    // 読み込めてる
                    // 画像存在確認処理 ---
                    let image;
                    let imgLink = "none";
                    let google_data = getBooksData_specific(this.state.book_data);
                    let pageCount = google_data.pageCount;
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
                        image = <Image source={require('../../assets/img/noimage.png')} style={styles.img} />
                        modal_image = <Image source={{ uri: google_data.imageLink_large }} style={styles.modalimg} />
                    }
                    let time = moment(readingRecord.timestamp,"YYYY-MM-DD-hh-mm-ss");
                    let speed=''
                    if(readingRecord.readspead!=undefined)speed ='分速' +readingRecord.readspead+'ページ'

                    // 画像存在確認処理　---
                    // 配置は本の詳細ページ（component/book/bookdetails.js l160)に似てる
                    screen =    <View style={styles.container}>
                                    {/* 今の情報 */}
                                    <Text style={styles.bold_txt}>現在のデータ</Text>
                                    <View style={styles.container2}>
                                        <View style={styles.imgContainer}>
                                            {image}
                                        </View>
                                        <View styles={styles.info}>
                                            <Text style={styles.title}>{google_data.title}</Text>
                                            <Text style={styles.author}>{google_data.author}</Text>
                                            <Text style={styles.timestamp}>読書終了時間{'\n'}{time.format("MM/DD hh時mm分ss秒")}</Text>
                                            <Text style={styles.page}>{readingRecord.page_num} ページ読了</Text>
                                            <Text style={styles.time}>読書時間 {(readingRecord.readtime/60000).toFixed(1)} 分</Text>
                                            <Text style={styles.speed}>{speed}</Text>
                                        </View>
                                    </View>
                                    {/* 読書履歴の変更 */}
                                    
                                    <Text style={styles.bold_txt}>読書履歴の変更</Text>
                                    <View style={styles.changeContainer}>
                                        <TextInput
                                            style={styles.inputStyle}
                                            onChangeText={text=>{this.setState({input_page:text})}}
                                            placeholder={'ページ数を入力 (0~'+pageCount+')'}
                                            keyboardType='numeric'
                                            autoCorrect = {false}
                                            />
                                        <TextInput
                                            style={styles.inputStyle}
                                            onChangeText={text=>{this.setState({input_read_time:text})}}
                                            placeholder='読んだ時間を入力（単位は分です）'
                                            keyboardType='numeric'
                                            autoCorrect = {false}
                                            />
                                        <View style={styles.button_container}>
                                            <Text style={styles.button} onPress={()=>{this._changeAlert(pageCount)}} >変更する</Text>
                                        </View>
                                    </View>
                                </View>
                }
            }
        }
		return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {screen}
			</View>
            
		);
	}
}

const mapStateToProps = state => ({
    // jsonから取って来たデータを代入 
    user_id : state.user.id,
})

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditDetailScreen_Child);

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#FFFF',
        flex: 1,
        width: width,
        height: height
    },
    bold_txt:{
        fontSize:18,
        padding :5,
        marginLeft : 10,
        fontWeight:'bold'
    },
    container2:{
        flexDirection: 'row',
    },
    imgContainer: {
        padding: 5,
    },
    img: {
        width: 150,
        height: 200,
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
    timestamp:{
        color: '#3C914A',
        paddingBottom: 5,
    },
    page:{
        fontSize: 15,
    },
    time:{
        fontSize: 15,
    },
    speed:{
        fontSize: 15,
    },
    changeContainer:{
        padding: 10,
    },
    inputStyle:{
        padding: 5,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#f0f0f0'
    },
    button_container: {
        padding: 10,
    },
    button: {
        padding: 10,
        width: '100%',
        textAlign: 'center',
        color: "#fff",
        backgroundColor: '#67C175'
    },
  });