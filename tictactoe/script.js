const cells = document.querySelectorAll('.cell')
const titleHeader = document.querySelector('#titleHeader')
const xPlayerDisplay = document.querySelector('#xPlayerDisplay')
const oPlayerDisplay = document.querySelector('#oPlayerDisplay')
const restartBtn = document.querySelector('#restartBtn')
const turnMessage = document.querySelector('#turnMessage')

let player = 'X'
let isPauseGame = false
let isGameStart = false

const inputCells = Array(9).fill('')

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => tapCell(cell, index))
})

function tapCell(cell, index) {
  if (cell.textContent == '' && !isPauseGame) {
    isGameStart = true
    updateCell(cell, index)
    if (!checkWinner()) {
      changePlayer()
      randomPick()
    }
  }
}

function updateCell(cell, index) {
  cell.textContent = player
  inputCells[index] = player
  cell.style.color = (player == 'X') ? '#1892EA' : '#A737FF'
  cell.classList.add('animate')
  setTimeout(() => cell.classList.remove('animate'), 300)
}

function changePlayer() {
  player = (player == 'X') ? 'O' : 'X'
  turnMessage.textContent = `Turn: ${player}`
}

function randomPick() {
  isPauseGame = true
  turnMessage.textContent = 'AI is thinking...'

  setTimeout(() => {
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * inputCells.length)
    } while (inputCells[randomIndex] != '')

    updateCell(cells[randomIndex], randomIndex)
    if (!checkWinner()) {
      changePlayer()
      isPauseGame = false
    }
  }, 1000)
}

function checkWinner() {
  for (const [a, b, c] of winConditions) {
    if (inputCells[a] == player &&
        inputCells[b] == player &&
        inputCells[c] == player) {
      declareWinner([a, b, c])
      return true
    }
  }

  if (inputCells.every(cell => cell != '')) {
    declareDraw()
    return true
  }
}

function declareWinner(winningIndices) {
  titleHeader.textContent = `${player} Wins!`
  isPauseGame = true
  winningIndices.forEach(index =>
    cells[index].style.background = '#2A2343'
  )
  restartBtn.style.visibility = 'visible'
  turnMessage.textContent = ''
}

function declareDraw() {
  titleHeader.textContent = 'Draw!'
  isPauseGame = true
  restartBtn.style.visibility = 'visible'
  turnMessage.textContent = ''
}

function choosePlayer(selectedPlayer) {
  if (!isGameStart) {
    player = selectedPlayer
    if (player == 'X') {
      xPlayerDisplay.classList.add('player-active')
      oPlayerDisplay.classList.remove('player-active')
    } else {
      xPlayerDisplay.classList.remove('player-active')
      oPlayerDisplay.classList.add('player-active')
    }
    turnMessage.textContent = `Turn: ${player}`
  }
}

restartBtn.addEventListener('click', () => {
  restartBtn.style.visibility = 'hidden'
  inputCells.fill('')
  cells.forEach(cell => {
    cell.textContent = ''
    cell.style.background = ''
  })
  isPauseGame = false
  isGameStart = false
  titleHeader.textContent = 'Choose'
  turnMessage.textContent = `Turn: ${player}`
})
