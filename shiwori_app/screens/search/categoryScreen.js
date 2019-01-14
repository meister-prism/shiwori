import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';

class CategoryScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'カテゴリー検索',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Category Screen</Text>
        <Button
          title="ct1"
          onPress={() => this.props.navigation.navigate('Books')}
        />
        <Button
          title="ct2"
          onPress={() => this.props.navigation.navigate('Books')}
        />
      </View>
    );
  }
}

export default CategoryScreen;