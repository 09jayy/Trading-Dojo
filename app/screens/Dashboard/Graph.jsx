import {View, Text, Dimensions} from 'react-native'; 
import {LineChart} from 'react-native-chart-kit'; 

/**
 * @param {Array<string>} labels - timings
 * @param {Array<number>} data - prices
 * @returns {React.Component.JSX}
 */
export const Graph = ({labels,data}) => {
    return (
        <View>
            <LineChart
                data={{
                labels: labels, 
                datasets: [
                    {
                    data: data
                    }
                ]
                }}
                width={Dimensions.get("window").width - 50} // from react-native
                height={220}
                yAxisLabel="$"
                formatXLabel={(value) => {return ''}}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "3",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
                />
    </View>
    )
}