"use strict";
function calculateExercises(period) {
    // console.log(period);
    var obj = {
        periodLength: 0,
        trainingDays: 0,
        success: false,
        rating: 2,
        ratingDescription: "not too bad but could be better",
        target: 2,
        average: 0
    };
    obj.periodLength = period.length;
    period.forEach(function (value, index) {
        if (value === 0) {
            return;
        }
        obj.trainingDays++;
    });
    var sumOfPeriod = period.reduce(function (a, b) {
        return a + b;
    });
    obj.average = sumOfPeriod / period.length;
    obj.success = obj.average > obj.target;
    obj.rating = Math.ceil(obj.average);
    console.log(obj);
}
var periodLength = process.argv.map(function (period) { return Number(period); }).slice(2);
calculateExercises(periodLength);
// calculateExercises([3, 0, 2, 4.5, 0, 3, 1]);
