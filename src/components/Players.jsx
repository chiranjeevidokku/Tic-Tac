import { useState } from "react"

export function Players ({player, symbol, isActive, getSymbol}) {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(player)
    function setInput () {
        setIsEditing((editing) => !editing)
        if (isEditing) {
            getSymbol(symbol, playerName)
        }
    }
    function setName (event) {
        setPlayerName(event.target.value)
        console.log('event', event)
    }
    return (
        <li className={isActive ? 'active' : ''}>
            <span>
                {isEditing ? (<input type='text' required value={playerName} onChange={setName}></input>):
                 (<span className="player-name">{playerName}</span>) }
              
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={setInput}>{isEditing ? 'Save' : 'Edit'}</button>
          </li>
    )
}