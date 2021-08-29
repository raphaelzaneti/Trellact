import React from 'react'
import './BoardDetails.css'

export default props =>{

    return(
        <div id="board-details">
            <span type="button" id="board-title">Example Board</span>
            <div id="stars-area">
                <i class="far fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
        </div>
    )
}