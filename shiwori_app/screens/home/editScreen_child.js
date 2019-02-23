import React from 'react';
import { StyleSheet, Text, View, Button,FlatList ,TouchableOpacity} from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { connect } from 'react-redux';
import { device_get } from '../../api/showori_server/device';
/**
 * 読書記録画面の編集(リスト表示)  
 * editScreen.js >> here
 * here >> editDetailScreen
 */
class EditScreen_Child extends React.Component {
	state = {	get_data : null,
				fetch_finish : false
			}
	// 読書記録編集画面の詳細へ飛ぶ
	_goEditDetail(item){
		this.props.navigation.navigate('EditDetail',{item:item})
	}

	_createItem(item){
		// itemの中に入ってる情報はほかにも
		let ret = 	<View style={styles.container}>
						<TouchableOpacity
							onPress={()=>{this._goEditDetail(item)}}>
							<View style={styles.container2}>
								<Text style={styles.time}>time : {item.timestamp}</Text>
								<Text style={styles.readtime}>readtime : {item.readtime}</Text>
								<Text style={styles.reedingspeed}>readingspeed : {item.readingspeed}</Text>								
								<Text style={styles.page_num}>page_num : {item.page_num}</Text>
							</View>
						</TouchableOpacity>
					</View>
		return ret;
	}

	async _getReadingHistory(){
		let res = await device_get(this.props.user_id);
		if(res.status==200){
			this.setState({get_data:res.body});
		}else{
			alert('ネットワークエラー['+String(res.status)+']再度実行してください。')
		}
		this.setState({fetch_finish:true});
	}

	componentDidMount(){
		this._getReadingHistory();
	}
	render() {
		let screen;
		if(!this.state.fetch_finish){
			screen = <Text>読み込み中</Text>
		}else{
			if(this.state.get_data==null){
				screen = <Text>読書履歴はありません</Text>
			}else{
				// 読み込めてる
				screen = 	<View>
								<FlatList
									data = {this.state.get_data}
									renderItem = {({item})=>this._createItem(item)}
									keyExtractor={(item, index) => index.toString()}
								/>
							</View>
			}
		}
		
		return (
			<View style={{ flex:1, alignItems: "center", justifyContent: "center" }}>
				{/* <Text>読書中の本の情報を編集</Text> */}
				{screen}
			</View>
		);
	}
}

const mapStateToProps = state => ({
    // jsonから取って来たデータを代入 
    user_id : state.user.id,
})

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditScreen_Child);

const styles = StyleSheet.create({
    container: {
        paddingVertical: 2,
        borderColor: '#4d4d4d',
        width: '100%',
        borderBottomWidth: 0.5,
    },
    container2:{
       
    },
    time:{

	},
	readtime:{

	},
	readingspeed:{

	},
	page_num:{

	}
  });