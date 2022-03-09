import { Box, CircularProgress, Typography } from "@mui/material";
import { PureComponent } from "react";

class Countdown extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" {...this.props} size={''} sx={{
                    width: {
                        xs: 300,
                        md: 500
                    }
                }}/>
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography component="div" color="text.secondary">
                        {this.props.text}
                    </Typography>
                </Box>
            </Box>
        )
    }
}

export default Countdown;