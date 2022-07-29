import React, { useEffect, useState } from "react";
import axios from 'axios'

export default props => {

    const [menuActive, setMenuActive] = useState(false)

    function getBoardMembers() {
        const idNumber = getBoardId()

        axios.get("http://localhost:3001/user/from-board/all", {
            params:
                { board_id: idNumber }
        }).then(res => res.data)
            .then(data => console.log(data))
    }

    function getBoardId() {
        const currentURL = window.location.href
        const arrayURL = currentURL.split('/')

        return arrayURL[arrayURL.length - 1]

    }

    function toggleMenu() {
        setMenuActive(!menuActive)
    }


    return (
        <>
            <span type="button" id="board__details-workspace" className="board__details-item board__details-menu-btn" onClick={toggleMenu}>
                Show menu
            </span>
            <nav className={menuActive ? "board__details-menu-open" : "board__details-menu-closed"} >
                <div className="board__details-menu-header">
                    <h4 className="board__details-menu-title">Menu</h4>
                    <button className="board__details-menu-close" onClick={toggleMenu}>X</button>
                </div>
                <div className="board__details-menu-content">
                    <div className="board__details-menu-about">
                        <span className="board__details-menu-about-icon"><i className="fab fa-trello"></i></span>
                        <span className="board__details-menu-about-text">About this board</span>
                        <span className="board__details-menu-about-description">description</span>
                    </div>
                    <div className="board__details-menu-change-theme">
                        <span className="board__details-menu-change-theme-color"></span>
                        <span className="board__details-menu-change-theme-text">Change theme</span>
                    </div>
                    <div className="board__details-menu-log-area">
                        <span>Log......</span>
                    </div>
                </div>
            </nav>
        </>
    )
}