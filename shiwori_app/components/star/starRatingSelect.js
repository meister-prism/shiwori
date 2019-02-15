import * as React from 'react';
import { View, StyleSheet, Button,Text,Modal,  TouchableHighlight,Alert} from 'react-native';
import StarRating from 'react-native-star-rating';
// react-native-vector-iconsのios,android対応が必要

/**
 * ★の数を選択して、最後にserverに保存する
 */
class StarRatingSelect extends React.Component {
  state={starCount:0}
  async onPress(){
      alert("データの送信")
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  render() {
    return (
      <View>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={this.state.starCount}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
        />
        <Button title="決定" onPress={()=>{this.onPress}}/>
      </View>
    );
  }
}

export default StarRatingSelect;