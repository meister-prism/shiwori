import React from 'react';
import { StyleSheet, Text, View, TextInput,Button,KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
var Dimensions = require('Dimensions');
var { width, height, scale } = Dimensions.get('window'); //get window size
import {change} from '../../api/showori_server/bookmark'
/**
 * bookMarkChangeScreen.js >> here 
 */
class BookMarkChangeScreen_Child extends React.Component {
    state = {   Screentype: 'input', // 登録画面：input >> finish(登録完了)
                bookmark_page_num   : this.props.navigation.getParam('item').page_num,
                bookmark_body       : this.props.navigation.getParam('item').memo,
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
        // alert("hel")
        let res = await change(     this.props.user_id,
                                    this.props.navigation.getParam('item').bm_id,
                                    this.state.bookmark_body,
                                    );
        // alert(JSON.stringify(res.status));
        if(res.status==200) {
            this.setBookmark_page('');
            this.setBookmark_body('');
            this.setScreenType('finish');
        }        
    }
    
    _renderConfig(){
        switch(this.state.Screentype){
            case "input":
                return  <View>
                            <Text style={styles.booktitle}>{this.props.navigation.getParam('item').book.title}</Text>
                            <Text style={styles.bookauthor}>{this.props.navigation.getParam('item').book.authors}</Text>
                            <View style={{alignItems:"center"}}>
                                <Text>ページ数:{this.props.navigation.getParam('item').book.page}</Text>
                                <TextInput
                                    placeholder="ブックマークの内容を入力"
                                    autoCorrect={false}
                                    multiline={true}
                                    value={this.state.bookmark_body}  
                                    style={styles.inputbody}
                                    onChangeText={(text)=>this.setBookmark_body(text)}				
                                />
                                <Button title="変更"
                                        onPress={()=>{  if(this.state.bookmark_body == ''){
                                                            alert('ブックマークを入力してください。')    
                                                        }else{
                                                            this._register();
                                                        }}}/>
                            </View>
                        </View>
            case "finish":
                return <View>  
                            <Text>変更が完了しました。</Text>
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
)(BookMarkChangeScreen_Child);