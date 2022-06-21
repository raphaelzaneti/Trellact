import React from "react"
import { Link } from "react-router-dom"

export default props => {

    let boardTheme = "workspace__card-board-theme-" + props.theme

    return (
        <Link to={props.boardLink ? props.boardLink : '/'} className="workspace__card-board-link">
            <article className={`workspace__card-board ${boardTheme}`}>
                <h4 className="workspace__card-board-title">{props.boardName}</h4>
                {props.isStarred ? <p className="workspace__card-board-workspace"><span>{props.boardWorkspace}</span> <i class="fas fa-star"></i></p> : ""}
            </article>
        </Link>
    )
}