import {Task} from "./Task";

class StorageHelper {
    static getAllTask = () => {
        const taskMap = JSON.parse(localStorage.getItem("task")) || {};
        const ret = [];
        for (const [_, v] of Object.entries(taskMap)) {
            ret.push(Object.assign(new Task, v));
        }
        return ret;
    };

    static getTask = (taskId) => {
        const taskMap = JSON.parse(localStorage.getItem("task")) || {};
        const task = taskMap[taskId];
        return task && Object.assign(new Task, task);
    };
}

export default StorageHelper;