// 初めてログインするときに描画される
// startup.js の2番目のModal層

import * as React from 'react';
import { View, StyleSheet, Button,Text,Modal,TextInput} from 'react-native';
import { connect } from 'react-redux';
import {store} from '../../redux/store';
import SHA256 from 'crypto-js/sha256';
import {signup} from '../../api/showori_server/userdata';
import { set_uemail,set_upass,set_uid,set_uname,guest_set } from '../../redux/actions/user_data';

class Login_null extends React.Component {
  state = {
      Login_null_modalVisible_input : false,
  }
  _setModalVisible_input(visible) {
    // modalの状態を変える
	  this.setState({Login_null_modalVisible_input : visible});
  }
  _setModalVisible_guest(visible) {
    // modalの状態を変える
	  this.setState({Login_null_modalVisible_guest : visible});
  }
  
  async _goHome(){
    let res = await signup(this.props.uname,this.props.uemail,this.props.upass);
    this.props.set_uid(res.userinfo.user_id);
    this._setModalVisible_input(!this.state.Login_null_modalVisible_input);
  }


  _modal_textinput(){
	let ret = <View style={styles.container}>
				<Text>プロフィールを入力してください</Text>
				<TextInput
                    placeholder="表示名を入力してください"
                    autoCorrect={false}
                    value={this.props.name}
                    onChangeText={(name) => this.props.set_uname(name)}
                    style={styles.inputStyle}
				/>
				<TextInput
                    placeholder="メールアドレスを入力してください"
                    autoCorrect={false}
                    value={this.props.name}
                    onChangeText={(uemail) => this.props.set_uemail(uemail)}
                    style={styles.inputStyle}				
				/>
				<TextInput
				placeholder="パスワードを入力してください"
				autoCorrect={false}
        value={this.props.pass}
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
					onPress={() => this._setModalVisible_input(!this.state.Login_null_modalVisible_input)}
					/>
				</View>
	return ret;
  }

  _guest(){
        alert("guest")
		this.props.set_uname("guest");
		this.props.guest_set();
  }

  render() {
    return (
        <View style={styles.container}>
            <Text>Login_null Screen</Text>
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.Login_null_modalVisible_input}>
				    {this._modal_textinput()}
            </Modal>
            <Button
                  title="メールアドレス・パスワードを入力"
                  onPress={() => this._setModalVisible_input(!this.state.Login_null_modalVisible_input)}
            />
			<Button
                  title="ゲストとしてログイン"
                  onPress={() => this._guest()}
            />
        </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 24,
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
    borderWidth: 1,
    borderColor: '#333'
  }
});

const mapStateToProps = state => ({
  uemail:state.user.email,
  upass:state.user.pass,
  uname:state.user.name
})

const mapDispatchToProps = {
  set_uemail,
  set_upass,
  set_uid,
  set_uname,
  guest_set
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login_null)