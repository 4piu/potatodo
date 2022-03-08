import {PureComponent} from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import ActivityContext from "../Context/ActivityContext";

class TaskCard extends PureComponent {
    static contextType = ActivityContext;

    constructor(props) {
        super(props);
    }

    onStartClicked = () => {
        this.context.setActiveTaskId(this.props.task.uuid);
        this.context.setActivity(ActivityContext.Activity.TIMER);
    };

    render() {
        return (
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
        );
    }
}

export default TaskCard;