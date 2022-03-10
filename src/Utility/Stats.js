const summaryTaskHistory = (history) => {
    let firstOccurrenceTime = Date.now();
    let totalDuration = 0;
    let todayDuration = 0;
    let todayTimes = 0;
    const today = new Date().setHours(0, 0, 0, 0);

    for (const item of history) {
        firstOccurrenceTime = Math.min(firstOccurrenceTime, item.startTime);
        totalDuration += item.passedWorkDuration || 0;
        if (new Date(item.startTime).setHours(0, 0, 0, 0) === today) {
            todayDuration += item.passedWorkDuration || 0;
            todayTimes++;
        }
    }

    return {
        "totalTimes": history.length,
        "totalDuration": totalDuration,
        "dailyAvg": Math.floor(totalDuration / Math.ceil((Date.now() - firstOccurrenceTime) / 3600000 / 24)) || 0,
        "todayTimes": todayTimes,
        "todayDuration": todayDuration
    };
};

const secondsToDigital = (seconds) => {
    const m = Math.ceil(seconds / 60);
    const mm = Math.floor(m % 60);
    const hh = Math.floor(m / 60);
    return `${hh}h${mm}m`
};

export {summaryTaskHistory, secondsToDigital};