import React from 'react'
import '../../css/style.css'
import {BoardDetails, BoardHeader, Logo} from '../index'

export default props =>{
    return (
        <div id="board" className='board'>
            <BoardDetails board_id={props.board_id} board_name={props.board_name} />
            <div className='board__container'>
                {props.children}
            </div>

        </div>
    )
}