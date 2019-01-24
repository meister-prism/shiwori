import * as React from 'react';
import { View, StyleSheet, Button,Text} from 'react-native';
import { connect } from 'react-redux';
import { set_uid,set_uname,guest_set } from '../../redux/actions/user_data';

class Login_guest extends React.Component {
  _goHome(){
    this.props.navigation.navigate('Main');
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
  uid : state.user.id,
  uname : state.user.name,
  guest : state.user.guest,
})

const mapDispatchToProps = {
  set_uid,
  set_uname,
  guest_set,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login_guest)