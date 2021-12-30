import React from 'react'
import './CardButtons.css'

export default function CardButtons(props){
    return(
        <div className="card__button-area">
            <h2 className="card__button-area-title">Add to card</h2>
            <button className="btn btn-secondary btn-sm card__button-area-btn">Members</button>
            <button className="btn btn-secondary btn-sm card__button-area-btn">Labels</button>
            <button className="btn btn-secondary btn-sm card__button-area-btn">Checklist</button>
            <button className="btn btn-secondary btn-sm card__button-area-btn">Date</button>
            <button className="btn btn-secondary btn-sm card__button-area-btn">Attached</button>
            <button className="btn btn-secondary btn-sm card__button-area-btn">Theme</button>
        </div>
    )
}