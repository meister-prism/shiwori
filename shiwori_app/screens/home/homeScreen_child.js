import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableOpacity, Text, View, Button, Alert } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store, persistor } from '../../redux/store';
import BarChart from '../../components/charts/barChart';
import { connect } from 'react-redux';
import NowReadingBook from '../../components/bookdata/now_reading_book_home';

/**
 * homeScreen.js >> here
 * here >> editScreen.js
 * here >> selectCurrentBook.js
 */
class HomeScreen_Child extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    {/* graph */}
                    <View style={styles.chartContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>読書記録</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Edit')}>
                                    <Text style={styles.button}>編集</Text>
                                </TouchableOpacity>
                            </View>    
                        </View>
                        <BarChart/>
                    </View>
                    
                    {/* 現在読んでいる本 */}
                    <View style={styles.currentBookContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>購読中の本</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectCurrentBook')}>
                                    <Text style={styles.button}>変更</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <NowReadingBook  navigation={this.props.navigation}/>
                    </View>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    titleContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    title: {
        width: '72%',
        fontSize: 17,
        fontWeight: 'bold',
        padding: 10,
    },
    chartContainer: {
        padding: 10,
        height: 200,
    },
    currentBookContainer:{
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    buttonContainer: {
        textAlign: 'right',
        margin: 5,
        width: '25%',
    },
    button: {
        fontSize: 12,
        borderRadius: 3,
        backgroundColor: '#67C175',
        textAlign: 'center',
        color: '#FFFF',
        padding: 5,
    },
});

const mapStateToProps = state => ({
    user_id: state.user.id,
})

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen_Child);