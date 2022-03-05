import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import {PureComponent} from "react";
import Appbar from "./Appbar";
import BottomNav from "./BottomNav";
import ActivityContext from "../Context/ActivityContext";
import {Container} from "@mui/material";

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activity: ActivityContext.Activity.TASK
        };
    }

    setActivity = (newVal) => {
        this.setState({
            activity: newVal
        });
    };

    render() {

        return (
            <ActivityContext.Provider value={{
                activity: this.state.activity,
                setActivity: this.setActivity
            }}>
                <CssBaseline/>
                {(this.state.activity !== ActivityContext.Activity.TIMER) &&
                    <Appbar/>}
                <Container maxWidth="lg">

                </Container>
                {(this.state.activity === ActivityContext.Activity.TASK ||
                        this.state.activity === ActivityContext.Activity.STATISTICS) &&
                    <BottomNav/>}
            </ActivityContext.Provider>
        );
    }
}

export default App;
