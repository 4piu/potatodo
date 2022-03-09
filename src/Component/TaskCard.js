import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Button,
    Card, CardActions,
    CardContent, CardHeader, IconButton, Menu, MenuItem} from "@mui/material";
import { PureComponent } from "react";
import ActivityContext from "../Context/ActivityContext";
import StorageHelper from "../Utility/StorageHelper";
import { TimerMode } from "../Utility/Task";
import Timer from "../Utility/Timer";

class TaskCard extends PureComponent {
    static contextType = ActivityContext;

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        }
    }

    onStartClicked = () => {
        if (this.props.task.timerMode !== TimerMode.ONETIME) {
            this.context.setAppState({
                activeTaskId: this.props.task.uuid,
                activity: ActivityContext.Activity.TIMER
            })
        } else {
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
        }
    };

    onCompleteConfirm = () => {
        StorageHelper.addTimer(new Timer(this.props.task.uuid, TimerMode.ONETIME));
        StorageHelper.completeTimer();
        this.closePrompt();
    }

    onMenuDeleteClick = () => {
        this.context.setAppState({
            showPrompt: true,
            prompt: {
                title: "Delete task?",
                content: `Confirm delete task ${this.props.task.name}`,
                actions: [
                    <Button onClick={this.closePrompt}>Cancel</Button>,
                    <Button onClick={this.onDeleteConfirm}>Delete</Button>
                ]
            }
        });
    }

    onDeleteConfirm = () => {
        StorageHelper.deleteTask(this.props.task.uuid);
        this.closePrompt();
    }

    openMenu = (ev) => {
        this.setState({ anchorEl: ev.currentTarget });
    };

    closeMenu = () => {
        this.setState({ anchorEl: null });
    };

    closePrompt = () => {
        this.context.setAppState({
            showPrompt: false
        });
    }

    render() {
        return (
            <>
                <Card>
                    <CardHeader
                        action={
                            <IconButton
                                aria-label="task menu"
                                aria-controls="menu-task"
                                aria-haspopup="true"
                                onClick={this.openMenu}>
                                <MoreVertIcon />
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
                    <MenuItem>Edit</MenuItem>
                    <MenuItem onClick={this.onMenuDeleteClick}>Delete</MenuItem>
                </Menu>

            </>
        );
    }
}

export default TaskCard;