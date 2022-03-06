import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import {PureComponent} from "react";
import Appbar from "./Appbar";
import BottomNav from "./BottomNav";
import ActivityContext from "../Context/ActivityContext";
import {Container} from "@mui/material";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";
import Statistics from "./Statistics";
import TimerView from "./TimerView";

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activity: ActivityContext.Activity.TASK,
            activeTaskId: null
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
                <Container maxWidth="lg">
                    {this.state.activity === ActivityContext.Activity.TASK &&
                        <TaskList/>}
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
            </ActivityContext.Provider>
        );
    }
}

export default App;
