import React from 'react'
import "../assets/css/square.css"
export function NewGame(props){
    return (
        <button id="newGame" onClick={props.onClick}>{props.value}</button>
    )
}