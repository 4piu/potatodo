import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import {PureComponent} from "react";
import Appbar from "./Appbar";
import BottomNav from "./BottomNav";
import ActivityContext from "../Context/ActivityContext";

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activity: ActivityContext.Activity.TODO,
            focusedTodoId: null
        };
    }

    setActivity = (newVal) => {
        this.setState({
            activity: newVal
        })
    }

    setFocusedTodoId = (newVal) => {
        this.setState({
            focusedTodoId: newVal
        })
    }

    render() {

        return (
            <ActivityContext.Provider value={{
                activity: this.state.activity,
                setActivity: this.setActivity,
                focusedTodoId: this.state.focusedTodoId,
                setFocusedTodoId: this.setFocusedTodoId
            }}>
                <CssBaseline/>
                <Appbar/>
                <BottomNav/>
            </ActivityContext.Provider>
        );
    }
}

export default App;
