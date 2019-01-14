import React from 'react';
import {Linking} from 'react-native';

class ContactScreen extends React.Component {
  render() {
    return Linking.openURL('https://nittc.tokyo-ct.ac.jp/web/j/hp/index.html').catch(err => console.error('URLを開けませんでした。', err));
  }
}

export default ContactScreen;