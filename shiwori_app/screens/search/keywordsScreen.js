import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';

class KeywordScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'キーワード検索',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Keyword Screen</Text>
        <Button
          title="seach"
          onPress={() => this.props.navigation.navigate('Books')}
        />
      </View>
    );
  }
}
export default KeywordScreen;