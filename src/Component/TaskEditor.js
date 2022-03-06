import {PureComponent} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField
} from "@mui/material";
import StorageHelper from "../Utility/StorageHelper";
import {Task, TimerMode} from "../Utility/Task";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

class TaskEditor extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            taskComment: "",
            taskType: Task.Type.TOMATO,
            taskMode: TimerMode.COUNT_DOWN,
            taskTargetDeadline: Date.now() + 24 * 3600 * 1000,
            taskHabitPeriod: Task.HabitPeriod.DAILY,
            taskQuantity: 25,
            taskQuantityUnit: Task.QuantityUnit.MINUTES,
            taskCustomUnit: "",
            taskCountDown: 25,
            taskRestTime: 5
        };
    }

    componentDidMount() {
        if (this.props.activeTaskId) {
            const activeTask = StorageHelper.getTask(this.props.activeTaskId);
            this.setState({
                taskName: activeTask.name,
                taskComment: activeTask.comment,
                taskType: activeTask.taskType,
                taskMode: activeTask.timerMode,
                taskTargetDeadline: activeTask.targetDeadline,
                taskHabitPeriod: activeTask.habitPeriod,
                taskQuantity: activeTask.quantity,
                taskQuantityUnit: activeTask.quantityUnit,
                taskCustomUnit: activeTask.customUnit,
                taskCountDown: activeTask.countDown,
                taskRestTime: activeTask.restTime
            });
        }
    }

    onNameChange = (ev) => {
        this.setState({
            taskName: ev.target.value
        });
    };

    onCommentChange = (ev) => {
        this.setState({
            taskComment: ev.target.value
        });
    };

    onTypeChange = (ev) => {
        this.setState({
            taskType: parseInt(ev.target.value)
        });
    };

    onModeChange = (ev) => {
        this.setState({
            taskMode: parseInt(ev.target.value)
        });
    };

    onTargetDeadlineChange = (newVal) => {
        this.setState({
            taskTargetDeadline: newVal.getTime()
        });
    };

    onHabitPeriodChange = (ev) => {
        this.setState({
            taskHabitPeriod: parseInt(ev.target.value)
        });
    };

    onQuantityChange = (ev) => {
        this.setState({
            taskQuantity: parseInt(ev.target.value) || 0
        });
    };

    onQuantityUnitChange = (ev) => {
        this.setState({
            taskQuantityUnit: parseInt(ev.target.value)
        });
    };

    onCountDownChange = (ev) => {
        this.setState({
            taskCountDown: parseInt(ev.target.value) || 0
        });
    };

    onRestTimeChange = (ev) => {
        this.setState({
            taskRestTime: parseInt(ev.target.value) || 0
        });
    };

    saveTask = () => {
        if (this.props.activeTaskId) {
            // todo save edit
        } else {
            // todo save new object
        }
        this.props.onClose();
    };

    render() {
        const Validator = {
            "name": () => this.state.taskName,
            "quantity": () => this.state.taskType === Task.Type.TOMATO || this.state.taskQuantity > 0,
            "countDown": () => this.state.taskMode !== TimerMode.COUNT_DOWN || this.state.taskCountDown > 0,
            "restTime": () => this.state.taskMode !== TimerMode.ONETIME || this.state.taskRestTime > 0
        };
        const error = {};
        for (const [k, v] of Object.entries(Validator)) {
            error[k] = !v();
        }

        return (<Dialog
                open={true}
                onClose={this.props.onClose}>
                <DialogTitle>{this.props.activeTaskId ? "Edit" : "Create new todo"}</DialogTitle>
                <DialogContent>
                    <Box component="form" autoComplete="off" noValidate>
                        <TextField fullWidth variant="standard" error={error.name} label="Name" sx={{my: 1}}
                                   value={this.state.taskName} onChange={this.onNameChange} required/>
                        <TextField fullWidth variant="standard" label="Description" sx={{my: 1}}
                                   value={this.state.taskComment} onChange={this.onCommentChange} multiline/>
                        <FormControl fullWidth>
                            <FormLabel id="form-task-type">Type</FormLabel>
                            <RadioGroup row aria-labelledby="form-task-type" value={this.state.taskType}
                                        onChange={this.onTypeChange}>
                                <FormControlLabel value={Task.Type.TOMATO} control={<Radio/>} label="Tomato"/>
                                <FormControlLabel value={Task.Type.TARGET} control={<Radio/>} label="Target"/>
                                <FormControlLabel value={Task.Type.HABIT} control={<Radio/>} label="Habit"/>
                            </RadioGroup>
                        </FormControl>
                        {this.state.taskType === Task.Type.TARGET && <LocalizationProvider dateAdapter={DateAdapter}>
                            <MobileDatePicker
                                label="Deadline"
                                inputFormat="MM/dd/yyyy"
                                value={new Date(this.state.taskTargetDeadline)}
                                onChange={this.onTargetDeadlineChange}
                                minDate={Date.now() + 24 * 3600 * 1000}
                                renderInput={(params) => <TextField {...params} sx={{my: 1}} fullWidth
                                                                    variant="standard"/>}
                            />
                        </LocalizationProvider>}
                        {this.state.taskType === Task.Type.HABIT &&
                            <FormControl variant="standard" fullWidth sx={{my: 1}}>
                                <InputLabel id="form-label-habit-period">Period</InputLabel>
                                <Select
                                    labelId="form-label-habit-period"
                                    value={this.state.taskHabitPeriod}
                                    onChange={this.onHabitPeriodChange}
                                >
                                    <MenuItem value={Task.HabitPeriod.DAILY}>Daily</MenuItem>
                                    <MenuItem value={Task.HabitPeriod.WEEKLY}>Weekly</MenuItem>
                                    <MenuItem value={Task.HabitPeriod.MONTHLY}>Monthly</MenuItem>
                                </Select>
                            </FormControl>}
                        {[Task.Type.TARGET, Task.Type.HABIT].includes(this.state.taskType) && <>
                            <TextField variant="standard" label="Quantity" sx={{my: 1}}
                                       InputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                       error={error.quantity}
                                       value={this.state.taskQuantity} onChange={this.onQuantityChange} required/>
                            <FormControl variant="standard" sx={{my: 1}}>
                                <InputLabel id="form-label-quantity-unit">Unit</InputLabel>
                                <Select
                                    labelId="form-label-quantity-unit"
                                    value={this.state.taskQuantityUnit}
                                    onChange={this.onQuantityUnitChange}
                                >
                                    <MenuItem value={Task.QuantityUnit.MINUTES}>Minutes</MenuItem>
                                    <MenuItem value={Task.QuantityUnit.HOUR}>Hours</MenuItem>
                                    <MenuItem value={Task.QuantityUnit.OCCURRENCE}>Times</MenuItem>
                                </Select>
                            </FormControl>
                        </>}
                        <FormControl fullWidth>
                            <FormLabel id="form-task-mode">Mode</FormLabel>
                            <RadioGroup row aria-labelledby="form-task-mode" value={this.state.taskMode}
                                        onChange={this.onModeChange}>
                                <FormControlLabel value={TimerMode.COUNT_DOWN} control={<Radio/>} label="Count down"/>
                                <FormControlLabel value={TimerMode.ACCUMULATIVE} control={<Radio/>}
                                                  label="Accumulative"/>
                                <FormControlLabel value={TimerMode.ONETIME} control={<Radio/>} label="One time"/>
                            </RadioGroup>
                        </FormControl>
                        {this.state.taskMode === TimerMode.COUNT_DOWN &&
                            <TextField variant="standard" label="Work time" sx={{my: 1}}
                                       InputProps={{
                                           inputMode: 'numeric',
                                           pattern: '[0-9]*',
                                           endAdornment: <InputAdornment position="end">minutes</InputAdornment>
                                       }}
                                       error={error.countDown}
                                       value={this.state.taskCountDown} onChange={this.onCountDownChange} required/>

                        }
                        {this.state.taskMode !== TimerMode.ONETIME &&
                            <TextField variant="standard" label="Rest time" sx={{my: 1}}
                                       InputProps={{
                                           inputMode: 'numeric',
                                           pattern: '[0-9]*',
                                           endAdornment: <InputAdornment position="end">minutes</InputAdornment>
                                       }}
                                       error={error.restTime}
                                       value={this.state.taskRestTime} onChange={this.onRestTimeChange} required/>

                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}>Cancel</Button>
                    <Button onClick={this.saveTask} variant={"contained"}
                            disabled={Object.values(error).indexOf(true) > -1}>Save</Button>
                </DialogActions>
            </Dialog>);
    }
}

export default TaskEditor;