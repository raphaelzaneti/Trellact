import React, { useEffect, useState } from 'react'
import '../../css/style.css'
import {BoardDetails, BoardHeader, Logo} from '../index'
import axios from 'axios'
import { useBoardTags } from '../../hooks/useBoardTags/useBoardTags'


export default props =>{

    const {boardTags, setBoardTags} = useBoardTags()

    function getTagsFromBoard(){
        axios.get("http://localhost:3001/tags/from-board/all", {
            params:
                { board_id: props.board_id}
        }).then(res => res.data)
        .then(data => setBoardTags(data))
    }

    useEffect(() => getTagsFromBoard(), [])

    return (
        <div id="board" className='board'>
            <BoardDetails board_id={props.board_id} board_name={props.board_name} />
            <div className='board__container'>
                {props.children}
            </div>

        </div>
    )
}