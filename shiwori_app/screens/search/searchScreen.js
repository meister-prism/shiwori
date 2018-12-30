import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class SearchScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Screen</Text>
        <Button
          title="Search on Keywords"
          onPress={() => this.props.navigation.navigate('Keyword')}
        />
        <Button
          title="Search on Category"
          onPress={() => this.props.navigation.navigate('CodeScan')}
        />
        <Button
          title="Search on Category"
          onPress={() => this.props.navigation.navigate('Category')}
        />

        <Text>Recommended</Text>
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
export default SearchScreen;