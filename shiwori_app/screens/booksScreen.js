import React from 'react';
import { Text, View, Button } from 'react-native';
import HeaderIcon from '../components/HeaderIcon';
import GbAPIChecker from '../components/debug/gbapi_test';

class BooksScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '本棚',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GbAPIChecker />
        <Text>Books Screen</Text>
        <Button
          title="book1"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="book2"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}
export default BooksScreen;