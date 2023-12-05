const fs = require('fs');
const path = require('path');

const lines = fs.readFileSync(path.resolve(__dirname, 'input', '4.txt'), 'utf8').split('\n')

let cardCount = 0

const cardCache = {}
const processCount = []

const getWinningNumberCount = (line) => {
  if(cardCache[line]) return cardCache[line]

  let [_, winningNumbers, numbers] = line.match(/Card\s+\d+:\s+(.*)\|(.*)/)

  winningNumbers = winningNumbers.trim().split(/\s+/).map((num) => parseInt(num))
  numbers        = numbers.trim().split(/\s+/).map((num) => parseInt(num))

  numbers = numbers.filter((num) => winningNumbers.includes(num))

  cardCache[line] = numbers.length

  return numbers.length
}

const processCard = (index) => {
  const line = lines[index]
  const winCount = getWinningNumberCount(line)

  // console.log('Processing card', index + 1, 'Made copies of ' + (index + 2) + ' - ' + (index + winCount + 1))

  for(var i = 1; i <= winCount; i++) {
    let cardIndex = index + i
    if(cardIndex >= lines.length) {
      break;
    }
    processCount[cardIndex] = (processCount[cardIndex] || 0) + 1
  }

  cardCount++
}

for(let i = 0; i < lines.length; i++) {
  processCard(i)
  while(processCount[i]) {
    processCount[i]--
    processCard(i)
  }
}

console.log(cardCount)