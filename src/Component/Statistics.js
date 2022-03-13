import {PureComponent} from "react";
import StorageHelper from "../Utility/StorageHelper";
import {secondsToDigital, summaryTaskHistory} from "../Utility/Stats";
import {Stack} from "@mui/material";
import Summary from "./Summary";
import HistoryChart from "./HistoryChart";

class Statistics extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const history = StorageHelper.getAllHistory();
        const summary = summaryTaskHistory(history);
        return (
            <Stack spacing={2}>
                <Summary title="Summary" data={{
                    "Times": summary.totalTimes,
                    "Duration": secondsToDigital(summary.totalDuration),
                    "Daily avg.": secondsToDigital(summary.dailyAvg)
                }}/>
                <Summary title="Today" data={{
                    "Times": summary.monthlyTimes[0].times,
                    "Duration": secondsToDigital(summary.monthlyDuration[0].duration)
                }}/>
                <HistoryChart title={"Past 7 Days"} x="date" y="times" data={summary.monthlyTimes.reverse().slice(-7)}/>
            </Stack>
        );
    }
}

export default Statistics;