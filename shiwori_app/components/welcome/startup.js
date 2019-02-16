import * as React from 'react';
import { View, StyleSheet, Button,Text,Modal,  TouchableHighlight,Alert} from 'react-native';
import LogoTitle from './logotitle';
import { connect } from 'react-redux';
import BleExample from "../../components/BleExample";
import {store} from '../../redux/store';
class Startup extends React.Component {
  state = {
    modalVisible: true,
  };
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    const _getNextpage = () => {
      if(this.props.guest){
        return <TouchableHighlight>
                <Button
                  title='ゲストとしてログイン' 
                  onPress={() => {
                    //this.props.navigation.navigate('Login',{type:"guest"})
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                </Button>
              </TouchableHighlight>
      }else{
        if(this.props.uid == ""){
          return <TouchableHighlight>
                    <Button
                      title='ようこそ' 
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                    </Button>
                  </TouchableHighlight>
                  // <Button
                  //   title="ようこそ"
                  //   onPress={() => this.props.navigation.navigate('Login',{type:"null"})}
                  // />
        }else{
          let name = this.props.uname;
            return <TouchableHighlight>
                      <Button
                        title={"こんにちは"+name+"さん"}
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}>
                      </Button>
                    </TouchableHighlight>
                  // <Button
                  //   title={"こんにちは"+name+"さん"}
                  //   onPress={() => this.props.navigation.navigate('Login',{type:"registered"})}
                  // />
          }
      }
    }
    
    return (
        <View style={styles.container}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{marginTop: 22}}>
                <View>
                  <LogoTitle />
                  {_getNextpage()} 
                  <BleExample/>
                </View>
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