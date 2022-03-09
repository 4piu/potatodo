import { Box, Paper, Typography, Stack } from "@mui/material";
import { PureComponent } from "react";
import ActivityContext from "../Context/ActivityContext";
import StorageHelper from "../Utility/StorageHelper";
import Countdown from "./Countdown";

class TimerView extends PureComponent {
    static contextType = ActivityContext;

    constructor(props) {
        super(props);
    }

    giveUpTimer = () => {
        StorageHelper.deleteTimer();
        this.context.setAppState({
            activeTaskId: null,
            activity: ActivityContext.Activity.TASK
        });
    }

    render() {
        return (
            <Box sx={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Countdown value={42} text="88:88:88"/>
            </Box>
        );
    }
}

export default TimerView;