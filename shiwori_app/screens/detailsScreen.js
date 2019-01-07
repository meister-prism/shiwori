import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class DetailsScreen extends React.Component {
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