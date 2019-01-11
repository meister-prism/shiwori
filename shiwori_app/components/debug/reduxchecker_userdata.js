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
        <Text> id   : {this.props.id}.</Text>
        <Text> name : {this.props.name}.</Text>
        <Text> email: {this.props.email}.</Text>
        <Text> pass : {this.props.pass}.</Text>

        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => this.props.set_udata('sho0126hiro','sho hirose','happy@gmail.com','password')}
            title="set_userdata"
          />
          <Button
            onPress={() => this.props.set_uid('userID')}
            title="set_user_id"
          />
          <Button
            onPress={() => this.props.set_uname('userNAME')}
            title="set_user_name"
          />
        </View>
        <View style={{flexDirection: 'row'}}>
        <Button
            onPress={() => this.props.set_upass('passworld')}
            title="set_user_password"
          />
          <Button
            onPress={() => this.props.clear_uid()}
            title="clear_userID"
          /> 
        </View>
        <Button
            onPress={() => this.props.clear_uname()}
            title="clear_userNAME"
          /> 
        <Button
            onPress={() => this.props.clear_udata()}
            title="clear_userdata"
          /> 
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

/**

<Button
            onPress={() => this.props.set_udata('sho0126hiro','sho hirose','happy@gmail.com','password')}
            title="set_userdata"
          />
          <Button
            onPress={this.props.set_uid('userID')}
            title="set_user_id"
          />
          <Button
            onPress={this.props.set_uname('userNAME')}
            title="set_user_name"
          />
          <Button
            onPress={this.props.set_upass('passworld')}
            title="set_user_password"
          />
          <Button
            onPress={this.props.clear_uid()}
            title="clear_userID"
          /> 
          <Button
            onPress={this.props.clear_uname()}
            title="clear_userNAME"
          /> 
          <Button
            onPress={this.props.clear_uname()}
            title="clear_userdata"
          /> 
 */