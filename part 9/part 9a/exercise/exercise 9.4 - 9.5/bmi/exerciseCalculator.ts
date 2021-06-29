function calculateExercises(period: number[]) {
  // console.log(period);
  
  const obj = {
    periodLength: 0,
    trainingDays: 0,
    success: false,
    rating: 2,
    ratingDescription: "not too bad but could be better",
    target: 2,
    average: 0,
  };

  obj.periodLength = period.length;
  period.forEach((value: number, index: number) => {
    if (value === 0) {
      return;
    }

    obj.trainingDays++;
  });

  const sumOfPeriod = period.reduce((a, b) => {
    return a + b;
  });

  obj.average = sumOfPeriod / period.length;
  obj.success = obj.average > obj.target;
  obj.rating = Math.ceil(obj.average)

  console.log(obj);
}

const periodLength = process.argv.map(period => Number(period)).slice(2)
calculateExercises(periodLength)
// calculateExercises([3, 0, 2, 4.5, 0, 3, 1]);
