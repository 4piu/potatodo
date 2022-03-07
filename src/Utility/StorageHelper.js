import {Task} from "./Task";

class StorageHelper {
    static getAllTask = () => {
        const taskMap = JSON.parse(localStorage.getItem("task")) || {};
        const ret = [];
        for (const [_, v] of Object.entries(taskMap)) {
            ret.push(new Task(v));
        }
        return ret;
    };

    static getTask = (taskId) => {
        const taskMap = JSON.parse(localStorage.getItem("task")) || {};
        const options = taskMap[taskId];
        return options && new Task(options);
    };

    static updateTask = (taskId, options) => {
        const taskMap = JSON.parse(localStorage.getItem("task")) || {};
        taskMap[taskId] = options;
        localStorage.setItem('task', JSON.stringify(taskMap));
    };

    static addTask = (task) => {
        const taskMap = JSON.parse(localStorage.getItem("task")) || {};
        taskMap[task.uuid] = task;
        localStorage.setItem('task', JSON.stringify(taskMap));
    };
}

export default StorageHelper;