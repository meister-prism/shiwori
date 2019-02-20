import React from 'react';
import { StyleSheet, Text, View, TextInput,Button,KeyboardAvoidingView } from 'react-native';
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
            let res = await register(   '6ba7fead-df7e-4aa2-afd8-9c3ac3a77b1a',
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
                return  <View>
                            <Text style={styles.booktitle}>{this.props.bookdata.title}</Text>
                            <Text style={styles.bookauthor}>{this.props.bookdata.authors}</Text>
                            <View style={{alignItems:"center"}}>
                                <TextInput
                                    placeholder={pageCount}
                                    autoCorrect={false}
                                    value={this.state.bookmark_page_num}  
                                    style={styles.inputpage}
                                    keyboardType='number-pad'
                                    onChangeText={(num)=>this.setBookmark_page(num)}			
                                />
                                <TextInput
                                    placeholder="ブックマークの内容を入力"
                                    autoCorrect={false}
                                    multiline={true}
                                    value={this.state.bookmark_body}  
                                    style={styles.inputbody}
                                    onChangeText={(text)=>this.setBookmark_body(text)}				
                                />
                                <Button title="登録"
                                        onPress={()=>{  if(this.state.bookmark_body != '' || this.state.bookmark_page_num != ''){
                                                            this._register();
                                                        }else{
                                                            alert('ページ数とブックマークを入力してください。')    
                                                        }}}/>
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
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center",
    },
    inputpage: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        height: 30,
        width:width*0.9,
        borderWidth: 1,
        borderColor: '#333'
    },
    inputbody: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        height:120,
        width:width*0.9,
        borderWidth: 1,
        borderColor: '#333'
      }
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