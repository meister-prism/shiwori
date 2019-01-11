// reduxの動作確認用コンポーネント
import React, {Component} from 'react';
import { View, Text, Button,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import {
    set_uid  , set_uname  , set_uemail  , set_upass, set_udata,
    clear_uid, clear_uname, clear_uemail, clear_upass, clear_udata,
} from '../../redux/actions/user_data';
import {store} from '../../redux/store';

export class reduxChecker extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{marginBottom: 100}}>store: {JSON.stringify(store.getState())}</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
    // jsonから取って来たデータを代入 
    id : state.user.id,
    name: state.user.name,
    email : state.user.email,
    pass : state.user.pass,
})

const mapDispatchToProps = {
    // importしたactionCreator
    set_uid,
    set_uname,
    set_uemail,
    set_upass,
    set_udata,
    clear_uid,
    clear_uname,
    clear_uemail,
    clear_upass,
    clear_udata,
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxChecker)