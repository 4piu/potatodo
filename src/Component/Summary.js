import {PureComponent} from "react";
import {Box, Card, CardContent, CardHeader, Typography} from "@mui/material";

class Summary extends PureComponent {
    render() {
        return (
            <Card>
                <CardHeader title={this.props.title}/>
                <CardContent>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        textAlign: 'center'
                    }}>
                        {Object.keys(this.props.data).map((k, idx) => (
                            <div key={idx}>
                                <Typography>{k}</Typography>
                                <Typography sx={{
                                    fontSize: {
                                        xs: '24px',
                                        sm: '30px',
                                        md: '40px'
                                    }
                                }}>{this.props.data[k]}</Typography>
                            </div>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        );
    }
}

export default Summary;