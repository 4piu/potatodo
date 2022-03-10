import {PureComponent} from "react";
import StorageHelper from "../Utility/StorageHelper";
import {secondsToDigital, summaryTaskHistory} from "../Utility/Stats";
import {Stack} from "@mui/material";
import Summary from "./Summary";

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
                    "Times": summary.todayTimes,
                    "Duration": secondsToDigital(summary.todayDuration)
                }}/>
            </Stack>
        );
    }
}

export default Statistics;