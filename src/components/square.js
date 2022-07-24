import React from "react";
import "../assets/css/square.css"
export function Square(props){
    return  (
        <button className="Square" id={props.id} onClick={props.onClick}>{props.value}</button>
    )


}