import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
class BookList_Child extends React.Component{
    render(){
        let item = this.props.item;
        let image = this.props.image;
        return  (
                <View style={styles.container}>
                    <View style={styles.container2}>
                        <View style={styles.img}>{image}</View>
                        <View style={styles.info}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.author}>{item.authors}</Text>
                            <Text style={styles.publiserDate}>{item.publishedDate}</Text>
                            <Text style={styles.publisher}>{item.publisher}</Text>
                        </View>
                    </View>
                </View>
        );
    }
}

export default BookList_Child;

const styles = StyleSheet.create({
    container: {
        paddingBottom:3,
        paddingTop:3,
        paddingHorizontal:6,
    },
    container2:{
        flexDirection:'row',
        backgroundColor: '#f0f0f0',
    },
    img:{
        backgroundColor: 'powderblue',
    },
    info:{
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
    },
    author:{
        fontSize:13,
        color:'#666666',
    },
    publisher:{
    },
    publiserDate:{
    } 
  });

  {/**
<View style={styles.img}>
                            {image}
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.title}>{item.authors}</Text>
                            <Text style={styles.title}>{item.publishedDate}</Text>
                            <Text style={styles.title}>{item.publisher}</Text>
                        </View> */}