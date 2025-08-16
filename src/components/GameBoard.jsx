export function GameBoard ({playGame, turns}) {
    return (
        <ol id='game-board'>
            {turns.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSel, selIndex) => (
                            <li key={selIndex}>
                                <button onClick={() => playGame(rowIndex, selIndex)} 
                                    disabled={playerSel !== null}>
                                    {playerSel}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}