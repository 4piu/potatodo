import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Button,
    Card, CardActions,
    CardContent, CardHeader, IconButton, Menu, MenuItem
} from "@mui/material";
import {PureComponent} from "react";
import ActivityContext from "../Context/ActivityContext";
import StorageHelper from "../Utility/StorageHelper";
import {TimerMode} from "../Utility/Task";
import Timer from "../Utility/Timer";

class TaskCard extends PureComponent {
    static contextType = ActivityContext;

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    onStartClicked = (ev) => {
        ev.stopPropagation();
        const task = this.props.task;
        if (task.timerMode === TimerMode.ONETIME) {
            this.context.setAppState({
                showPrompt: true,
                prompt: {
                    title: "Complete the task?",
                    content: "This is a one-time task and will be completed immediately.",
                    actions: [
                        <Button onClick={this.closePrompt}>Cancel</Button>,
                        <Button onClick={this.onCompleteConfirm} autoFocus>Complete</Button>
                    ]
                }
            });
        } else {
            const timerOpts = {};
            if (task.timerMode === TimerMode.COUNT_DOWN) {
                timerOpts.plannedWorkDuration = task.countDown * 60;
                timerOpts.remainingPauseDuration = 180;
                timerOpts.remainingRestDuration = task.restTime * 60;
            }
            if (task.timerMode === TimerMode.ACCUMULATIVE) {
                timerOpts.remainingPauseDuration = 180;
                timerOpts.remainingRestDuration = task.restTime * 60;
            }
            StorageHelper.setTimer(new Timer(task.uuid, task.timerMode, timerOpts));
            this.context.setAppState({
                activeTaskId: task.uuid,
                activity: ActivityContext.Activity.TIMER
            });
        }
    };

    onCompleteConfirm = () => {
        StorageHelper.setTimer(new Timer(this.props.task.uuid, TimerMode.ONETIME));
        StorageHelper.completeTimer();
        this.closePrompt();
    };

    onMenuEditClick = () => {
        this.setState({
            anchorEl: null
        });
        this.context.setAppState({
            activeTaskId: this.props.task.uuid,
            showTaskEditor: true
        });
    };

    onMenuDeleteClick = () => {
        this.setState({
            anchorEl: null
        });
        this.context.setAppState({
            showPrompt: true,
            prompt: {
                title: "Delete task?",
                content: `Confirm delete task ${this.props.task.name}`,
                actions: [
                    <Button onClick={this.closePrompt}>Cancel</Button>,
                    <Button onClick={this.onDeleteConfirm} color="error">Delete</Button>
                ]
            }
        });
    };

    onDeleteConfirm = () => {
        StorageHelper.deleteTask(this.props.task.uuid);
        this.closePrompt();
    };

    openMenu = (ev) => {
        ev.stopPropagation();
        this.setState({anchorEl: ev.currentTarget});
    };

    closeMenu = () => {
        this.setState({anchorEl: null});
    };

    closePrompt = () => {
        this.context.setAppState({
            showPrompt: false
        });
    };

    showTaskDetail = () => {
        this.context.setAppState({
            activeTaskId: this.props.task.uuid,
            activity: ActivityContext.Activity.DETAIL
        });
    };

    render() {
        return (
            <>
                <Card onClick={this.showTaskDetail}>
                    <CardHeader
                        action={
                            <IconButton
                                aria-label="task menu"
                                aria-controls="menu-task"
                                aria-haspopup="true"
                                onClick={this.openMenu}>
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title={this.props.task.name}
                        subheader={this.props.task.comment}
                    />
                    <CardContent>

                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={this.onStartClicked}>Start</Button>
                    </CardActions>
                </Card>
                <Menu
                    id="menu-task"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.closeMenu}
                >
                    <MenuItem onClick={this.onMenuEditClick}>Edit</MenuItem>
                    <MenuItem onClick={this.onMenuDeleteClick}>Delete</MenuItem>
                </Menu>

            </>
        );
    }
}

export default TaskCard;