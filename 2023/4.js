const fs = require('fs');
const path = require('path');

const lines = fs.readFileSync(path.resolve(__dirname, 'input', '4.txt'), 'utf8').split('\n')

let winningNumberSum = 0

lines.forEach((line) => {
  let [_, winningNumbers, numbers] = line.match(/Card\s+\d+:\s+(.*)\|(.*)/)

  winningNumbers = winningNumbers.trim().split(/\s+/).map((num) => parseInt(num))
  numbers        = numbers.trim().split(/\s+/).map((num) => parseInt(num))

  numbers = numbers.filter((num) => winningNumbers.includes(num))

  if(numbers.length) {
    winningNumberSum += 2 ** (numbers.length - 1)
  }
})

console.log(winningNumberSum)