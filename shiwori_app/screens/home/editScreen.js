import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import EditScreen_Child from './editScreen_child';
import { Provider } from 'react-redux';
import { store,persistor } from '../../redux/store';

/**
 * homeScreen >> here
 * here >> editScreen_child.js
 */
class EditScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: '読書記録の編集',
		headerLeft: <HeaderIcon navigation={navigation} />,
	});
	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<EditScreen_Child />
				</View>
			</Provider>
		);
	}
}

export default EditScreen;