import {PureComponent} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, DialogTitle,
    Typography
} from "@mui/material";
import ActivityContext from "../Context/ActivityContext";
import {TimerMode} from "../Utility/Task";
import Timer from "../Utility/Timer";
import StorageHelper from "../Utility/StorageHelper";

class TaskCard extends PureComponent {
    static contextType = ActivityContext;

    constructor(props) {
        super(props);
        this.state = {
            showOnetimeConfirm: false
        }
    }

    onStartClicked = () => {
        if (this.props.task.timerMode !== TimerMode.ONETIME) {
            this.context.setActiveTaskId(this.props.task.uuid);
            this.context.setActivity(ActivityContext.Activity.TIMER);
        } else {
            this.setState({
                showOnetimeConfirm: true
            });
        }
    };

    onConfirmAction = () => {
        StorageHelper.addTimer(new Timer(this.props.task.uuid, TimerMode.ONETIME));
        StorageHelper.completeTimer();
    }

    onCancelAction = () => {
        this.setState({
            showOnetimeConfirm: false
        })
    }

    render() {
        return (
            <>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {this.props.task.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {this.props.task.comment}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={this.onStartClicked}>Start</Button>
                    </CardActions>
                </Card>
                {this.props.task.timerMode === TimerMode.ONETIME &&
                    <Dialog
                        open={this.state.showOnetimeConfirm}
                        onClose={this.onCancelAction}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Completing task?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                This is a one-time task and will be completed immediately.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onCancelAction}>Cancel</Button>
                            <Button onClick={this.onConfirmAction} autoFocus>Complete</Button>
                        </DialogActions>
                    </Dialog>
                }
            </>
        );
    }
}

export default TaskCard;