import { Players } from "./components/Players";
import { GameBoard } from "./components/GameBoard";
import { Log } from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import { GameOver } from './components/GameOver.jsx'

let initialSelection = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function playerSymbol (turns) {
  let currentPlayer = 'O'
  if (turns.length > 0 && turns[0].player === 'O')  {
    currentPlayer = 'X'
  }
  return currentPlayer
}

function App() {
  const [turns, setTurns] = useState([]);
  const isActivePlayer = playerSymbol(turns)
  const [players, setPlayers] = useState({
    'X': 'Player 2',
    'O': 'Player 1'
  })
  let groupSel = [...initialSelection.map((arr) => [...arr])]
  for (const record of turns) {
      const { square, player } = record
      const { row, col } = square
      groupSel[row][col] = player
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = groupSel[combination[0].row][combination[0].column]
    const secondSquare = groupSel[combination[1].row][combination[1].column]
    const thirdSquare = groupSel[combination[2].row][combination[2].column]
    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = firstSquare
      break
    }    
  }
  let isDraw = turns.length === 9 && !winner

  function setNextPlayer (rowIndex, colIndex) {
    setTurns((previous) => {
      console.log('initial', previous);
      
      let playerSym = playerSymbol(turns)
      const turnsData = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: playerSym
        },
        ...previous
      ]
      console.log('turnsData', turnsData)
      return turnsData
    })
    
  }
  function resetGame() {
    setTurns([])
  }
  function setPlayerNames(symbol, playerName) {
    setPlayers((previous) => {
      return {
        ...previous,
        [symbol]: playerName
      }
    })
    console.log('setPlayerNames', symbol, playerName, 'players', players);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players player='Player 1' symbol='O' getSymbol={setPlayerNames} isActive={isActivePlayer == 'O'}/>
          <Players player='Player 2' symbol='X' getSymbol={setPlayerNames} isActive={isActivePlayer == 'X'}/>
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} reset={resetGame} playersList={players} />}
        <GameBoard playGame={setNextPlayer} turns={groupSel} />
      </div>
      <Log turns={turns}/>
    </main>
  )
}
export default App
