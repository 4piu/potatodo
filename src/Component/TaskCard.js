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
            showPrompt: false,
            promptTitle: null,
            promptContent: null,
            promptActions: null
        }
    }

    onStartClicked = () => {
        if (this.props.task.timerMode !== TimerMode.ONETIME) {
            this.context.setActiveTaskId(this.props.task.uuid);
            this.context.setActivity(ActivityContext.Activity.TIMER);
        } else {
            this.setState({
                showPrompt: true,
                promptTitle: "Complete the task?",
                promptContent: "This is a one-time task and will be completed immediately.",
                promptActions: [
                    <Button onClick={this.closePrompt}>Cancel</Button>,
                    <Button onClick={this.onCompleteConfirm} autoFocus>Complete</Button>
                ]
            });
        }
    };

    onCompleteConfirm = () => {
        StorageHelper.addTimer(new Timer(this.props.task.uuid, TimerMode.ONETIME));
        StorageHelper.completeTimer();
        this.closePrompt();
    }

    closePrompt = () => {
        this.setState({
            showPrompt: false
        })
    }
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
                    <Prompt
                    open={this.state.showPrompt}
                    onClose={this.closePrompt}
                    title={this.state.promptTitle}
                    content={this.state.promptContent}
                    actions={this.state.promptActions}
                    />
                }
            </>
        );
    }
}

export default TaskCard;