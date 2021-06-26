function calculateBmi(height: number, weight: number): string {
  height = Math.pow(height / 100, 2)

  // console.log(`height`, height)
  // console.log(`weight`, weight)
  const bmi: number = weight / height

  // const bmi: number = weight / height 

  // switch(bmi)
  // console.log(`bmi`, bmi)

  if (bmi < 15) {
    return 'Very severely underweight'
  } else if (bmi < 16) {
    return 'Severely underweight'
  } else if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi < 25) {
    return 'Normal (healthy weight)'
  } else if (bmi < 30) {
    return 'Overweight'
  } else if (bmi < 35) {
    return 'Obese Class I (Moderately obese)'
  } else if (bmi < 40) {
    return 'Obese Class II (Severely obese)'
  } else {
    return 'Obese Class III (Very severely obese)'
  }
  
  // console.log(`height`, height)
  // console.log(`weight`, weight)

  // return "not in range in BMI"
}

// console.log(process.argv[2], process.argv[3]);
// console.log(calculateBmi(143, 40));
// console.log(calculateBmi(process.argv[2], process.argv[3]));

const one: number = Number(process.argv[2])
const two: number = Number(process.argv[3])

console.log(calculateBmi(one, two))
