import React from 'react'
import './BoardDetails.css'

export default props =>{

    return(
        <div id="board-details" className='board__details'>
            <span type="button" id="board-title" className="board__details-item board__details-title">
                Example Board
            </span>
            <div id="stars-area" className="board__details-item board__details-stars-area">
                <i class="far fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <div className='board__details-item board__details-separator'>
                |
            </div>
            <span type="button" id="board__details-workspace" className="board__details-item board__details-workspace">
                Workspace X
            </span>
            <div className='board__details-item board__details-separator'>
                |
            </div>
            <span type="button" id="board__details-workspace" className="board__details-item board__details-access">
                Public/private
            </span>
            <div className='board__details-item board__details-separator'>
                |
            </div>
            <span type="button" id="board__details-workspace" className="board__details-item board__details-users">
                Users pictures
            </span>
            <span type="button" id="board__details-workspace" className="board__details-item board__details-invite">
                Invite
            </span>
            <span type="button" id="board__details-workspace" className="board__details-item board__details-menu">
                Show menu
            </span>
        </div>
    )
}