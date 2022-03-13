import {differenceInCalendarDays, format, subDays} from "date-fns";

const summaryTaskHistory = (history) => {
    let totalDuration = 0;
    const monthlyTimes = [];
    const monthlyDuration = [];

    for (let i = 0; i < 31; i++) {
        const dateStr = format(subDays(new Date(), i), 'M-d');
        monthlyTimes[i] = {date: dateStr, times: 0};
        monthlyDuration[i] = {date: dateStr, duration: 0};
    }

    let firstOccurrenceTime = Date.now();
    for (const item of history) {
        firstOccurrenceTime = Math.min(firstOccurrenceTime, item.startTime);
        totalDuration += item.passedWorkDuration || 0;

        const daysDiff = differenceInCalendarDays(new Date(), item.startTime);
        if (daysDiff < 31) {
            monthlyTimes[daysDiff].times++;
            monthlyDuration[daysDiff].duration += item.passedWorkDuration || 0;
        }
    }

    return {
        "totalTimes": history.length,
        "totalDuration": totalDuration,
        "dailyAvg": Math.floor(totalDuration / (differenceInCalendarDays(new Date(), firstOccurrenceTime) || 1)),
        "monthlyDuration": monthlyDuration,
        "monthlyTimes": monthlyTimes
    };
};

const secondsToDigital = (seconds) => {
    const m = Math.ceil(seconds / 60);
    const mm = Math.floor(m % 60);
    const hh = Math.floor(m / 60);
    return `${hh}h${mm}m`;
};

export {summaryTaskHistory, secondsToDigital};