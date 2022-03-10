import {Task} from "./Task";
import Timer from "./Timer";

class StorageHelper {
    static cachedTask = JSON.parse(localStorage.getItem('task')) || {};
    static cachedHistory = JSON.parse(localStorage.getItem('history')) || {};

    static getAllTask = () => {
        const ret = [];
        for (const [_, v] of Object.entries(StorageHelper.cachedTask)) {
            ret.push(new Task(v));
        }
        return ret;
    };

    static getTask = (taskId) => {
        const options = StorageHelper.cachedTask[taskId];
        return options && new Task(options);
    };

    static updateTask = (taskId, options) => {
        StorageHelper.cachedTask[taskId] = {uuid: taskId, ...options};
        localStorage.setItem('task', JSON.stringify(StorageHelper.cachedTask));
    };

    static addTask = (task) => {
        StorageHelper.cachedTask[task.uuid] = task;
        localStorage.setItem('task', JSON.stringify(StorageHelper.cachedTask));
    };

    static setTimer = (timer) => {
        localStorage.setItem('timer', JSON.stringify(timer));
    };

    static getTimer = () => {
        const timer = JSON.parse(localStorage.getItem('timer'));
        return timer ? new Timer(timer.taskUuid, timer.timerMode, timer) : null;
    };

    static completeTimer = () => {
        const runningTimer = JSON.parse(localStorage.getItem('timer'));
        const record = {
            uuid: runningTimer.uuid,
            taskUuid: runningTimer.taskUuid,
            timerMode: runningTimer.timerMode,
            startTime: runningTimer.startTime,
            passedWorkDuration: runningTimer.passedWorkDuration
        };
        StorageHelper.cachedTask[record.taskUuid].historyTimer.push(record.uuid);
        StorageHelper.cachedHistory[record.uuid] = record;
        localStorage.setItem('history', JSON.stringify(StorageHelper.cachedHistory));
        localStorage.setItem('task', JSON.stringify(StorageHelper.cachedTask));
        localStorage.setItem('timer', null);
    };

    static deleteTask = (taskId) => {
        for (const [k, v] of Object.entries(StorageHelper.cachedHistory)) {
            if (v.taskUuid === taskId) delete StorageHelper.cachedHistory[k];
        }
        delete StorageHelper.cachedTask[taskId];
        localStorage.setItem('history', JSON.stringify(StorageHelper.cachedHistory));
        localStorage.setItem('task', JSON.stringify(StorageHelper.cachedTask));
    };

    static deleteTimer = () => {
        localStorage.setItem('timer', null);
    };
}

export default StorageHelper;