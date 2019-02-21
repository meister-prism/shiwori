import React from 'react';
import { StyleSheet, Text, View, Button,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { get } from '../../api/showori_server/bookmark'
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
        let res = await get('6ba7fead-df7e-4aa2-afd8-9c3ac3a77b1a'); // bookmark_get
        //** ここでerorr処理 */
        // alert(res);
        if(res.status == 100) alert('[Err stat:100]　もう一度ボタンを押してください')
        if(res.status == 200) this.props.navigation.navigate('BookMark',{res:res.body}); // >> ブックマーク一覧画面
    }

	_getUserData(){
        // userGet
        
        // this.setState({fetch_finish:true})
	}
	componentDidMount(){
		this._getUserData();
	}
    render() {
        let Screen;
        // 後で使いそうなので消さないでくれるとありがたい
        // if(!this.fetch_finish) Screen = <Text style={styles.fetching}>読み込み中</Text>
        // else {
        //     if(user_get_res!=null){
        //         // 色々
        //         Screen =    <ScrollView>
        //                         <View style={styles.profile}>
        //                             <Text>プロフィール</Text>
        //                             <Text style={styles.user_name}></Text>
        //                             <Text style={styles.introduction}></Text>
        //                             <Button
        //                                 title="ブックマークへ"
        //                                 onPress={() => {this._goBookmarkScreen()}}
        //                                 />
        //                         </View>
        //                         <View styles={styles.bookdataContainer}>
        //                             {/* 今読んでいる本 */}
        //                             <Text style={styles.List_title}>今読んでいる本</Text>
        //                             <View style={styles.List}>
        //                                 <NowReadingList navigation={this.props.navigation}/>
        //                             </View>
        //                             {/* 読み終わった本 */}
        //                             <Text style={styles.List_title}>読み終わった本</Text>
        //                             <View style={styles.List}>
        //                                 <FinishedReadingList navigation={this.props.navigation} />
        //                             </View>
        //                             {/* 最近チェックした本 */}
        //                             <Text style={styles.List_title}>最近チェックした本</Text>
        //                             <View style={styles.List}>
        //                                 <RecentlyViewedList navigation={this.props.navigation}/>
        //                             </View>
        //                         </View>
        //                     </ScrollView>
        //     }else{
        //         Screen = <Text style ={styles.nodata}>情報が読み込めませんでした。</Text>
        //     }
        // }
        // 後で使いそうなので消さないでくれるとありがたい
        return (
            <ScrollView>
                            <View style={{width:width, alignItems: "center", justifyContent: "center"}}>
                                <View style={styles.profile}>
                                    <Text>プロフィール</Text>
                                    <Text style={styles.user_name}>サーバーからの名前が入る</Text>
                                    <Text style={styles.introduction}>サーバーから取得した自己紹介文</Text>
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