import React from 'react';
import { StyleSheet, Text, View, Button ,TextInput,KeyboardAvoidingView} from 'react-native';
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
                            <Text style={styles.booktitle}>{this.props.bookdata.title}</Text>
                            <Text style={styles.bookauthor}>{this.props.bookdata.authors}</Text>
                            <View style={{ alignItems:"center" }}>
                                <TextInput
                                    placeholder="評価値を入力(0.0~5.0)"
                                    autoCorrect={false}
                                    value={this.state.record_page_num}  
                                    style={styles.inputpage}
                                    keyboardType='numeric'
                                    onChangeText={(num)=>this.setRecord_star(num)}			
                                />
                                <TextInput
                                    placeholder="感想・レビューを入力"
                                    autoCorrect={false}
                                    multiline={true}
                                    value={this.state.record_body}  
                                    style={styles.inputbody}
                                    onChangeText={(text)=>this.setRecord_body(text)}				
                                />
                                <Button title="登録"
                                         onPress={()=>{  if(this.state.record_star != '' || this.state.record_body != ''){
                                                            this._register();
                                                        }else{
                                                            alert('評価値と感想を入力してください。')    
                                                        }}}/>
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
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center",
        width: '100%',
    },
    booktitle: {
        padding:10,
        fontWeight: 'bold',
        fontSize: 17,
    },
    bookauthor: {
        padding:10,
        fontSize: 13,
    },
    input_container: {
        padding: 10,
    },
    input_title:{
        textAlign: 'left', 
        width: '100%',
        fontSize: 15,
        fontWeight: 'bold',
    },
    inputpage: {
        padding: 5,
        fontSize: 18,
        width: '90%',
        borderWidth: 1,
        borderColor: '#f0f0f0'
    },
    inputbody: {
        padding: 5,
        fontSize: 18,
        lineHeight: 23,
        height:120,
        width: '90%',
        borderWidth: 1,
        borderColor: '#f0f0f0'
      },
    button_container: {
        padding: 10,
        width: '100%',
    },
    button: {
        padding: 10,
        width: '100%',
        textAlign: 'center',
        color: "#fff",
        backgroundColor: '#67C175'
    },
});