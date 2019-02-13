import React from 'react'
import {View,Text} from 'react-native'
import PercentageCircle from 'react-native-percentage-circle';

/**
 * 進捗率を計算します。
 * @prop percent : パーセント
 * example : <ProgressCircle percent='76.48573875' />
 */
class ProgressCircleExample extends React.PureComponent {

    render() {
        let percent = this.props.percent;
        percent = Math.round(percent * 10) / 10; // 出力：小数点以下1桁
        return (
            <View>
                <PercentageCircle radius={42} percent={percent} color={"#3498db"}>
                <Text>読了率</Text>
                <Text>{percent}%</Text>
                </PercentageCircle> 
            </View>
        )
    }

}

export default ProgressCircleExample;