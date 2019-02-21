import * as React from 'react';
import { View, StyleSheet, Button,Text,Modal,  TouchableHighlight,Alert} from 'react-native';
import LogoTitle from './logotitle';
import { connect } from 'react-redux';
import {store} from '../../redux/store';
class Startup extends React.Component {
  state = {
    modalVisible: true,
  };
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount(){
    setTimeout(()=>{this.setModalVisible(!this.state.modalVisible)},1500);
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
          return <View　style={styles.helloContainer}>
			  		<Text style={styles.hello}>こんにちは{name}さん</Text>
				</View>
			// return <TouchableHighlight>
            //           <Button
            //             title={"こんにちは"+name+"さん"}
            //             onPress={() => {
            //               this.setModalVisible(!this.state.modalVisible);
            //             }}>
            //           </Button>
            //         </TouchableHighlight>
            //       // <Button
                  //   title={"こんにちは"+name+"さん"}
                  //   onPress={() => this.props.navigation.navigate('Login',{type:"registered"})}
                  // />
          }
      }
    }
    
    return (
        <View style={styles.container}>
            <Modal
              animationType="none"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{marginTop: 22}}>
                <View>
                <LogoTitle />
                  {_getNextpage()} 
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
  helloContainer:{
	alignItems: 'center',
    justifyContent: 'center',
  },
  hello:{
    fontSize:15,
  }
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