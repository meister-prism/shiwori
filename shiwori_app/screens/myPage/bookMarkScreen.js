import React from 'react';
import { Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
class BookMarkScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'ブックマーク一覧',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>BookMark Screen</Text>
        <Button
          title="bookmark1"
          onPress={() => this.props.navigation.navigate('BookMarkDetails')}
        />
        <Button
          title="bookmark1"
          onPress={() => this.props.navigation.navigate('BookMarkDetails')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
export default BookMarkScreen;