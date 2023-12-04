const path = require('path');
const fs = require('fs');

let calibrationSum = 0

fs.readFileSync(path.resolve(__dirname, 'input', '1.txt'), 'utf8').split('\n').forEach((line) => {
  const numberMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5, 
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'zero': 0
  }


  let firstDigit = line.match(new RegExp(`\\d|${Object.keys(numberMap).join('|')}`))
  let lastDigit  = line.split(new RegExp(`.*(\\d|${Object.keys(numberMap).join('|')})`))[1]

  firstDigit = new String(numberMap[firstDigit] || firstDigit)
  lastDigit  = new String(numberMap[lastDigit]  || lastDigit)

  calibrationSum += parseInt(firstDigit + lastDigit)
})

console.log(calibrationSum)