import { PureComponent } from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography
} from "@mui/material";
import ActivityContext from "../Context/ActivityContext";
import { TimerMode } from "../Utility/Task";
import Timer from "../Utility/Timer";
import StorageHelper from "../Utility/StorageHelper";
import Prompt from "./Prompt";

class TaskCard extends PureComponent {
    static contextType = ActivityContext;

    constructor(props) {
        super(props);
        this.state = {
            showOnetimePrompt: false,
        }
    }

    onStartClicked = () => {
        if (this.props.task.timerMode !== TimerMode.ONETIME) {
            this.context.setActiveTaskId(this.props.task.uuid);
            this.context.setActivity(ActivityContext.Activity.TIMER);
        } else {
            this.setState({
                showOnetimePrompt: true
            });
        }
    };

    onCompleteConfirm = () => {
        StorageHelper.addTimer(new Timer(this.props.task.uuid, TimerMode.ONETIME));
        StorageHelper.completeTimer();
        this.setState({
            showOnetimePrompt: false
        });
    }

    onCompleteCancel = () => {
        this.setState({
            showOnetimePrompt: false
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
                    <Prompt
                        open={this.state.showOnetimePrompt}
                        title="Completing task?"
                        content="This is a one-time task and will be completed immediately."
                        actions={[
                            <Button onClick={this.onCompleteCancel}>Cancel</Button>,
                            <Button onClick={this.onCompleteConfirm} autoFocus>Complete</Button>]}
                    />
                }
            </>
        );
    }
}

export default TaskCard;