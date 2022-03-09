import {v1 as uuidv1} from "uuid";
import {TimerMode} from "./Task";

/**
 * @class
 * @constructor
 * @public
 * @property {string} uuid object id
 * @property {TimerMode} timerMode countdown, accumulative, or onetime
 * @property {number} pausedTime timestamp of the last timer pause, null if timer is running
 * @property {number} startTime timestamp of the timer begin time
 * @property {number} plannedWorkDuration (countdown) planned work time
 * @property {number} passedWorkDuration (countdown, accumulative) remaining work time in seconds
 * @property {number} remainingPauseDuration (countdown, accumulative) remaining work time in seconds
 * @property {number} remainingRestDuration (countdown, accumulative) remaining rest time in seconds
 */
class Timer {
    constructor(taskUuid, timerMode, options = {}) {
        this.uuid = uuidv1();
        this.timerMode = timerMode;
        this.pausedTime = options.pausedTime;
        this.startTime = options.startTime || Date.now();
        this.taskUuid = taskUuid;

        switch (timerMode) {
            case TimerMode.COUNT_DOWN: {
                this.plannedWorkDuration = options.plannedWorkDuration || (25 * 60);
                this.passedWorkDuration = options.passedWorkDuration || 0;
                this.remainingPauseDuration = options.remainingPauseDuration || (3 * 60);
                this.remainingRestDuration = options.remainingRestDuration || (5 * 60);
                break;
            }
            case TimerMode.ACCUMULATIVE: {
                this.passedWorkDuration = options.passedWorkDuration || 0;
                this.remainingPauseDuration = options.remainingPauseDuration || (3 * 60);
                this.remainingRestDuration = options.remainingRestDuration || (5 * 60);
                break;
            }
        }
    }
}

export default Timer;