// 起動画面　（ロゴとタイトル）
import * as React from 'react';
import {View, StyleSheet, Image,} from 'react-native';

export default class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/icons/shiwori-icon.png')} />
        <Image style={styles.text} source={require('../../assets/icons/shiwori-text.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  logo: {
    height: 200,
    resizeMode : 'contain',
    marginBottom : 20,
  },
  text: {
    /*1753 x 4424 */
    height:160,
    resizeMode : 'contain',
    marginTop : 0,
    marginBottom : 30
  }
});