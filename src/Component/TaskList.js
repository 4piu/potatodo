import {PureComponent} from "react";
import {Grid} from "@mui/material";
import TaskCard from "./TaskCard";

class TaskList extends PureComponent {
    render() {
        return (
            <>
                <Grid container spacing={{xs: 2, md: 4}}>
                    {this.props.taskList.map(item => (
                        <Grid item key={item.uuid} xs={12} sm={6} md={4} lg={3}>
                            <TaskCard task={item}/>
                        </Grid>
                    ))}
                </Grid>
            </>
        );
    }
}

export default TaskList;