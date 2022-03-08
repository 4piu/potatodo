import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import {PureComponent} from "react";
import Appbar from "./Appbar";
import BottomNav from "./BottomNav";
import ActivityContext from "../Context/ActivityContext";
import {Container, Fab} from "@mui/material";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";
import Statistics from "./Statistics";
import TimerView from "./TimerView";
import TaskEditor from "./TaskEditor";
import AddIcon from "@mui/icons-material/Add";
import StorageHelper from "../Utility/StorageHelper";

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activity: ActivityContext.Activity.TASK,
            activeTaskId: null,
            showTaskEditor: false
        };
    }

    setActivity = (newVal) => {
        this.setState({
            activity: newVal
        });
    };

    setActiveTaskId = (newVal) => {
        this.setState({
            activeTaskId: newVal
        });
    };

    fabClick = () => {
        this.setState({
            showTaskEditor: true
        });
    };

    editorClose = () => {
        this.setState({
            showTaskEditor: false
        });
        this.setActiveTaskId(null);
    };

    render() {

        return (
            <ActivityContext.Provider value={{
                activity: this.state.activity,
                setActivity: this.setActivity,
                activeTaskId: this.state.activeTaskId,
                setActiveTaskId: this.setActiveTaskId
            }}>
                <CssBaseline/>
                {(this.state.activity !== ActivityContext.Activity.TIMER) &&
                    <Appbar/>}
                <Container maxWidth="lg" sx={{my: 11}}>
                    {this.state.activity === ActivityContext.Activity.TASK &&
                        <TaskList taskList={StorageHelper.getAllTask()}/>}
                    {this.state.activity === ActivityContext.Activity.DETAIL &&
                        <TaskDetail/>}
                    {this.state.activity === ActivityContext.Activity.STATISTICS &&
                        <Statistics/>}
                </Container>
                {this.state.activity === ActivityContext.Activity.TIMER &&
                    <TimerView/>}
                {(this.state.activity === ActivityContext.Activity.TASK ||
                        this.state.activity === ActivityContext.Activity.STATISTICS) &&
                    <BottomNav/>}
                {this.state.showTaskEditor &&
                    <TaskEditor onClose={this.editorClose} activeTaskId={this.state.activeTaskId}/>}
                {this.state.activity === ActivityContext.Activity.TASK &&
                    <Fab color="secondary" aria-label="add" onClick={this.fabClick}
                         sx={{position: 'fixed', bottom: 80, right: 30}}>
                        <AddIcon/>
                    </Fab>}

            </ActivityContext.Provider>
        );
    }
}

export default App;
