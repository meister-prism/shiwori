import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
class BookList_Child extends React.Component{
    render(){
        let item = this.props.item;
        let image = this.props.image;
        return  (
                <View>
                    <Text>{image}</Text>
                    <Text>id        : {item.id}</Text>
                    <Text>タイトル  : {item.title}</Text>
                </View>
        );
    }
}

export default BookList_Child;