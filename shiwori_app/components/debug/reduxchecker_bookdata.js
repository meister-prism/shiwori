// reduxの動作確認用コンポーネント
import React, {Component} from 'react';
import { View, Text, Button,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import {add_nowBook,delete_nowBook,update_nowBook}from '../../redux/actions/book_data' 
import {store} from '../../redux/store';

export class reduxChecker extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        {/*
        <Text> id   : {this.props.now_reading[0].id}.</Text>
        <Text> id   : {this.props.now_reading[0].title}.</Text>*/}
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => this.props.add_nowBook('ex1','タイトル1','著者名1')}
            title="add_bookdata1"
          />
          <Button
            onPress={() => this.props.add_nowBook('ex2','タイトル2','著者名2')}
            title="add_bookdata2"
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => this.props.delete_nowBook('ex1')}
            title="delete_bookdata1"
          />
          <Button
            onPress={() => this.props.delete_nowBook('ex2')}
            title="delete_bookdata2"
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => this.props.update_nowBook('ex1',300)}
            title="update_bookdata1"
          />
          <Button
            onPress={() => this.props.update_nowBook('ex2',300)}
            title="update_bookdata2"
          />
        </View>
        {/* getState() : storeの情報を表示 */}
        <Text style={{marginBottom:0}}>store: {JSON.stringify(store.getState())}</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
    // jsonから取って来たデータを代入 
    now_reading : state.bookdata.now_reading
})

const mapDispatchToProps = {
    // importしたactionCreator
    add_nowBook,
    delete_nowBook,
    update_nowBook
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxChecker)