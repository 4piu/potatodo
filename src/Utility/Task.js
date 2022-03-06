import {v1 as uuidv1} from 'uuid';

const TimerMode = Object.freeze({
    COUNT_DOWN: 0,
    ACCUMULATIVE: 1,
    ONETIME: 2
});

/**
 * @class
 * @constructor
 * @public
 * @property {string} uuid object id
 * @property {Type} type tomato, target, or habit
 * @property {string} name the name of the task
 * @property {TimerMode} timerMode count down, accumulative, or onetime
 * @property {string} comment user defined comment
 * @property {Array} historyTimer list of timer IDs of the task
 * @property {number} targetDeadline (target) timestamp of the target DDL
 * @property {HabitPeriod} habitPeriod (habit) habit loop period
 * @property {number} quantity (target, habit) task quantity, e.g. 3 hours, 10 pages
 * @property {QuantityUnit} quantityUnit minutes, hours, times, or custom
 * @property {string} customUnit (quantityUnit=custom) user defined quantity unit
 * @property {number} countDown (count down) work time for each timer in minutes. default 25
 * @property {number} restTime (count down, accumulative) rest time after each work in minutes. default 5
 */
class Task {
    static Type = Object.freeze({
        TOMATO: 0,
        TARGET: 1,
        HABIT: 2
    });

    static QuantityUnit = Object.freeze({
        MINUTES: 0,
        HOUR: 1,
        OCCURRENCE: 2,
        CUSTOM: 3
    });

    static HabitPeriod = Object.freeze({
        DAILY: 0,
        WEEKLY: 1,
        MONTHLY: 2
    })

    constructor(name, type, timerMode, options = null) {
        this.uuid = uuidv1();
        this.type = type;
        this.name = name;
        this.timerMode = timerMode;
        this.comment = options.comment;
        this.historyTimer = [];

        switch (type) {
            case Task.Type.TARGET: {
                this.targetDeadline = options.targetDeadline;
                this.quantity = options.quantity;
                this.quantityUnit = options.quantityUnit;
                this.customUnit = options.customUnit;
                break;
            }
            case Task.Type.HABIT: {
                this.habitPeriod = options.habitPeriod;
                this.quantity = options.quantity;
                this.quantityUnit = options.quantityUnit;
                this.customUnit = options.customUnit;
                break;
            }
        }

        switch (timerMode) {
            case TimerMode.COUNT_DOWN: {
                this.countDown = options.countDown || 25;
                this.restTime = options.restTime || 5;
                break;
            }
            case TimerMode.ACCUMULATIVE: {
                this.restTime = options.restTime || 5;
                break;
            }
        }
    }
}

export {TimerMode, Task};