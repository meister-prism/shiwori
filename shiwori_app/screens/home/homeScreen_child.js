import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableHighlight, Text, View, Button, Alert } from 'react-native';
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
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text>Home Screen</Text>
                    <Button
                        title="読書履歴を見る"
                        onPress={() => this.props.navigation.navigate('Edit')}
                    />
                    <Button
                        title="現在読んでいる本の変更"
                        onPress={() => this.props.navigation.navigate('SelectCurrentBook')}
                    />
                    {/* 現在読んでいる本 */}
                    <Text>現在読んでいる本を一冊表示したらいいけど、serverかreduxか迷い中</Text>
                    <NowReadingBook navigation={this.props.navigation}/>
                    {/* graph */}
                    <BarChart />

                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center",
    },
    nowReadingListContainer:{

    }
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