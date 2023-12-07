const schedule = require('node-schedule');

let date = new Date();
date.setMinutes(date.getMinutes() + 1);

schedule.scheduleJob(date, () => {
    console.log(`Print: ${date}`)
});
