import {Box, ButtonGroup, Button} from "@mui/material";
import {PureComponent} from "react";
import ActivityContext from "../Context/ActivityContext";
import StorageHelper from "../Utility/StorageHelper";
import Countdown from "./Countdown";
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

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
    };

    render() {
        return (
            <Box sx={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Countdown value={42} text="88:88"/>
                <ButtonGroup disableElevation variant="contained" size="large" sx={{
                    position: 'absolute',
                    bottom: '10%'
                }}>
                    <Button><PauseIcon/></Button>
                    <Button><StopIcon/></Button>
                </ButtonGroup>
            </Box>
        );
    }
}

export default TimerView;