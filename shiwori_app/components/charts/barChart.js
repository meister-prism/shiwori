import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {BarChart,LineChart,Grid , XAxis,YAxis} from 'react-native-svg-charts';

const month_list = ["Jan.","Feb.","Mar","Apr.","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."];
const week_list  = ["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."];

export default class BarGraph extends React.Component {
    
    // X軸のメモリに記入する項目を設定する
    XaxisIndexSet(){

    }

    getXaxisText(index,interval){
        if(index+1==1)return index+1;
        if((index+1)%interval)return undefined;
        else return index+1;
    }

    render() {
        // const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        let fill = 'rgb(134, 65, 244)'; // chart color
        // graph描画位置設定項目
        let _Yaxis_style={marginTop:-10};
        let _Yaxis_contentInset = { top: 20, bottom: 20 }
        let _Chart_contentInset = { top: 10, bottom: 10 }
        let _Cahrt_spacingInner = 0.05;
        let _Cahrt_spacingOuter = 0.05;      
        let _Xaxis_style={ marginHorizontal: 0 };
        let _Xaxis_contentInset = { left: 13, right: 13 }


        let xaxisText = month_list;
        let Xinterval = 1;
        const XaxisIsText = false;

        const indexStart = 0;
        // sample data
        const data_12 = [2,3,6,2,4,1,5,7,9,2,4,1];
        const data_7  = [2,3,6,2,4,1,10];
        const data_31 = [2,3,6,2,4,1,5,7,9,2,2,3,6,2,4,1,5,7,9,2,2,3,6,2,4,1,5,7,9,2,4];
        const data_30 = [2,3,6,2,4,1,5,7,9,2,2,3,6,2,4,1,5,7,9,2,2,3,6,2,4,1,5,7,9,2];
        const data_28 = [2,3,6,2,4,1,5,7,9,2,2,3,6,2,4,1,5,7,9,2,2,3,6,2,4,1,5,7];
        
        const data = data_31;
        
        switch(data.length){
            case 12:
                // 初期設定：年グラフ用
                break;
            case 7:
                // Week chart
                xaxisText = week_list;
                _Cahrt_spacingInner = 0.3;
                _Cahrt_spacingOuter = 0.3;
                _Yaxis_contentInset = { top: 20, bottom: 20 }
                _Xaxis_contentInset = { left:26, right: 26 }
                break;
            case 31:
                _Yaxis_contentInset = { top: 20, bottom: 20 }
                _Xaxis_contentInset = { left: 6, right:   6 }
                Xinterval =7;
                break;
            case 30:
                _Yaxis_contentInset = { top: 20, bottom: 20 }
                _Xaxis_contentInset = { left: 6, right:   6 }
                Xinterval =7;
                break;
            case 28:
                _Yaxis_contentInset = { top: 20, bottom: 20 }
                _Xaxis_contentInset = { left: 7, right:   7 }
                Xinterval =7;
                break;
            default:
                fill = 'rgb(66, 66, 66)'
                console.log("BarGraph : DatasizeEroor");
        }
        
        if(XaxisIsText){
            return (
                <View style={{ height:200,flexDirection: 'row'}}>
                    <YAxis
                        style={_Yaxis_style}
                        data={ data }
                        contentInset={ _Yaxis_contentInset }
                        svg={{
                            fill: 'grey',
                            fontSize:10,
                        }}
                        numberOfTicks={10}
                        formatLabel={ value => `${value}冊` }
                    />
                    <View style={{flex:1,marginLeft : 10}}>
                        <BarChart
                            style={{ flex: 1 }}
                            data={ data }
                            gridMin={ 0 }
                            spacingInner={_Cahrt_spacingInner}
                            spacingOuter={_Cahrt_spacingOuter}
                            contentInset={_Chart_contentInset}
                            svg={{fill}}
                        >
                            <Grid/>
                        </BarChart>
                        <XAxis
                            style={_Xaxis_style}
                            data={ data }
                            formatLabel={ (value, index) => xaxisText[index] }
                            contentInset={_Xaxis_contentInset}
                            svg={{ fontSize: 10, fill: 'black' }}
                        />
                    </View>
                </View>
            )
        }else{
            return (
                <View style={{ height:200,flexDirection: 'row'}}>
                    <YAxis
                        style={_Yaxis_style}
                        data={ data }
                        contentInset={ _Yaxis_contentInset }
                        svg={{
                            fill: 'grey',
                            fontSize:10,
                        }}
                        numberOfTicks={10}
                        formatLabel={ value => `${value}冊` }
                    />
                    <View style={{flex:1,marginLeft : 10}}>
                        <BarChart
                            style={{ flex: 1 }}
                            data={ data }
                            gridMin={ 0 }
                            spacingInner={_Cahrt_spacingInner}
                            spacingOuter={_Cahrt_spacingOuter}
                            contentInset={_Chart_contentInset}
                            svg={{fill}}
                        >
                            <Grid/>
                        </BarChart>
                        <XAxis
                            style={_Xaxis_style}
                            data={ data }
                            formatLabel={ (value, index) => this.getXaxisText(index,Xinterval) }
                            contentInset={_Xaxis_contentInset}
                            svg={{ fontSize: 10, fill: 'black' }}
                        />
                    </View>
                </View>
            )
        }
    }
}