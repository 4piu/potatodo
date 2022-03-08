import {PureComponent} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

class TaskCard extends PureComponent {
    constructor(props) {
        super(props);
    }

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
                    <Button size="small">Start</Button>
                </CardActions>
            </Card>
        )
    }
}

export default TaskCard;