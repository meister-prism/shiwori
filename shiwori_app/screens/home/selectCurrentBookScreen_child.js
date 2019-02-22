import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableHighlight, Text, View, Button, Alert } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { connect } from 'react-redux';
import {set_nowBook} from '../../redux/actions/book_data'

/**
 * homeScreen_child.js >> here
 * here >> selectCurrentBookScreen_child.js 
 */
class SelectCurrentBookScreen_Child extends React.Component {
	// serverへ
	async _selectToServer(item){
		alert("サーバー通信処理")
	}
	_selected(item){
		Alert.alert(
            '現在読んでいる本に設定しますか？','タイトルを表示したい',
            [
                {text:'キャンセル',style:'cancel'},
                {text:'確定',onPress:() =>{this._selectToServer(item)}},
            ]
        )
	}

	_createList(item){
        if(item.img == "none")return <Text></Text>;
        let image;
        image=  <Image source={{uri: item.imgLink}} style={{width: 100, height: 150,resizeMode : 'contain'}} />
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
				data={now_reading}
				renderItem={({ item }) => this._createList(item)}
				keyExtractor={(item, index) => index.toString()}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			/>
		}
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text>現在読んでいる本を選択する</Text>
				<View style={styles.nowReadingListContainer}>
					{nowReadingList}
				</View>
			</View>
		);
	}
}

// styleとは、nowReadingList.jsとほぼ同じなので参考にすると早いよ
const styles = StyleSheet.create({
	itemContainer: {

	},
	nodata: {

	}
});


const mapStateToProps = state => ({
    now_reading: state.bookdata.now_reading_data // [id,id,id,...] 先頭が古く、末尾が新しい
})

const mapDispatchToProps = {
    set_nowBook,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelectCurrentBookScreen_Child);
