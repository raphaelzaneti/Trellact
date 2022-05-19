import React from 'react'
import '../../../css/style.css'
import CardButtonLabel from './CardButtonLabel'
import CardButtonMembers from './CardButtonMembers'

export default function CardButtons(props){
    return(
        <div className="card__button-area">
            <h2 className="card__button-area-title">Add to card</h2>
            <CardButtonMembers toKey={props.toKey} />
            <CardButtonLabel toKey={props.toKey} />
            <button className="btn btn-secondary btn-sm card__button-area-btn">Checklist</button>
            <button className="btn btn-secondary btn-sm card__button-area-btn">Date</button>
            <button className="btn btn-secondary btn-sm card__button-area-btn">Attached</button>
            <button className="btn btn-secondary btn-sm card__button-area-btn">Theme</button>
        </div>
    )
}