import React from 'react'
import './Board.css'
import {BoardDetails, BoardHeader, Logo} from '../index'

export default props =>{
    return (
        <div id="board" className='board'>
            <BoardHeader />
            <BoardDetails />
            <div className='board__container'>
                {props.children}
            </div>

        </div>
    )
}