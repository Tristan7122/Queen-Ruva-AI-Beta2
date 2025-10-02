//* CREATED BY ICONIC TECH
const fs = require('fs');

// Function to add a user to the AFK list
const addAfkUser = (userId, time, reason, _dir) => {
    const userExists = _dir.find(user => user.id === userId);
    if (!userExists) {
        const obj = { id: userId, time: time, reason: reason };
        _dir.push(obj);
        fs.writeFileSync('./database/json/@codewaveunit.json', JSON.stringify(_dir, null, 2));
    }
};

// Function to check if a user is in the AFK list
const checkAfkUser = (userId, _dir) => {
    return _dir.some(user => user.id === userId);
};

// Function to get the AFK reason of a user
const getAfkReason = (userId, _dir) => {
    const user = _dir.find(user => user.id === userId);
    return user ? user.reason : null;
};

// Function to get the AFK time of a user
const getAfkTime = (userId, _dir) => {
    const user = _dir.find(user => user.id === userId);
    return user ? user.time : null;
};

// Function to get the AFK ID of a user
const getAfkId = (userId, _dir) => {
    const user = _dir.find(user => user.id === userId);
    return user ? user.id : null;
};

// Function to get the position of a user in the AFK list
const getAfkPosition = (userId, _dir) => {
    return _dir.findIndex(user => user.id === userId);
};

module.exports = {
    addAfkUser,
    checkAfkUser,
    getAfkReason,
    getAfkTime,
    getAfkId,
    getAfkPosition
};
/* we no have time to encrypted our private functioning if there no our official base thank you
.............................................. QUEEN RUVA AI BETA 
/* created by iconic tech Visit our website at
codewave-unit.zone.id */