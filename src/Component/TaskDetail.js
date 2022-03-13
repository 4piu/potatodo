import {PureComponent} from "react";
import Summary from "./Summary";
import {Stack} from "@mui/material";
import ActivityContext from "../Context/ActivityContext";
import StorageHelper from "../Utility/StorageHelper";
import {secondsToDigital, summaryTaskHistory} from "../Utility/Stats";
import HistoryChart from "./HistoryChart";

class TaskDetail extends PureComponent {
    static contextType = ActivityContext;

    render() {
        const history = StorageHelper.getTaskHistory(this.context.getAppState().activeTaskId);
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

export default TaskDetail;