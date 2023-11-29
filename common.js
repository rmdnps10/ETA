// 현재 년월일에서 일을 +- 일 한 결과 리턴.
Date.prototype.addDays = function (days) {
    var date = this;
    return new Date(date.setDate(date.getDate() + days));
};

// 현재 년월일에서 월을 +- 월 한 결과 리턴.
Date.prototype.addMonth = function (month) {
    var date = this;
    return new Date(date.setMonth(date.getMonth() + month));
};

// 현재 년월일에서 년을 +- 월 한 결과 리턴.
Date.prototype.addYear = function (year) {
    var date = this;
    return new Date(date.setFullYear(date.getFullYear() + year));
};
