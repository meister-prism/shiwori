import React from 'react';
import { StyleSheet, Text, View, Button,Alert,Image,TouchableOpacity,TextInput} from 'react-native';
import { connect } from 'react-redux';
import {gbapi_search_specific} from '../../api/googleBooks/search';
import { getBooksData_specific } from '../../api/googleBooks/getBooksData';
import { device_update } from '../../api/showori_server/device'
var Dimensions = require('Dimensions');
var { width, height, scale } = Dimensions.get('window'); //get window size
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
        let res = await device_upate(  this.props.navigation.getParam('item').id,
                                        this.props.user_id,
                                        this.props.navigation.getParam('item').book_id,
                                        this.state.input_page,
                                        readtime );
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
                    // 画像存在確認処理　---
                    // 配置は本の詳細ページ（component/book/bookdetails.js l160)に似てる
                    screen = 	<View style={styles.container}>
                                    {/* 今の情報 */}
                                    <Text>現在のデータ</Text>
                                    <View style={styles.container2}>
                                        <View style={styles.imgContainer}>
                                            {image}
                                        </View>
                                        <View styles={styles.info}>
                                            <Text style={styles.title}>title:{google_data.title}</Text>
                                            <Text style={styles.author}>author:{google_data.author}</Text>
                                            <Text style={styles.title}>読書終了時間：{readingRecord.timestamp}</Text>
                                            <Text style={styles.title}>ページ数：{readingRecord.page_num}</Text>
                                            <Text style={styles.title}>時間：{readingRecord.readtime}</Text>
                                            <Text style={styles.title}>分速：{readingRecord.readspead}</Text>
                                        </View>
                                    </View>
                                    {/* 読書履歴の変更 */}
                                    <Text>読書履歴の変更</Text>
                                    <View styles={styles.changeContainer}>
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
                                            placeholder='読んだ時間を入力（分数を入力してください。）'
                                            keyboardType='numeric'
                                            autoCorrect = {false}
                                            />
                                        <Button title="変更"
                                                onPress={()=>{this._changeAlert(pageCount)}} />
                                    </View>
                                </View>
                }
            }
        }
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text>読書中の本の情報を編集（詳細）</Text>
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
    container2:{
        flexDirection: 'row',
    },
    imgContainer: {
        padding: 5,
    },
    img: {
        width: 150,
        height: 250,
        resizeMode: 'contain',
    },
    time:{

	},
	readtime:{

	},
	readingspeed:{

	},
	page_num:{

	}
  });