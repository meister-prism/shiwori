import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class RankingScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Ranking Screen</Text>
        <Button
          title="book1"
          onPress={() => this.props.navigation.navigate('Detail')}
        />
        <Button
          title="book2"
          onPress={() => this.props.navigation.navigate('Detail')}
        />
      </View>
    );
  }
}
export default RankingScreen;