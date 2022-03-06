import {PureComponent} from "react";
import StorageHelper from "../Utility/StorageHelper";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TaskEditor from "./TaskEditor";
import ActivityContext from "../Context/ActivityContext";

class TaskList extends PureComponent {
    static contextType = ActivityContext;

    constructor(props) {
        super(props);
        this.state = {
            taskList: [],
            showTaskEditor: false
        };
    }

    componentDidMount() {
        this.setState({
            taskList: StorageHelper.getAllTask()
        });
    }

    fabClick = () => {
        this.setState({
            showTaskEditor: true
        });
    };

    editorClose = () => {
        this.setState({
            showTaskEditor: false
        });
        this.context.setActiveTaskId(null);
    };

    render() {
        return (
            <>
                {this.state.showTaskEditor &&
                    <TaskEditor onClose={this.editorClose} activeTaskId={this.context.activeTaskId}/>}
                {/* TODO show task list*/}
                <Fab color="secondary" aria-label="add" onClick={this.fabClick}>
                    <AddIcon/>
                </Fab>
            </>
        );
    }
}

export default TaskList;