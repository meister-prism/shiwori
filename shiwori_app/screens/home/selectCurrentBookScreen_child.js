import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableHighlight, Text, View, Button, Alert,Image,FlatList } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { connect } from 'react-redux';
import { set_nowBook } from '../../redux/actions/book_data';
import { set_currentBook } from '../../api/showori_server/userdata';
import NowReadingBook from '../../components/bookdata/now_reading_book';
/**
 * homeScreen_child.js >> here
 * here >> selectCurrentBookScreen_child.js 
 */
class SelectCurrentBookScreen_Child extends React.Component {
	// serverへ
	async _selectToSetServer(item){
		let res = set_currentBook(this.props.user_id,item.id);
		console.log(JSON.stringify(res));
		if(res==200){
			this.props.set_nowBook(item.id);
		}else{
			// 取得できないので。
			this.props.set_nowBook(item.id);
		}
		// this.props.set_nowBook(item.id);
	}
	_selected(item){
		Alert.alert(
            '現在読んでいる本に設定しますか？',item.title,
            [
                {text:'キャンセル',style:'cancel'},
                {text:'確定',onPress:() =>{this._selectToSetServer(item)}},
            ]
        )
	}

	_createList(item){
        if(item.img == "none")return <Text></Text>;
        let image;
        image=  <Image source={{uri: item.imgLink}} style={{width: 90, height: 130,resizeMode : 'contain'}} />
        let ret =   <View style={styles.itemContainer}>
                        <TouchableHighlight
                            onPress={()=>{this._selected(item)}}>
                            {image}
                        </TouchableHighlight>
                    </View>
        return ret;
    }

	render() {
		let nowReadingList;
		// alert(JSON.stringify(this.props.now_reading));
		if (this.props.now_reading.length == 0) {
			nowReadingList = <Text style={styles.nodata}>現在読んでいる本はありません</Text>
		} else {
			nowReadingList = <FlatList
				data={this.props.now_reading}
				renderItem={({ item }) => this._createList(item)}
				keyExtractor={(item, index) => index.toString()}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			/>
		}
		return (
			<View style={{ flex:1 }}>
				{/* メモ：現在読んでいる本を下にしたら見えなくなった */}
				<View style={styles.readingListContainer}>
					<Text style={{ paddingBottom: 10 }} >購読する本を選択してください</Text>
					{nowReadingList}
				</View>
				<View style={styles.currentBookContainer}>
					<Text>購読中の本</Text>
					<NowReadingBook avigation={this.props.navigation}/>
				</View>
			</View>
		);
	}
}

// styleとは、nowReadingList.jsとほぼ同じなので参考にすると早いよ
const styles = StyleSheet.create({
	readingListContainer: {
		fontSize: 17,
		fontWeight: 'bold',
		marginTop: 20,
		height: 200,
		padding: 10,
	},
	itemContainer: {
		
	},
	currentBookContainer: {
		marginTop: 30,
		marginHorizontal: 10,
		padding: 10,
		fontSize: 15,
		fontWeight: 'bold',
		backgroundColor: '#f3f3f3',
		borderWidth: 1,
		borderColor: '#7d7d7d',
	},
	nodata: {

	}
});


const mapStateToProps = state => ({
	user_id : state.user.id,
	now_reading_id : state.bookdata.now_reading_id,
    now_reading: state.bookdata.now_reading_data // [id,id,id,...] 先頭が古く、末尾が新しい
})

const mapDispatchToProps = {
    set_nowBook,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelectCurrentBookScreen_Child);
