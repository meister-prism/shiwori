import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class BookMarkDitailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>BookMarkDitailsScreen</Text>
        <Button
          title="登録or更新"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}
export default BookMarkDitailsScreen;