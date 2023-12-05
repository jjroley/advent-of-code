const fs = require('fs');
const path = require('path');

console.time("script")

let gearFactorSum = 0

const lines = fs.readFileSync(path.resolve(__dirname, 'input', '3.txt'), 'utf8').split('\n')

const findFullNumber = (i, str) => {
  let start = i, end = i
  while(/\d/.test(str[start])) start--
  while(/\d/.test(str[end]))   end++
  return [str.slice(start + 1, end), start + 1, end]
}

const getAdjacentNumbers = (x, y, grid) => {
  const numbers = []

  for(let i = -1; i <= 1; i++) {
    const numbersInRow = {}
    for(let j = -1; j <= 1; j++) {
      if(i === 0 && j === 0) continue;
      const cell = grid[y + i]?.[x + j]
      if(!cell) continue;
      const nData = findFullNumber(x + j, grid[y + i])
      if(nData[0]) {
        numbersInRow[nData[1]] = nData[0]
      }
    }
    numbers.push(...Object.values(numbersInRow))
  }

  return numbers
}

for(let y = 0; y < lines.length; y++) {
  for(let x = 0; x < lines[y].length; x++) {
    if(lines[y][x] !== '*') continue;
    const adjacentNumbers = getAdjacentNumbers(x, y, lines)
    console.log(adjacentNumbers, x, y)
    if(adjacentNumbers.length !== 2) continue;
    const [num1, num2] = adjacentNumbers
    gearFactorSum += parseInt(num1) * parseInt(num2)
  }
}

console.log(gearFactorSum)
console.timeEnd("script")