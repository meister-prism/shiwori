import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,Modal ,ScrollView} from 'react-native';
var Dimensions = require('Dimensions');
var { width, height, scale } = Dimensions.get('window'); //get window size
import RecentlyViewedList from './recentlyViewedList'
import { Provider } from 'react-redux';
import {store} from '../../redux/store'
import {gbapi_search,INITIAL_CONFIG} from '../../api/googleBooks/search';

/**
 * 本の詳細表示
 * screen/detailsScreen.js >> here
 * here >> BooksScreen.js (著者絞込検索 type:author)
 */
class BookDetail extends React.Component{
    state = {   modalVisible_discription:false,
                modalVisible_img:false,
            }
    setModalVisible_discription(visible) {
        this.setState({modalVisible: visible});
    }
    setModalVisible_img(visible) {
        this.setState({modalVisible2: visible});
    }

    /**
     * 著者絞り込み検索をして本棚ページに遷移させます。
     */
    async _authorSearch(authors){
        let config = Object.assign({}, INITIAL_CONFIG);
        config.maxResults = 40;
        config.inauthor=true; // 著者絞り込み検索
        let res = await gbapi_search(authors,config);
        // error処理はここ
        this.props.navigation.navigate('Books',{result:res.body,type:"author",title:authors+'の検索結果'});
    }

    render(){
        let data = this.props.data; //data:(obj)
        let image,modal_image;
        if(data.imageLink_large != null){
            image=<Image source={{uri: data.imageLink_large}} style={styles.img} />
            modal_image=<Image source={{uri: data.imageLink_large}} style={styles.modalimg} />
        }else if(data.imageLink_medium !=null){
            image=<Image source={{uri: data.imageLink_medium}} style={styles.img} />
            modal_image=<Image source={{uri: data.imageLink_medium}} style={styles.modalimg} />
        }else if(data.imageLink_thumbnail!=null){
            image=<Image source={{uri: data.imageLink_thumbnail}} style={styles.img} />
            modal_image=<Image source={{uri: data.imageLink_thumbnail}} style={styles.modalimg} />
        }else if(data.imageLink_smallThumbnail!=null){
            image=<Image source={{uri: data.imageLink_smallThumbnail}} style={styles.img} />
            modal_image=<Image source={{uri: data.imageLink_smallThumbnail}} style={styles.modalimg} />
        }else {
            image= <Image source={require('../../assets/img/noimage.png')} style={styles.img} />
            modal_image=<Image source={{uri: data.imageLink_large}} style={styles.modalimg} />
        }
        return  (
            <Provider store={store}>
                <View style={styles.container}>
                    <View style={styles.InfoContainer}>
                        <TouchableOpacity onPress={() => {this.setModalVisible_img(true);}}>
                            <View style={styles.imgContainer}>{image}</View>
                        </TouchableOpacity>
                            <View style={styles.info}>
                                <Text style={styles.title}>{data.title}</Text>
                                <TouchableOpacity onPress={()=>{this._authorSearch(data.authors)}}>
                                    <Text style={styles.author}>{data.authors}</Text>
                                </TouchableOpacity>                                
                                <Text style={styles.publiserDate}>{data.publishedDate}</Text>
                                <Text style={styles.publisher}>{data.publisher}</Text>
                            </View>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.bookdetail}>本の詳細</Text>
                        <TouchableOpacity　onPress={() => {this.setModalVisible_discription(true);}}>
                            <Text numberOfLines={5} style={styles.bookdetail_txt}>{data.description}</Text>
                        </TouchableOpacity>
                        {/* 最近読んだ本 */}
                        <RecentlyViewedList navigation={this.props.navigation}/>
                    </View>

                    {/* Modal */}
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.modalVisible_discription}>
                        {/* description */}
                        <View style={styles.modalScreen}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.bookdetail}>本の詳細（全文）</Text>
                            <Text style={styles.bookdetail_txt}>{data.description}</Text>
                            <TouchableOpacity 
                                onPress={() => {this.setModalVisible_discription(!this.state.modalVisible_discription);}}>
                                <Text style={styles.hidebutton_txt}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.modalVisible_img}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalImgContainer}>
                                    {modal_image}
                                    <TouchableOpacity 
                                        onPress={() => {this.setModalVisible_img(!this.state.modalVisible_img);}}>
                                        <Text style={styles.hidebutton_txt}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    </Modal>
                </View>
                </Provider>
        );
    }
}


export default BookDetail;

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:width,
        height:height
    },
    InfoContainer:{
        flexDirection:'row',
        backgroundColor: '#f0f0f0',
    },
    imgContainer:{
        backgroundColor: 'powderblue',
        padding :5,
    },
    img:{
        width: 150, 
        height: 250,
        resizeMode : 'contain',
    },
    info:{
        flex:1,
        padding:10,
        flexWrap:'wrap',
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
    },
    detailsContainer:{
        backgroundColor: '#f0f0f0',
        padding:10,
        flex:1,
    },
    bookdetail:{
        fontSize:18,
        fontWeight:'bold',
        padding:5, 
    },
    bookdetail_txt:{
    },
    modalScreen:{
        flex:1,
        padding:20,
        backgroundColor: '#f0f0f0',
    },
    modalContainer:{
        flex:1,
        justifyContent:'center',
        padding:20,
        backgroundColor:'#dfdfdf'
    },
    modalImgContainer:{
        flex:1,
        justifyContent:'center',
        padding:20,
        backgroundColor:'#dfdfdf'
    },
    modalimg:{
        width: 300, 
        height: 500,
        resizeMode : 'contain',
    },
    hidebutton_txt:{
        fontSize:15,
        textAlign:'right',
    }
  });