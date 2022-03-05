import {Component} from "react";
import {AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {ArrowBack, MoreVert} from "@mui/icons-material";
import ActivityContext from "../Context/ActivityContext";

class Appbar extends Component {
    static contextType = ActivityContext;

    constructor(props) {
        super(props);
        this.state = {anchorEl: null};
    }

    openMenu = (ev) => {
        this.setState({anchorEl: ev.currentTarget});
    };

    closeMenu = () => {
        this.setState({anchorEl: null});
    };

    backToTask = () => {
        this.context.setActivity(ActivityContext.Activity.TASK);
    };

    render() {
        return (
            <Box sx={{flexGrow: 1}}>
                <AppBar position="fixed">
                    <Toolbar>
                        {this.context.activity === ActivityContext.Activity.DETAIL &&
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                                onClick={this.backToTask}
                            >
                                <ArrowBack/>
                            </IconButton>
                        }
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {this.context.activity === ActivityContext.Activity.DETAIL?
                                "Todo edit" : "Potatodo"
                            }

                        </Typography>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={this.openMenu}
                            color="inherit"
                        >
                            <MoreVert/>
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
                <Toolbar/>
            </Box>
        );
    }
}

export default Appbar;