import React, {Fragment, useState} from 'react';
import { Square } from './square';
import { NewGame }  from './newGame';
function DisabledAllButton(){
    for(let i = 1; i<10; i++){
        var elementButton = document.getElementById(i);
        elementButton.disabled = true;
    }
}
function EnabledAllButton(){
    for(let i = 1; i<10; i++){
        var elementButton = document.getElementById(i);
        elementButton.disabled = false;
    }
}
function CalculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if ((squares[a].strValue === "X" ||squares[a].strValue === "O") && squares[a].strValue === squares[b].strValue  && squares[a].strValue === squares[c].strValue ) {
          return squares[a].strValue ;
        }
      }
      return null;
}
export function Board(){
    const [count, setCount] = useState(0);
    const [countPXCount, SetPXCount] = useState(0);
    const [countPOCount, SetPOCount] = useState(0);
    const [countTie, SetCountTie] = useState(0);
    const [squares, setSquare] =useState([
        {strValue : "1", id: 1}, 
        {strValue : "2", id: 2}, 
        {strValue : "3", id: 3}, 
        {strValue : "4", id: 4}, 
        {strValue : "5", id: 5}, 
        {strValue : "6", id: 6}, 
        {strValue : "7", id: 7}, 
        {strValue : "8", id: 8}, 
        {strValue : "9", id: 9},  
    ]);

    const handleNewSquare = (winner) =>{
        setSquare((oldSquare)=> {
             oldSquare = [
                {strValue : "1", id: 1}, 
                {strValue : "2", id: 2}, 
                {strValue : "3", id: 3}, 
                {strValue : "4", id: 4}, 
                {strValue : "5", id: 5}, 
                {strValue : "6", id: 6}, 
                {strValue : "7", id: 7}, 
                {strValue : "8", id: 8}, 
                {strValue : "9", id: 9},  
            ]
            return oldSquare;
        })
        EnabledAllButton();
        handleCount();
        if(winner === "X"){
            handlePointX();
        }else if(winner === "O"){
            handlePointO();
        }
        else{
            handleTie();
        }
    }
    const handlePointX = () => {
        SetPXCount((oldPXCount)=>{
            return oldPXCount + 1;
        })
    }
    const handlePointO = () => {
        SetPOCount((oldPOCount)=>{
            return oldPOCount + 1;
        })
    }
    const handleTie = () => {
        SetCountTie((oldTie) =>{
            return oldTie + 1;
        })
    }
    const handleCount = ()=> {
        setCount((oldCount)=> {
            oldCount = 0;
            return oldCount;
        })
    }
    const handleClick = (str, id) => {
        if(str === "X" || str === "O") return
        var index = id - 1;
        setCount((oldCount) => {
            return oldCount + 1;
        })
        setSquare((oldSquare) => {
            if (oldSquare[index].strValue === "X" ||oldSquare[index].strValue === "O") return;
            oldSquare[index].strValue = (count % 2 === 0) ? "X" : "O";
            return oldSquare;
        })
        
    }

    const square = squares.slice();
    var winner = CalculateWinner(square);
    var element = document.getElementById("newGame");
    let status;
    if(winner === "X" || winner === "O"){
        status = "Winner: "+winner;
        DisabledAllButton();
        element.style ="display:block";
     }
    else{
        var next = (count % 2 === 0) ? "X" : "O";
        
        if(count === 9){
            DisabledAllButton();
            element.style ="display:block";
            status = "It's Tie";
        }
        else{
            status = "Next player: " + next;
        }
    }
    
    return (
        <Fragment>
            <div>
                <div className='status'>{status}</div>
            
                <div className='board-row'>
                    <Square value ={squares[0].strValue} id={square[0].id} onClick={() =>handleClick(squares[0].strValue, squares[0].id)}/>
                    <Square value ={squares[1].strValue} id={square[1].id} onClick={() =>handleClick(squares[1].strValue, squares[1].id)}/>
                    <Square value ={squares[2].strValue} id={square[2].id} onClick={() =>handleClick(squares[2].strValue, squares[2].id)}/>
                </div>
                <div className='board-row'>
                    <Square value ={squares[3].strValue} id={square[3].id} onClick={() =>handleClick(squares[3].strValue, squares[3].id)}/>
                    <Square value ={squares[4].strValue} id={square[4].id} onClick={() =>handleClick(squares[4].strValue, squares[4].id)}/>
                    <Square value ={squares[5].strValue} id={square[5].id} onClick={() =>handleClick(squares[5].strValue, squares[5].id)}/>
                </div>
                <div className='board-row'>
                    <Square value ={squares[6].strValue} id={square[6].id} onClick={() =>handleClick(squares[6].strValue, squares[6].id)}/>
                    <Square value ={squares[7].strValue} id={square[7].id} onClick={() =>handleClick(squares[7].strValue, squares[7].id)}/>
                    <Square value ={squares[8].strValue} id={square[8].id} onClick={() =>handleClick(squares[8].strValue, squares[8].id)}/>
                </div>
                <div className='status'>Player X: {countPXCount}, Player O: {countPOCount}, Tie: {countTie}</div>
                <NewGame value="New Game" onClick ={()=> handleNewSquare(winner)}/>
            </div>
        </Fragment>
    )
}