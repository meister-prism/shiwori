// reduxの動作確認用コンポーネント
import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import {
    set_uid  , set_uname  , set_uemail  , set_upass,
    clear_uid, clear_uname, clear_uemail, clear_upass,
} from '../redux/actions/user_data';
import {store} from '../redux/store';

export class reduxChecker extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
        <Text style={{marginTop: 100}}>My name is {this.props.name}.</Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={this.props.clear_uname}
            title="deleteName"
          /> 
          <Button
            onPress={() => this.props.set_uname('hirose')}
            title="setName"
          />
        </View>
        {/* getState() : storeの情報を表示 */}
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
    clear_uid,
    clear_uname,
    clear_uemail,
    clear_upass,
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxChecker)