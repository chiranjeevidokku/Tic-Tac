export function GameOver({winner, reset, playersList}) {
    return (
        <div id="game-over">
            <h2>Game Over !</h2>
            {winner && <p>{playersList[winner]} Won the macth</p>}
            {!winner && <p>It's a Draw</p>}            
            <button onClick={reset}>Rematch</button>
        </div>
    )
}