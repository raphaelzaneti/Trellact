import React, { useState } from "react"
import axios from 'axios'

export default props => {

    const [dropdownActive, setDropdownActive] = useState(false)
    const [createBoardInput, setCreateBoardInput] = useState(false)
    const [boardName, setBoardName] = useState(null)
    const [boardBackgroundColor, setBoardBackgroundColor] = useState(null)

    function toggleDropdown() {
        setDropdownActive(!dropdownActive)
        
        if(!dropdownActive){
            setCreateBoardInput(false)
        }
    }

    function createBoard() {
        axios.post("http://localhost:3001/boards/create", {
            data:
                { user_id: 1, board_name: boardName, board_theme: boardBackgroundColor }
        })
    }

    function toggleCreateBoardInput() {
        setCreateBoardInput(!createBoardInput)
    }

    function changeBoardName(e) {
        setBoardName(e.target.value)
    }

    function changeBoardColor(color) {
        setBoardBackgroundColor(color)
    }

    return (
        <>
            <button id="create-btn" className="btn" onClick={toggleDropdown}>Create</button>
            {
                dropdownActive
                    ?

                    <div className="header__create--dropdown">
                        <div className="header__create--dropdown-bg">
                            <span className="header__create--main-title">Create</span>
                            <div className="header__create--content">
                                <div className="header__create--element" onClick={toggleCreateBoardInput}>
                                    <div className="header__create--title-area">
                                        <span><i class="fab fa-trello"></i></span>
                                        <span>New board</span>
                                    </div>
                                    <p>A board has cards ordered in lists. Use it to manage your projects, handle information and organize everything</p>
                                </div>
                                {
                                    createBoardInput
                                        ?
                                        <div className="header__create--input-area">
                                            <p>Board theme</p>
                                            <div className="header__create--input-area-colors">
                                                <span onClick={() => changeBoardColor('red')} className="header__create--input-area-color header__create--input-area-color-red">{boardBackgroundColor === 'red' ? 'X' : ''}</span>
                                                <span onClick={() => changeBoardColor('blue')} className="header__create--input-area-color header__create--input-area-color-blue">{boardBackgroundColor === 'blue' ? 'X' : ''}</span>
                                                <span onClick={() => changeBoardColor('green')} className="header__create--input-area-color header__create--input-area-color-green">{boardBackgroundColor === 'green' ? 'X' : ''}</span>
                                                <span onClick={() => changeBoardColor('yellow')} className="header__create--input-area-color header__create--input-area-color-yellow">{boardBackgroundColor === 'yellow' ? 'X' : ''}</span>
                                                <span onClick={() => changeBoardColor('gray')} className="header__create--input-area-color header__create--input-area-color-gray">{boardBackgroundColor === 'gray' ? 'X' : ''}</span>
                                                <span onClick={() => changeBoardColor('purple')} className="header__create--input-area-color header__create--input-area-color-purple">{boardBackgroundColor === 'purple' ? 'X' : ''}</span>
                                                <span onClick={() => changeBoardColor('black')} className="header__create--input-area-color header__create--input-area-color-black">{boardBackgroundColor === 'black' ? 'X' : ''}</span>
                                                <span onClick={() => changeBoardColor('pink')} className="header__create--input-area-color header__create--input-area-color-pink">{boardBackgroundColor === 'pink' ? 'X' : ''}</span>
                                            </div>
                                            <label htmlFor="header__board-name">Board Title<span>*</span></label>
                                            <input type="text" name="header__board-name" onChange={changeBoardName} />
                                            <button onClick={createBoard}>Create</button>
                                        </div>
                                        : ""
                                }
                                <div className="header__create--element">
                                    <div className="header__create--title-area">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-laptop" viewBox="0 0 16 16">
                                                <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
                                            </svg>
                                        </span>
                                        <span>New Workspace</span>
                                    </div>
                                    <p>A workspace is a boards and users group. Use it to manage your company, your team, your family members or friends</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    : ''
            }
        </>
    )
}