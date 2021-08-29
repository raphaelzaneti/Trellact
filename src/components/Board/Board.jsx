import React from 'react'
import './Board.css'
import Logo from './Logo'
import BoardDetails from './BoardDetails'
import BoardHeader from './BoardHeader'

export default props =>{
    return (
        <div id="board">
            <BoardHeader />
            <BoardDetails />
            {props.children}

        </div>
    )
}