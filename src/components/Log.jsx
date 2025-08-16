export function Log ({turns}) {
    console.log('turns', turns);
    
    return (
        <ol id="log">
            {turns.map(turn => <li key={turn.player + turn.square.row + turn.square.col}>{turn.player} Selected{turn.square.row}, {turn.square.col}</li>)}
        </ol>
    )
}