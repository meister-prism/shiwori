import React from 'react';
import { StyleSheet, Text, View, TextInput,Button,KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
var Dimensions = require('Dimensions');
var { width, height, scale } = Dimensions.get('window'); //get window size
import {register} from '../api/showori_server/bookmark'
/**
 * bookmarkDetailsScreen >> here 
 * here >> screen/detailsScreen.js 本の詳細へ
 * here >> goback(BookMarkScreen)
 */
class BookMarkRegisterScreen_Child extends React.Component {
    state = {   Screentype: 'input', // 登録画面：input >> finish(登録完了)
                bookmark_page_num   : '0',
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
        let res = await register(   '6ba7fead-df7e-4aa2-afd8-9c3ac3a77b1a',
                                    this.props.bookdata.id,
                                    this.state.bookmark_page_num,
                                    this.state.bookmark_body);
        if(res.status==200) this.setScreenType('finish');
    }
    
    _renderConfig(){
        switch(this.state.Screentype){
            case "input":
                return  <View>
                            <Text style={styles.booktitle}>{this.props.bookdata.title}</Text>
                            <Text style={styles.bookauthor}>{this.props.bookdata.authors}</Text>
                            <TextInput
                                placeholder="ページ数を入力"
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
                                    onPress={()=>this._register()}/>
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
        width:width*0.8,
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
        width:width*0.8,
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