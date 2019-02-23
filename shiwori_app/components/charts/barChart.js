import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart, LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { device_get } from '../../api/showori_server/device'
import { connect } from 'react-redux';
var moment = require("moment");
/**
 * 棒グラフ表示（過去12か月）
 * 軸なし
 * providerで囲ってください。
 */
class BarGraph extends React.Component {
    state={ device_data : null,
            fetch_finish:false,
            chartdata : null,
    }

    _create_data(){
        let month_time = [0,0,0,0,0,0,0,0,0,0,0,0];
        let month_count = 0;
        let month_tmp;
        for(let i=0;i<this.state.device_data.length;i++){
            if(i==0){
                time = moment(this.state.device_data[i].timestamp,"YYYY-MM-DD-hh-mm-ss");
                month_tmp = time.month();
                console.log(month_tmp);
            }
            if(month_tmp != moment(this.state.device_data[i].timestamp,"YYYY-MM-DD-hh-mm-ss").month()){
                // 月が違ったら
                month_tmp = moment(this.state.device_data[i].timestamp,"YYYY-MM-DD-hh-mm-ss").month();
                month_count++;
            }
            if(month_count>=11)break;
            month_time[month_count]+=this.state.device_data[i].readtime;
        }

        for(let i=0;i<12;i++){
            month_time[i] /= 60000;
            month_time[i].toFixed(1);
        }
        return month_time;
    }
    async _getStatistics(){
        let res = await device_get(this.props.user_id);
        console.log(res.body);
        if(res.status==200){
            this.setState({device_data:res.body});
        }else{
            alert('networkError');
        }
        this.setState({fetch_finish:true});
    }
    componentDidMount(){
        this._getStatistics();
    }
    render() {
        // const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        let fill = 'rgb(134, 65, 244)'; // chart color
        // graph描画位置設定項目
        let _Chart_contentInset = { top: 10, bottom: 10 }
        let _Cahrt_spacingInner = 0.05;
        let _Cahrt_spacingOuter = 0.05;
        // sample data
        // const data_12 = [2, 3, 6, 2, 4, 1, 5, 7, 9, 2, 4, 1];
        // const data = data_12;
        let screen;
        if(!this.state.fetch_finish){
            screen = <Text>読み込み中</Text>
        }else{
            if(this.state.device_data==null){
                screen = <Text>過去12か月の読書記録はありません</Text>
            }else{
                // data加工処理を入れる
                data = this._create_data();
                // console.log(this._create_data());
                screen = <View style={{ flex: 1, marginLeft: 10 }}>
                            <BarChart
                                style={{ flex: 1 }}
                                data={data}
                                gridMin={0}
                                spacingInner={_Cahrt_spacingInner}
                                spacingOuter={_Cahrt_spacingOuter}
                                contentInset={_Chart_contentInset}
                                svg={{ fill }}
                            >
                                <Grid />
                            </BarChart>
                        </View>
            }
        }
        return (
            <View style={{ height: 200, flexDirection: 'row' }}>
                {screen}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    // jsonから取って来たデータを代入
    user_id : state.user.id
})

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BarGraph);

