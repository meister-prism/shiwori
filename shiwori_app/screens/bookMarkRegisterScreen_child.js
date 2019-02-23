import React from 'react';
import { StyleSheet, Text, View, TextInput,Button,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
var Dimensions = require('Dimensions');
var { width, height, scale } = Dimensions.get('window'); //get window size
import {register} from '../api/showori_server/bookmark'
/**
 * bookmarkRegisterScreen.js >> here 
 */
class BookMarkRegisterScreen_Child extends React.Component {
    state = {   Screentype: 'input', // 登録画面：input >> finish(登録完了)
                bookmark_page_num   : '',
                bookmark_body       : '',
    }
    setScreenType(type){
        this.setState({Screentype:type});
    }
    setBookmark_page(num){
        this.setState({bookmark_page_num:num});
    }
    setBookmark_body(text){
        this.setState({bookmark_body:text});
    }
    /**
     * ブックマークを登録する
     */
    async _register(){
        if(this.state.bookmark_page_num > this.props.bookdata.pageCount){
            alert("ページ数の上限を超えています。");
            this.setBookmark_page('');
        }else{
            let res = await register(   this.props.user_id,
                                        this.props.bookdata.id,
                                        this.state.bookmark_page_num,
                                        this.state.bookmark_body);
            if(res.status==200) {
                this.setBookmark_page('');
                this.setBookmark_body('');
                this.setScreenType('finish');
            }
        }

        
    }
    
    _renderConfig(){
        switch(this.state.Screentype){
            case "input":
                let pageCount = "ページ数(0~" + this.props.bookdata.pageCount +")を入力";
                return  <View >
                            <Text style={styles.booktitle}>{this.props.bookdata.title}</Text>
                            <Text style={styles.bookauthor}>{this.props.bookdata.authors}</Text>
                            <View style={{ borderWidth: 1, borderColor: '#f0f0f0', padding: 10}}>
                                <Text style={styles.input_title}>登録するページ</Text>
                                <TextInput
                                    placeholder={pageCount}
                                    autoCorrect={false}
                                    value={this.state.bookmark_page_num}  
                                    style={styles.inputpage}
                                    keyboardType='number-pad'
                                    onChangeText={(num)=>this.setBookmark_page(num)}			
                                />
                                 <Text style={styles.input_title}>メモ</Text>
                                <TextInput
                                    placeholder="メモを入力"
                                    autoCorrect={false}
                                    multiline={true}
                                    value={this.state.bookmark_body}  
                                    style={styles.inputbody}
                                    onChangeText={(text)=>this.setBookmark_body(text)}				
                                />
                                <TouchableOpacity>
                                    <View style={styles.button_container}>
                                        <Text 
                                            style={styles.button} onPress={()=>{  if(this.state.bookmark_body == '' || this.state.bookmark_page_num == ''){
                                                    alert('ページ数とブックマークを入力してください。')    
                                                }else{
                                                    this._register();
                                                }}}>
                                            登録
                                        </Text>
                                    </View>
                                </TouchableOpacity>     
                            </View>
                        </View>
            case "finish":
                return <View>  
                            <Text>登録が完了しました。</Text>
                            <Button title="さらにブックマークを追加する"
                                    onPress={()=>this.setScreenType('input')}/>
                        </View>
        }
    }
    render() {
        let Screen = this._renderConfig();
        return (
            <KeyboardAvoidingView behavior='padding'>
                <View style={styles.container}>
                    {Screen}
                </View>
            </KeyboardAvoidingView>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    booktitle: {
        padding:10,
        fontWeight: 'bold',
        fontSize: 17,
    },
    bookauthor: {
        padding:10,
        fontSize: 15,
        color: '#7d7d7d'
    },
    input_container: {
        padding: 10,
    },
    input_title:{
        marginTop: 10,
        textAlign: 'left',
        color: '#7d7d7d',
        fontSize: 13,
        fontWeight: 'bold',
    },
    inputpage: {
        padding: 5,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#f0f0f0'
    },
    inputbody: {
        padding: 5,
        fontSize: 15,
        height:120,
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

const mapStateToProps = state => ({
    user_id : state.user.id,
})

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookMarkRegisterScreen_Child);