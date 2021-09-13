import React from 'react'
import './Board.css'
import {BoardDetails, BoardHeader, Logo} from '../index'

export default props =>{
    return (
        <div id="board">
            <BoardHeader />
            <BoardDetails />
            {props.children}

        </div>
    )
}