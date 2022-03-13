import {PureComponent} from "react";
import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis
} from '@devexpress/dx-react-chart-material-ui';
import {Animation} from '@devexpress/dx-react-chart';
import {Card, CardHeader} from "@mui/material";

class HistoryChart extends PureComponent {
    render() {
        return (
            <Card sx={{
                zIndex: 0
            }}>
                <CardHeader title={this.props.title}/>
                <Chart data={this.props.data} height={300}>
                    <ArgumentAxis/>
                    <ValueAxis/>
                    <BarSeries
                        valueField={this.props.y}
                        argumentField={this.props.x}
                    />
                    <Animation/>
                </Chart>
            </Card>
        );
    }
}

export default HistoryChart;