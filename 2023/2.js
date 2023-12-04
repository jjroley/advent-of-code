const path = require('path');
const fs = require('fs');

let idSum = 0
let powerSum = 0

const existingCubes = {
  'red': 12,
  'green': 13,
  'blue': 14,
}

fs.readFileSync(path.resolve(__dirname, 'input', '2.txt'), 'utf8').split('\n').forEach((line) => {
  const [_m, id, gameString] = line.match(/^Game\s(\d+):(.*)/)

  const games = gameString.split(';')

  let isValidGame = true

  const minimumCubes = {
    'red': 0,
    'green': 0,
    'blue': 0,
  }

  for(const game of games) {
    const moves = game.split(',').map((move) => move.trim().split(' '))

    for(const move of moves) {
      minimumCubes[move[1]] = Math.max(minimumCubes[move[1]], parseInt(move[0]))
    }

    if(moves.find((move) => parseInt(move[0]) > existingCubes[move[1]])) {
      isValidGame = false
    }
  }

  powerSum += Object.values(minimumCubes).reduce((a, b) => a * b, 1)

  if(isValidGame) {
    idSum += parseInt(id)
  }
})

console.log(idSum)
console.log(powerSum)