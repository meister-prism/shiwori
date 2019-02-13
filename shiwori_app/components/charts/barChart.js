import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
  } from 'react-native-chart-kit'
  import { Dimensions } from 'react-native'
  const screenWidth = Dimensions.get('window').width
export default class BarGraph extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    Bezier Line Chart
                </Text>
                <LineChart
                    data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [{
                        data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                        ]
                    }]
                    }}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}
                />
            </View>
         )
    }
}