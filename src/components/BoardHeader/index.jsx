import React from 'react'
import {Logo} from '../index.js'
import './BoardHeader.css'

export default props =>{

    return(
        <div id="header">
            <div class="intial-half-header">
                <button id="dots-btn"><i class="fas fa-ellipsis-h"></i></button>
                <button id="home"><i class="fas fa-home"></i></button>
                <button id="boards"><i class="fab fa-trello"></i> <span>Boards</span></button>
            </div>
            
            <div id="search">
                <input type="text" />
                <button id="search-btn"><i class="fas fa-search"></i></button>
            </div>
            <div className="logo-area">
                <Logo />
            </div>
            <div class="final-half-header">
                <button id="new-board-btn">New Board</button>
            </div>
        </div>
    )
}