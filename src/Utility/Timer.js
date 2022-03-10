import {v1 as uuidv1} from "uuid";
import {TimerMode} from "./Task";

const secondsFormat = (seconds) => {
    let mm = Math.floor(seconds / 60).toString().padStart(2, '0');
    let ss = (seconds % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
};

/**
 * @class
 * @constructor
 * @public
 * @property {string} uuid object id
 * @property {TimerMode} timerMode countdown, accumulative, or onetime
 * @property {number | null} pausedTime timestamp of the last timer pause, null if timer is running
 * @property {number} startTime timestamp of the timer begin time
 * @property {number} plannedWorkDuration (countdown) planned work time
 * @property {number} passedWorkDuration (countdown, accumulative) remaining work time in seconds
 * @property {number} remainingPauseDuration (countdown, accumulative) remaining work time in seconds
 * @property {number} remainingRestDuration (countdown, accumulative) remaining rest time in seconds
 * @property {number} intervalId the id of the interval
 * @property {function} onTick cb each seconds
 * @property {function} onWorkTimeEnd cb on work duration completed
 * @property {function} onPauseTimeEnd cb on pause time ended
 * @property {function} onRestTimeEnd cb on rest time ended
 */
class Timer {
    static State = Object.freeze({
        RUNNING: 1,
        PAUSED: 2,
        RESTING: 3,
        FINISHED: 4
    });

    constructor(taskUuid, timerMode, options = {}) {
        this.uuid = options.uuid || uuidv1();
        this.state = options.state || Timer.State.RUNNING;
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

    tick = () => {
        switch (this.state) {
            case Timer.State.PAUSED: {
                this.remainingPauseDuration--;
                if (this.remainingPauseDuration <= 0) {
                    this.pausedTime = null;
                    this.state = Timer.State.RUNNING;
                    this.onPauseTimeEnd?.();
                }
                break;
            }
            case Timer.State.RESTING: {
                this.remainingRestDuration--;
                if (this.remainingRestDuration <= 0) {
                    clearInterval(this.intervalId);
                    this.state = Timer.State.FINISHED;
                    this.onRestTimeEnd?.();
                }
                break;
            }
            case Timer.State.RUNNING: {
                this.passedWorkDuration++;
                if (this.timerMode === TimerMode.COUNT_DOWN && this.passedWorkDuration >= this.plannedWorkDuration) {
                    this.state = Timer.State.RESTING;
                    this.onWorkTimeEnd?.();
                }
            }
        }
        this.onTick?.();
    };

    getWorkTimeText = () => {
        switch (this.timerMode) {
            case TimerMode.COUNT_DOWN: {
                return secondsFormat(this.plannedWorkDuration - this.passedWorkDuration);
            }
            case TimerMode.ACCUMULATIVE: {
                return secondsFormat(this.passedWorkDuration);
            }
            default:
                return "";
        }
    };

    getPauseTimeText = () => {
        return secondsFormat(this.remainingPauseDuration);
    };

    getRestTimeText = () => {
        return secondsFormat(this.remainingRestDuration);
    };

    getProgress = () => {
        if (this.timerMode !== TimerMode.COUNT_DOWN) return 0;
        return this.passedWorkDuration / this.plannedWorkDuration * 100;
    };

    restore = () => {
        if (!this.intervalId) {
            this.intervalId = setInterval(this.tick, 1000);
        }
    };

    pause = () => {
        this.pausedTime = Date.now();
        this.state = Timer.State.PAUSED;
    };

    resume = () => {
        if (this.state === Timer.State.PAUSED) {
            this.state = Timer.State.RUNNING;
        }
    };

    restNow = () => {
        this.state = Timer.State.RESTING;
    };

    isOutdated = () => {
        if (this.timerMode !== TimerMode.COUNT_DOWN) return false;
        return Date.now() - this.startTime > 1000 * this.plannedWorkDuration ||
            this.state === Timer.State.PAUSED && Date.now() - this.pausedTime < this.remainingPauseDuration;
    };

    canPause = () => {
        return this.remainingPauseDuration > 0;
    };

    stop = () => {
        clearInterval(this.intervalId);
        delete this.intervalId
    };
}

export default Timer;