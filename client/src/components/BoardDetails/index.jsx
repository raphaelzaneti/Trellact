import React, { useState } from 'react'
import '../../css/style.css'
import BoardMembers from '../BoardMembers/BoardMembers'
import BoardNameInput from '../BoardNameInput/BoardNameInput'
import BoardSettingsMenu from '../BoardSettingsMenu/BoardSettingsMenu'
import FavoriteStars from '../FavoriteStars/FavoriteStars'
import ThemeMenu from '../ThemeMenu/ThemeMenu'

export default props => {

    const [showBoardNameInput, setShowBoardNameInput] = useState(false)
    const [boardName, setBoardName] = useState(props.board_name)

    function toggleInputStatus(){
        setShowBoardNameInput(!showBoardNameInput)
    }

    return (
        <div id="board-details" className='board__details'>
            {
                showBoardNameInput ?
                    <BoardNameInput callback={toggleInputStatus} setBoardName={setBoardName} /> :
                    <span type="button" id="board-title" className="board__details-item board__details-title" onClick={toggleInputStatus}>
                        {boardName}
                    </span>
            }
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
            <BoardMembers />
            <span type="button" id="board__details-workspace" className="board__details-item board__details-invite">
                Invite
            </span>
            <ThemeMenu />
            <BoardSettingsMenu />
        </div>
    )
}