const fs = require('fs');
const path = require('path');

console.time("script")

let partNumberSum = 0

const lines = fs.readFileSync(path.resolve(__dirname, 'input', '3.txt'), 'utf8').split('\n')

const hasAdjacentSymbol = (x, y, grid) => {
  for(let i = -1; i <= 1; i++) {
    for(let j = -1; j <= 1; j++) {
      if(i === 0 && j === 0) continue;
      const cell = grid[y + i]?.[x + j]
      if(!cell) continue;
      if(!/[\.\d]/.test(cell)) return true
    }
  }

  return false
}

for(let y = 0; y < lines.length; y++) {
  let num = ''
  let numHasAdjacentSymbol = false
  for(let x = 0; x < lines[y].length; x++) {
    const cell    = lines[y][x]
    const isDigit = /\d/.test(cell)

    if(!isDigit) {
      if(numHasAdjacentSymbol && num) {
        partNumberSum += parseInt(num)
      }
      numHasAdjacentSymbol = false
      num = ''
    }

    if(cell === '.') continue;

    if(isDigit && !numHasAdjacentSymbol && hasAdjacentSymbol(x, y, lines)) {
      numHasAdjacentSymbol = true
    }

    if(isDigit) {
      num += cell
    }
  }
  
  if(numHasAdjacentSymbol && num) {
    partNumberSum += parseInt(num)
  }
}

console.log(partNumberSum)
console.timeEnd("script")