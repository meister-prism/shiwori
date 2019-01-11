// reduxの動作確認用コンポーネント
import React, {Component} from 'react';
import { View, Text, Button} from 'react-native';
import { connect } from 'react-redux';
import {add_nowBook,delete_nowBook,set_nowBook,start_nowBook,stop_nowBook,clear_nowBook}from '../../redux/actions/book_data' 
import {
  set_udata,clear_udata,
} from '../../redux/actions/user_data';
import {store,persistor} from '../../redux/store';

export class reduxChecker extends Component {
  render() {
    let reading_id ='';
    if(this.props.now_reading_data!=undefined){
      reading_id = this.props.now_reading_id;
    }
    return (
      <View style={{flex: 1}}>
        <Text>store: {JSON.stringify(store.getState())}</Text>
        <Text>reading_id: {reading_id}</Text>
        <Text>user_id: {this.props.user_id}</Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => this.props.set_udata('sho0126hiro','sho hirose','happy@gmail.com','password')}
            title="set_userdata"
          />
          <Button
            onPress={() => this.props.clear_udata()}
            title="clear_userdata"
          /> 
        </View>
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
            onPress={() => this.props.set_nowBook('ex1')}
            title="set_bookdata1"
          />
          <Button
            onPress={() => this.props.set_nowBook('ex2')}
            title="set_bookdata2"
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => this.props.clear_nowBook('ex1')}
            title="clear_bookdata1"
          />
          <Button
            onPress={() => this.props.clear_nowBook('ex2')}
            title="clear_bookdata2"
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => this.props.start_nowBook('ex1',300)}
            title="start_bookdata1"
          />
          <Button
            onPress={() => this.props.start_nowBook('ex2',300)}
            title="start_bookdata2"
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => this.props.stop_nowBook('ex1')}
            title="stop_bookdata1"
          />
          <Button
            onPress={() => this.props.stop_nowBook('ex2')}
            title="stop_bookdata2"
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
        <Button
            onPress={() => persistor.purge()}
            title="delete_all"
          />
        {/* getState() : storeの情報を表示 */}
      </View>
    )
  }
}

const mapStateToProps = state => ({
    // jsonから取って来たデータを代入 
    now_reading_data : state.bookdata.now_reading_data,
    now_reading_id : state.bookdata.now_reading_id,
    user_id : state.user.id
})

const mapDispatchToProps = {
    // importしたactionCreator
    add_nowBook,
    delete_nowBook,
    start_nowBook,
    set_nowBook,
    stop_nowBook,
    clear_nowBook,
    set_udata,
    clear_udata
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxChecker)