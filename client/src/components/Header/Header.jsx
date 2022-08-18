import React from 'react'
import { Link } from "react-router-dom"
import { Logo } from '../index.js'
import '../../css/style.css'
import HeaderNewBoardBtn from '../HeaderNewBoardBtn/HeaderNewBoardBtn.jsx'

export default props => {

    return (
        <div id="header" className="header">
            <div className="header__intial-half">
                <button id="dots-btn" className="btn"><i className="fas fa-ellipsis-h"></i></button>
                <Link to="/">
                    <button id="home" className="btn"><i className="fas fa-home"></i></button>
                </Link>
                <button id="boards" className="btn"><i className="fab fa-trello"></i> <span>Boards</span></button>

                <div id="search" className="header__search-area">
                    <input type="text" className="header__search-input" />
                    <button id="search-btn" className="btn header__search-btn"><i class="fas fa-search"></i></button>
                </div>
            </div>

            <div className="header__logo-area">
                <Logo />
            </div>
            <div class="header__final-half">
                <HeaderNewBoardBtn />
            </div>
        </div>
    )
}