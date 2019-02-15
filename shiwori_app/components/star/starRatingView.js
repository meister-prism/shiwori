import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';
// react-native-vector-iconsのios,android対応が必要
/**
 * serverから取得して★の数を表示する
 */
class StarRatingView extends React.Component {
  state={starCount:0}
  async componentDidMount(){
      let rate=3;
      setState({starCount:rate})
  }
  render() {
    return (
      <View>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={this.state.starCount}
        />
      </View>
    );
  }
}

export default StarRatingView;