import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';

class EditScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '読書記録の編集',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Edit Screen</Text>
      </View>
    );
  }
}

export default EditScreen;