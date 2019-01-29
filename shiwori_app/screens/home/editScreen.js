import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import ChangeColorButton from '../../components/changeColorButton';
class EditScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '読書記録の編集',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Edit Screen</Text>
        {/* changeColorButtonのデバッグ用 */}
        <ChangeColorButton 
        title='おされてない'
        pushed_title='おされた'
        color='#f00'
        pushed_color='#0f0'
        />
      </View>
    );
  }
}

export default EditScreen;