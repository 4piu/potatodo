import { Component } from "react";
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { ArrowBack, MoreVert } from "@mui/icons-material";
import ActivityContext from "../Context/ActivityContext";

class Appbar extends Component {
    static contextType = ActivityContext;

    constructor(props) {
        super(props);
        this.state = { anchorEl: null };
    }

    openMenu = (ev) => {
        this.setState({ anchorEl: ev.currentTarget });
    };

    closeMenu = () => {
        this.setState({ anchorEl: null });
    };

    backToTask = () => {
        this.context.setAppState({ activity: ActivityContext.Activity.TASK });
    };

    render() {
        const appState = this.context.getAppState()
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        {appState.activity === ActivityContext.Activity.DETAIL &&
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={this.backToTask}
                            >
                                <ArrowBack />
                            </IconButton>
                        }
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {appState.activity === ActivityContext.Activity.DETAIL ?
                                "Todo edit" : "Potatodo"
                            }

                        </Typography>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={this.openMenu}
                            color="inherit"
                        >
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.closeMenu}
                        >
                            <MenuItem>Foo</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default Appbar;