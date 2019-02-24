import React from 'react';
import { StyleSheet, Text, View, Button , TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {insert} from '../../api/showori_server/record'
var Dimensions = require('Dimensions');
var { width, height, scale } = Dimensions.get('window'); //get window size

/**
 * recordScreen.js >> here
 */
class RecordRegisterScreen_Child extends React.Component {
    state = {   Screentype: 'input', // 登録画面：input >> finish(登録完了)
                record_star   : '',
                record_body   : '',
    }
    setScreenType(type){
        this.setState({Screentype:type});
    }
    setRecord_star(num){
        this.setState({record_star:num});
    }
    setRecord_body(text){
        this.setState({record_body:text});
    }

    /**
     * 感想を登録する
     */
    async _register(){
        let readtime = null;
        let readspead = null;
        if(this.state.record_star > 5.0){
            alert('0~5の数値を入力してください')
        }else{
            let res = await insert( this.props.user_id,
                                    this.props.bookdata.id,
                                    this.props.user_name,
                                    this.state.record_star,
                                    this.state.record_body,
                                    readtime,readspead
                                    );
            alert(JSON.stringify(res));
            if(res.status==200) this.setScreenType('finish');
        }
    }
    _renderConfig(){
        switch(this.state.Screentype){
            case "input":
                return  <View>
                            <Text style={styles.booktitle}>タイトル</Text>
                            <Text style={styles.bookauthor}>著者</Text>
                            <View style={{ borderWidth: 1, borderColor: '#f0f0f0', padding: 10 }}>
                                <Text style={styles.input_title}>評価</Text>
                                <TextInput
                                    placeholder="0.0~5.0を入力"
                                    autoCorrect={false}
                                    value={this.state.record_page_num}  
                                    style={styles.inputpage}
                                    keyboardType='numeric'
                                    onChangeText={(num)=>this.setRecord_star(num)}			
                                />
                                <Text style={styles.input_title}>レビュー</Text>
                                <TextInput
                                    placeholder="感想・レビューを入力"
                                    autoCorrect={false}
                                    multiline={true}
                                    value={this.state.record_body}  
                                    style={styles.inputbody}
                                    onChangeText={(text)=>this.setRecord_body(text)}				
                                />
                                <TouchableOpacity>
                                    <View style={styles.button_container}>
                                        <Text 
                                            style={styles.button} onPress={()=>{  if(this.state.record_star != '' || this.state.record_body != ''){
                                                this._register();
                                            }else{
                                                alert('評価値と感想を入力してください。')    
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
                            <Button title = "戻る"
                                    onPress={()=>{this.props.navigation.goBack();}} />
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

const mapStateToProps = state => ({
    // jsonから取って来たデータを代入 
    user_id: state.user.id,
    user_name: state.user.name,
})

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecordRegisterScreen_Child);

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    booktitle: {
        paddingHorizontal: 10,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 17,
    },
    bookauthor: {
        paddingHorizontal: 10,
        fontSize: 15,
        color: '#7d7d7d',
        marginBottom: 20,
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