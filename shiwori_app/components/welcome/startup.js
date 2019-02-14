import * as React from 'react';
import { View, StyleSheet, Button, Text, Modal, TextInput, Alert } from 'react-native';
import LogoTitle from './logotitle';
import { connect } from 'react-redux';
import { store } from '../../redux/store';
import SHA256 from 'crypto-js/sha256';
import { set_utype,set_uname,set_uemail,set_upass,set_uid ,clear_udata} from '../../redux/actions/user_data';
import {signup} from '../../api/showori_server/userdata';
class Startup extends React.Component {
    state = {
        modal_login: true, // 2枚目のmodal >> login screen
        modal_welcome:true, // 1番上のmodal >> welcome
        modal_input:false, // 2枚目の上 loginscreen -> inputBox
    };
    setModalVisible_welcome(visible) {
        this.setState({ modal_welcome: visible });
    }
    setModalVisible_login(visible) {
        this.setState({ modal_login: visible });
    }
    setModalVisible_input(visible) {
        this.setState({ modal_input: visible });
    }
    // 全て「ようこそ」ボタンクリック時（現時点）
    // 初めて起動したときに入る
    _firstLogin() {
        this.setModalVisible_welcome(false);
    }
    // ゲストログイン
    _guestLogin() {
        this.props.navigation.navigate('Home');
    }
    // ユーザー登録済みログイン
    _userLogin() {
        // this.setModalVisible_welcome(!this.state.modal_welcome);
        // this.setModalVisible_login(!this.state.modal_login);
        this.props.navigation.navigate('Home');

    }

    /*welcomeScreenの描画 */
    _welcome = () => {
        // alert(this.props.utype)
        switch (this.props.utype) {
            case "none":
                
                return  <Button
                            title='ようこそ'
                            onPress={() => {
                                this._firstLogin();
                            }}>
                        </Button>
                
            case "register":
                return  <Button
                            title={"こんにちは" + name + "さん"}
                            onPress={() => {
                                this._userLogin();
                            }}>
                        </Button>
            case "guest":
                return  <Button
                                title='ゲストとしてログイン'
                                onPress={() => {
                                    this._guestLogin();
                                }}>
                        </Button>

        }
    }
    // ログイン方法入力以下の層
    _guest(){
		this.props.set_uname("guest");
        this.props.set_utype("guest");
        this.props.navigation.navigate('Home');
        this.setModalVisible_login(false);
        this.setModalVisible_welcome(true);
        this.setModalVisible_input(false);
        
    }
    // InputScreen
    _input(){
        let ret = <View style={styles.container}>
                    <Text>プロフィールを入力してください</Text>
                    <TextInput
                        placeholder="表示名を入力してください"
                        autoCorrect={false}
                        value={this.props.uname}
                        onChangeText={(uname) => this.props.set_uname(uname)}
                        style={styles.inputStyle}
                    />
                    <TextInput
                        placeholder="メールアドレスを入力してください"
                        autoCorrect={false}
                        value={this.props.uemail}
                        onChangeText={(uemail) => this.props.set_uemail(uemail)}
                        style={styles.inputStyle}				
                    />
                    <TextInput
                        placeholder="パスワードを入力してください"
                        autoCorrect={false}
                        value={this.props.upass}
                        secureTextEntry={true}        
                        onChangeText={(upass) =>this.props.set_upass(SHA256(upass).toString())}
                        style={styles.inputStyle}				
                    />
                    <Button
                        title="OK"
                        style={styles.buttonStyle}
                        onPress={() => this._goHome()}
                        />
                    <Button
                        title="modoloop"
                        style={styles.buttonStyle}
                        onPress={() => this.setModalVisible_input(!this.state.modal_input)}
                        />
                    </View>
        return ret
    }

    async _goHome(){
        let res = await signup(this.props.uname,this.props.uemail,this.props.upass);
        if(res.status!=200){
            alert(res.status);
            alert(res.body);
        }
        this.props.set_uid(res.body.userinfo.user_id);
        this._setModalVisible_input(false);
        this.setModalVisible_login(false);
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{String(this.state.modal_input)}</Text>
                <Text>{String(this.state.modal_welcome)}</Text>
                <Text>{String(this.state.modal_login)}</Text>
                <Modal
                    animationType="none"
                    transparent={false}
                    visible={this.state.modal_login}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    {/* modal 1層目 新規入力など */}
                        <View style={styles.container}>
                            <Modal animationType="none"
                                    transparent={false}
                                    visible={this.state.modal_welcome}
                                    onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                    }}>
                                    {/* modal 2層目 welcome */}
                                    <View style={styles.container}>
                                        <LogoTitle />
                                        {this._welcome()}
                                    </View>
                                    
                            </Modal>
                            {/* ログイン方法の選択画面 */}
                            <View style={{}}>
                            <Button
                                title="メールアドレス・パスワードを入力"
                                onPress={() => this.setModalVisible_input(!this.state.modal_input)}
                            />
                            <Button
                                title="ゲストとしてログイン"
                                onPress={() => {this._guest()}}
                            />
                            </View>
                            <Modal animationType="none"
                                    transparent={false}
                                    visible={this.state.modal_input}
                                    onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                    }}>
                                    {/* modal 2層目 login >> input */}
                                    {this._input()}                   
                            </Modal>
                        </View>
                </Modal>
            </View>
        );
    }
    
}


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      flex:1
    },
    textStyle: {
      alignSelf: 'center',
      color: '#007aff',
      fontSize: 16,
      fontWeight: '600',
      paddingBottom: 10,
      paddingTop: 10
    },
    buttonStyle: {
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#007aff'
    },
    inputStyle: {
      color: '#000',
      paddingRight: 5,
      paddingLeft: 5,
      fontSize: 18,
      lineHeight: 23,
      height: 30,
      width:200,
      borderWidth: 1,
      borderColor: '#333'
    }
  });

const mapStateToProps = state => ({
    uid: state.user.id,
    utype: state.user.type,
})

const mapDispatchToProps = {
    set_utype,
    set_uname,
    set_uid,
    set_uemail,
    set_upass,
    clear_udata,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Startup)