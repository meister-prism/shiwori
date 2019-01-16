import * as React from 'react';
import { View, StyleSheet, Button,Text} from 'react-native';
import LogoTitle from './logotitle';
import { connect } from 'react-redux';
import {store} from '../../redux/store';
class Startup extends React.Component {
  render() {
    const _getNextpage = () => {
      if(this.props.guest){
        return <Button
                  title="ゲストとしてログイン"
                  onPress={() => this.props.navigation.navigate('Login',{type:"guest"})}
                />
      }else{
        if(this.props.uid == ""){
          return <Button
                    title="ようこそ"
                    onPress={() => this.props.navigation.navigate('Login',{type:"null"})}
                  />
        }else{
          let name = this.props.uname;
            return <Button
                    title={"こんにちは"+name+"さん"}
                    onPress={() => this.props.navigation.navigate('Login',{type:"registered"})}
                  />
          }
      }
    }
    
    return (
        <View style={styles.container}>
            <LogoTitle />
            {_getNextpage()}        
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

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Startup)