import React from 'react';
import { StyleSheet, Text, View, Button,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { get } from '../../api/showori_server/bookmark'
import { user_get } from '../../api/showori_server/userdata'
import RecentlyViewedList from '../../components/bookdata/recentlyViewedList'
import NowReadingList from '../../components/bookdata/nowReadingList'
import FinishedReadingList from '../../components/bookdata/finished_readingList'
var Dimensions = require('Dimensions');
var { width, height, scale } = Dimensions.get('window'); //get window size
/**
 * MypageScreen >> here
 * here => bookMarkScreen.js
 * this.props.navigation.navigate('BookMark') >> ブックマーク一覧画面 bookMarkScreen.js
 * マイページ
 * profileだけここのコンポーネントで取得し、それ以外は子コンポーネント以下でデータ取得をしています。
 */
class MyPageScreen_Child extends React.Component {

    state={
		user_get_res   :null,
		fetch_finish : true,
	}

     /**
     * BookmarkScreenに行く際に入る
     * serverデータ受信後
     */
    async _goBookmarkScreen() {
        let res = await get(this.props.user_id); // bookmark_get
        //** ここでerorr処理 */
        // alert(res);
        if(res.status == 100) alert('[Err stat:100]　もう一度ボタンを押してください')
        if(res.status == 200) this.props.navigation.navigate('BookMark',{res:res.body}); // >> ブックマーク一覧画面
    }

	async _getUserData(){
        let res = await user_get(this.props.user_id); // userdata_get
        // alert(JSON.stringify(res))
        // error処理
        if(res.status==200){
            this.setState({user_get_res:res.body})
        }
        this.setState({fetch_finish:true})
	}
	componentDidMount(){
		this._getUserData();
	}
    render() {
        let profile;
        if(!this.state.fetch_finish) profile = <Text>読み込み中</Text>
        else {
                if(this.state.user_get_res==null){
                    profile =   <View>
                                    <Text style={styles.user_name}>ユーザーデータ：読み込み中</Text>
                                </View>
                }else{
                    profile =   <View>
                                    <Text>めも：レスポンスを全部表示してるだけなので、全部使わなくていいです。styleはいろいろ未設定。</Text>
                                    <Text style={styles.user_name}>ユーザー名：{this.state.user_get_res.user_name}</Text>
                                    <Text style={styles.introduction}>自己紹介：{this.state.user_get_res.introduction}</Text>
                                    <Text style={styles.introduction}>総読書量：{this.state.user_get_res.all_readbook_count}</Text>
                                    <Text style={styles.introduction}>総読書時間：{this.state.user_get_res.all_readtime}</Text>
                                    <Text style={styles.introduction}>登録日時：{this.state.user_get_res.created_date}</Text>
                                </View>
                }
        }               
        return (
            <ScrollView>
                            <View style={{width:width, alignItems: "center", justifyContent: "center"}}>
                                <View style={styles.profile}>
                                    {profile}
                                    <Button
                                        title="ブックマークへ"
                                        onPress={() => {this._goBookmarkScreen()}}
                                        />
                                </View>
                                <View styles={styles.bookdataContainer}>
                                    {/* 今読んでいる本 */}
                                    <Text style={styles.List_title}>今読んでいる本</Text>
                                    <View style={styles.List}>
                                        <NowReadingList navigation={this.props.navigation}/>
                                    </View>
                                    {/* 読み終わった本 */}
                                    <Text style={styles.List_title}>読み終わった本</Text>
                                    <View style={styles.List}>
                                        <FinishedReadingList navigation={this.props.navigation} />
                                    </View>
                                    {/* 最近チェックした本 */}
                                    <Text style={styles.List_title}>最近チェックした本</Text>
                                    <View style={styles.List}>
                                        <RecentlyViewedList navigation={this.props.navigation}/>
                                    </View>
                                </View>
                            </View>
            </ScrollView>
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

const styles = StyleSheet.create({
    fetching:{
        
    },
    nodata:{

    },
    profile:{

    },
    user_name:{

    },
    introduction:{

    },
    bookdataContainer:{

    },
    List_title:{

    },
    List:{

    },
  });