import React from 'react';
import {View,Text,Button} from 'react-native';
import {
    clear_udata
} from '../redux/actions/user_data';
import { connect } from 'react-redux';

//welcome >> logout
class Logout extends React.Component {
  logout(){
    this.props.clear_udata();
    this.props.navigation.navigate("Login");
  }
  render() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>LogoutScreen</Text>
          <Button title="ログアウト" onPress={()=>{this.logout()}}/>
        </View>
    );
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    clear_udata
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout)