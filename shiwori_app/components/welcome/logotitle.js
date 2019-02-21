// 起動画面　（ロゴとタイトル）
import * as React from 'react';
import {View, StyleSheet, Image,} from 'react-native';
let icon = require('../../assets/icons/shiwori-icon.png')
let text = require('../../assets/icons/shiwori-text.png')
export default class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={icon} />
        <Image style={styles.text} source={text} />
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