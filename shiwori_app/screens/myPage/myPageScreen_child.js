import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { get } from '../../api/showori_server/bookmark'
/**
 * MypageScreen >> here
 * here => bookMarkScreen.js
 * this.props.navigation.navigate('BookMark') >> ブックマーク一覧画面 bookMarkScreen.js
 */
class MyPageScreen_Child extends React.Component {

     /**
     * BookmarkScreenに行く際に入る
     * serverデータ受信後
     */
    async _goBookmarkScreen() {
        let res = await get('6ba7fead-df7e-4aa2-afd8-9c3ac3a77b1a'); // bookmark_get
        //** ここでerorr処理 */
        // alert(res);
        if(res.status == 100) alert('[Err stat:100]　もう一度ボタンを押してください')
        if(res.status == 200) this.props.navigation.navigate('BookMark',{res:res.body}); // >> ブックマーク一覧画面
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Profile Screen</Text>
                <Button
                    title="your book marks"
                    onPress={() => {this._goBookmarkScreen()}}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    // jsonから取って来たデータを代入 
    user_id : state.user.id
})

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPageScreen_Child);