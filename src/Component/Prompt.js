import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { PureComponent } from "react";

class Prompt extends PureComponent {
    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {this.props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {this.props.actions?.map((item, idx) => (
                        <div key={idx}>
                           {item}
                        </div>
                    ))}
                </DialogActions>
            </Dialog>
        );
    }
}

export default Prompt;