import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../components/HeaderIcon';

class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '本の詳細',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Book Details Screen</Text>
        <Button
          title="ブックマークを登録"
          onPress={() => this.props.navigation.navigate('BookMarkDetails')}
        />
        <Button
          title="ブックマーク一覧"
          onPress={() => this.props.navigation.navigate('BookMark')}
        />
      </View>
    );
  }
}

export default DetailsScreen;