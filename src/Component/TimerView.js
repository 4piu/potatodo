import {Box, ButtonGroup, Button} from "@mui/material";
import React, {PureComponent} from "react";
import ActivityContext from "../Context/ActivityContext";
import StorageHelper from "../Utility/StorageHelper";
import Countdown from "./Countdown";
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import Prompt from "./Prompt";
import Timer from "../Utility/Timer";

const Dialog = Object.freeze({
    NONE: 0,
    PAUSED: 1,
    RESTING: 2,
    FINISHED: 3,
    OUTDATED: 4,
    STOP: 5
});

class TimerView extends PureComponent {
    static contextType = ActivityContext;

    constructor(props) {
        super(props);
        const timer = StorageHelper.getTimer();
        timer.onTick = this.onTimerTick;
        timer.onPauseTimeEnd = this.onTimerPauseTimeEnd;
        timer.onRestTimeEnd = this.onTimerRestTimeEnd;
        timer.onWorkTimeEnd = this.onTimerWorkTimeEnd;
        let dialog = Dialog.NONE;
        switch (timer.state) {
            case Timer.State.PAUSED:
                dialog = Dialog.PAUSED;
                break;
            case Timer.State.RESTING:
                dialog = Dialog.RESTING;
                break;
            case Timer.State.FINISHED:
                dialog = Dialog.FINISHED;
                break;
        }
        if (timer.isOutdated()) dialog = Dialog.OUTDATED;
        this.state = {
            timer: timer,
            dialog: dialog
        };
    }

    componentDidMount() {
        if (!this.state.timer.isOutdated()) this.state.timer.restore();
    }

    componentWillUnmount() {
        this.state.timer.stop();
    }

    onTimerTick = () => {
        StorageHelper.setTimer(this.state.timer);
        this.forceUpdate();
    };

    onTimerPauseTimeEnd = () => {
        this.setState({
            dialog: Dialog.NONE
        });
    };

    onTimerWorkTimeEnd = () => {
        this.setState({
            dialog: Dialog.RESTING
        });
    };

    onTimerRestTimeEnd = () => {
        this.setState({
            dialog: Dialog.FINISHED
        });
    };

    onPauseClicked = () => {
        this.state.timer.pause();
        this.setState({
            dialog: Dialog.PAUSED
        });
    };

    onStopClicked = () => {
        this.setState({
            dialog: Dialog.STOP
        });
    };

    giveUpTimer = () => {
        StorageHelper.deleteTimer();
        this.context.setAppState({
            activeTaskId: null,
            activity: ActivityContext.Activity.TASK
        });
    };

    closeDialog = () => {
        this.setState({
            dialog: Dialog.NONE
        });
    };

    resumeTimer = () => {
        this.state.timer.resume();
        this.closeDialog();
    };

    restNow = () => {
        this.state.timer.restNow();
        this.setState({
            dialog: Dialog.RESTING
        });
    };

    saveAndClose = () => {
        this.state.timer.stop();
        StorageHelper.completeTimer();
        this.context.setAppState({
            activeTaskId: null,
            activity: ActivityContext.Activity.TASK
        });
    };

    render() {
        const prompt = {};
        switch (this.state.dialog) {
            case Dialog.NONE:
                prompt.open = false;
                break;
            case Dialog.STOP:
                prompt.title = "Stop timer?";
                prompt.onClose = this.closeDialog;
                prompt.actions = [
                    <Button onClick={this.closeDialog}>Cancel</Button>,
                    <Button onClick={this.giveUpTimer} color="error">Abort</Button>,
                    <Button onClick={this.restNow}>Complete</Button>
                ];
                prompt.open = true;
                break;
            case Dialog.PAUSED:
                prompt.title = "Timer paused";
                prompt.content = `Auto resume in ${this.state.timer.getPauseTimeText()}`;
                prompt.actions = [
                    <Button onClick={this.resumeTimer}>Resume</Button>
                ];
                prompt.open = true;
                break;
            case Dialog.RESTING:
                prompt.title = "Resting";
                prompt.content = `Enjoy your rest ${this.state.timer.getRestTimeText()}`;
                prompt.actions = [
                    <Button onClick={this.saveAndClose}>Skip</Button>
                ];
                prompt.open = true;
                break;
            case Dialog.FINISHED:
                prompt.title = "Completed";
                prompt.content = "Congratulations, you complete the task";
                prompt.actions = [
                    <Button onClick={this.saveAndClose}>Back</Button>
                ];
                prompt.open = true;
                break;
            case Dialog.OUTDATED:
                prompt.title = "Oops";
                prompt.content = "The last timer ends unexpectedly";
                prompt.actions = [
                    <Button onClick={this.giveUpTimer} color="error">Abort</Button>,
                    <Button onClick={this.saveAndClose}>Complete</Button>
                ];
                prompt.open = true;
                break;
        }
        return (
            <>
                <Box sx={{
                    display: 'flex',
                    height: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Countdown value={this.state.timer.getProgress()} text={this.state.timer.getWorkTimeText()}/>
                    <ButtonGroup disableElevation variant="contained" size="large" sx={{
                        position: 'absolute',
                        bottom: '10%'
                    }}>
                        <Button onClick={this.onPauseClicked}
                                disabled={!this.state.timer.canPause()}><PauseIcon/></Button>
                        <Button onClick={this.onStopClicked}><StopIcon/></Button>
                    </ButtonGroup>
                </Box>
                <Prompt
                    open={prompt.open}
                    title={prompt.title}
                    onClose={prompt.onClose}
                    content={prompt.content}
                    actions={prompt.actions}
                />
            </>
        );
    }
}

export default TimerView;