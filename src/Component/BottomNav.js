import {PureComponent} from "react";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import HistoryIcon from '@mui/icons-material/History';
import ActivityContext from "../Context/ActivityContext";

class BottomNav extends PureComponent {
    constructor(props) {
        super(props);
    }

    static contextType = ActivityContext;

    onTabChange = (ev, newVal) => {
        this.context.setAppState({activity: newVal});
    };

    render() {
        const appState = this.context.getAppState()
        return (
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={appState.activity}
                    onChange={this.onTabChange}
                >
                    <BottomNavigationAction value={ActivityContext.Activity.TASK} label="Todo" icon={<ListIcon/>}/>
                    <BottomNavigationAction value={ActivityContext.Activity.STATISTICS} label="Statistics"
                                            icon={<HistoryIcon/>}/>
                </BottomNavigation>
            </Paper>
        );
    }
}

export default BottomNav;