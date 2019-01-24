import React from 'react';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';

class searchBox extends React.Component {
  render() {
    let _style = this.props.TextInput_style;
    let _autoCorrect = this.props.TextInput_autoCorrect;
    let _onChangeText = this.props.TextInput_onChangeText;
    let _placeholder =this.props.TextInput_placeholder;
    let _buttonOnpress = this.props.Button_Onpress;
    let _buttontitle = this.props.Button_title;
    return (
      <View style={{ flex: 1,flexDirection:"row", alignItems: "center", justifyContent: "center" }}>
        <TextInput
          style={_style}
          autoCorrect = {_autoCorrect}
          onChangeText={_onChangeText}
          placeholder={_placeholder} />
        <Button
          title={_buttontitle}
          onPress={_buttonOnpress}
        />
      </View>
    );
  }
}
export default searchBox;