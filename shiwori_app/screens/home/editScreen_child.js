import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { connect } from 'react-redux';
import ChangeColorButton from '../../components/changeColorButton';

/**
 * 読書記録画面の編集  
 * editScreen.js >> here
 */
class EditScreen_Child extends React.Component {

	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text>読書中の本の情報を編集</Text>
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