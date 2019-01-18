import * as React from 'react';
import { View, StyleSheet, Alert,Text} from 'react-native';
import { connect } from 'react-redux';
import { guest_clear,set_uid } from '../../redux/actions/user_data';
import { state_clear } from '../../redux/actions/root';
import { signin } from '../../api/showori_server/userdata';

class Login_registered extends React.Component {
  async _Certify(){
    let  res = await signin(this.props.uemail,this.props.upass);
    if(res.status!=200){
      Alert.alert(
        'error '+res.status,
        res.json.message+'\n 再度ログインしてください。',
        [{text: 'OK', onPress: () => {
            this.props.state_clear();
            this.props.navigation.navigate('Welcome');
        }}]
      )
    }
  }
  _goHome(){
    this._Certify();
    this.props.navigation.navigate('Home');
  }
  render() {
    return (
        <View style={styles.container}>
            {this._goHome()}
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
});

const mapStateToProps = state => ({
  uemail : state.user.email,
  upass : state.user.pass,
})

const mapDispatchToProps = {
  guest_clear,
  set_uid,
  state_clear
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login_registered)