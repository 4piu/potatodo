import {Task} from "./Task";

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
        StorageHelper.cachedTask[taskId] = options;
        localStorage.setItem('task', JSON.stringify(StorageHelper.cachedTask));
    };

    static addTask = (task) => {
        StorageHelper.cachedTask[task.uuid] = task;
        localStorage.setItem('task', JSON.stringify(StorageHelper.cachedTask));
    };

    static addTimer = (timer) => {
        localStorage.setItem('timer', JSON.stringify(timer));
    }

    static completeTimer = () => {
        const runningTimer = JSON.parse(localStorage.getItem('timer'));
        StorageHelper.cachedTask[runningTimer.taskUuid].historyTimer.push(runningTimer.uuid);
        StorageHelper.cachedHistory[runningTimer.uuid] = runningTimer;
        localStorage.setItem('history', JSON.stringify(StorageHelper.cachedHistory));
        localStorage.setItem('task', JSON.stringify(StorageHelper.cachedTask));
        localStorage.setItem('timer', null);
    }
}

export default StorageHelper;