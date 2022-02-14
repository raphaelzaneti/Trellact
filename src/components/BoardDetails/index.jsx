import React from 'react'
import '../../css/style.css'
import FavoriteStars from '../FavoriteStars/FavoriteStars'
import ThemeMenu from '../ThemeMenu/ThemeMenu'

export default props =>{

    return(
        <div id="board-details" className='board__details'>
            <span type="button" id="board-title" className="board__details-item board__details-title">
                Example Board
            </span>
            <FavoriteStars />
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
            <ThemeMenu />
            <span type="button" id="board__details-workspace" className="board__details-item board__details-menu">
                Show menu
            </span>
        </div>
    )
}