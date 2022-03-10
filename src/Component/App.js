import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { PureComponent } from "react";
import Appbar from "./Appbar";
import BottomNav from "./BottomNav";
import ActivityContext from "../Context/ActivityContext";
import { Container, Fab } from "@mui/material";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";
import Statistics from "./Statistics";
import TimerView from "./TimerView";
import TaskEditor from "./TaskEditor";
import AddIcon from "@mui/icons-material/Add";
import StorageHelper from "../Utility/StorageHelper";
import Prompt from './Prompt';

class App extends PureComponent {
    constructor(props) {
        super(props);

        const unfinishedTimer = StorageHelper.getTimer()
        this.state = {
            activity: unfinishedTimer ? ActivityContext.Activity.TIMER : ActivityContext.Activity.TASK,
            activeTaskId: unfinishedTimer? unfinishedTimer.taskUuid: null,
            showTaskEditor: false,
            showPrompt: false,
            prompt: {
                title: null,
                content: null,
                actions: null
            }
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

    getAppState = () => {
        return this.state;
    }

    setAppState = (newState) => {
        this.setState(newState);
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
        this.setActiveTaskId(null);
    };

    promptClose = () => {
        this.setState({
            showPrompt: false
        });
    };

    render() {
        const isTaskView = this.state.activity === ActivityContext.Activity.TASK,
            isDetailView = this.state.activity === ActivityContext.Activity.DETAIL,
            isStatisticsView = this.state.activity === ActivityContext.Activity.STATISTICS,
            isTimerView = this.state.activity === ActivityContext.Activity.TIMER;

        return (
            <ActivityContext.Provider value={{
                getAppState: this.getAppState,
                setAppState: this.setAppState
            }}>
                <CssBaseline />
                {!isTimerView &&
                    <>
                        <Appbar />
                        <Container maxWidth="lg" sx={{ py: 11 }}>
                            {isTaskView &&
                                <TaskList taskList={StorageHelper.getAllTask()} />}
                            {isStatisticsView &&
                                <Statistics />}
                            {isDetailView &&
                                <TaskDetail />}
                        </Container>
                        {!isDetailView &&
                            <BottomNav />}
                    </>}
                {isTimerView &&
                    <TimerView />}
                {this.state.showTaskEditor &&
                    <TaskEditor onClose={this.editorClose} activeTaskId={this.state.activeTaskId} />}
                {isTaskView &&
                    <Fab color="secondary" aria-label="add" onClick={this.fabClick}
                        sx={{ position: 'fixed', bottom: 80, right: 30 }}>
                        <AddIcon />
                    </Fab>}
                <Prompt
                    open={this.state.showPrompt}
                    onClose={this.promptClose}
                    title={this.state.prompt.title}
                    content={this.state.prompt.content}
                    actions={this.state.prompt.actions}
                />
            </ActivityContext.Provider>
        );
    }
}

export default App;
