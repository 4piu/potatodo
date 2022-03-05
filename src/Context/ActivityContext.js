import React from "react";

const ActivityContext = React.createContext(null);

ActivityContext.Activity = Object.freeze({
    TASK: Symbol(0),
    STATISTICS: Symbol(1),
    DETAIL: Symbol(2),
    TIMER: Symbol(3)
});

export default ActivityContext;
