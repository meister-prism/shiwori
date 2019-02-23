import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import EditDetailScreen_Child from './editDetailScreen_child';
import { Provider } from 'react-redux';
import { store,persistor } from '../../redux/store';

/**
 * editScreen_child >> here
 * here >> editDetailScreen_child.js
 */
class EditDetailScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: '読書記録の編集',
		headerLeft: <HeaderIcon navigation={navigation} />,
    headerStyle: {
      backgroundColor: '#FAE4EB',
    },
	});
	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<EditDetailScreen_Child navigation={this.props.navigation}/>
				</View>
			</Provider>
		);
	}
}

export default EditDetailScreen;