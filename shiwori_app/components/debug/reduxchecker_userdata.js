// reduxの動作確認用コンポーネント
import React, {Component} from 'react';
import { View, Text, Button,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import {
    set_uid  , set_uname  , set_uemail  , set_upass, set_udata,
    clear_uid, clear_uname, clear_uemail, clear_upass, clear_udata,
} from '../../redux/actions/user_data';
import {add_searchHistory,delete_searchHistory}from  '../../redux/actions/search';
import {state_clear} from '../../redux/actions/root'
import {store} from '../../redux/store';

/**
 * Redux動作確認用
 * <Provider>で囲ってください。
 */
export class reduxChecker extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
          <Button
            onPress={() => this.props.state_clear()}
            title="reduxStoreを初期化（debug用）"
          /> 
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
    add_searchHistory,delete_searchHistory,
    state_clear,
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxChecker)