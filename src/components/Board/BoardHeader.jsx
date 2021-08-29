import React from 'react'
import Logo from './Logo'
import './BoardHeader.css'

export default props =>{

    return(
        <div id="header">
            <button id="dots-btn"><i class="fas fa-ellipsis-h"></i></button>
            <button id="home"><i class="fas fa-home"></i></button>
            <button id="boards"><i class="fab fa-trello"></i> Boards</button>
            
            <div id="search">
                <input type="text" />
                <button id="search-btn"><i class="fas fa-search"></i></button>
            </div>
            <Logo />
            <button id="new-board-btn">New Board</button>
        </div>
    )
}