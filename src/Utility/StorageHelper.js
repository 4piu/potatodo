import {Task} from "./Task";

class StorageHelper {
    static cacheAllTask = null;

    static getAllTask = () => {
        StorageHelper.cacheAllTask = StorageHelper.cacheAllTask || JSON.parse(localStorage.getItem("task")) || {};
        const ret = [];
        for (const [_, v] of Object.entries(StorageHelper.cacheAllTask)) {
            ret.push(new Task(v));
        }
        return ret;
    };

    static getTask = (taskId) => {
        StorageHelper.cacheAllTask = StorageHelper.cacheAllTask || JSON.parse(localStorage.getItem("task")) || {};
        const options = StorageHelper.cacheAllTask[taskId];
        return options && new Task(options);
    };

    static updateTask = (taskId, options) => {
        StorageHelper.cacheAllTask[taskId] = options;
        localStorage.setItem('task', JSON.stringify(StorageHelper.cacheAllTask));
    };

    static addTask = (task) => {
        StorageHelper.cacheAllTask[task.uuid] = task;
        localStorage.setItem('task', JSON.stringify(StorageHelper.cacheAllTask));
    };
}

export default StorageHelper;