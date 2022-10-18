import React from "react";
import '../../../css/style.css'

export default function CardComment(props){

    const date = new Date(props.time)
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}
    const formatedDate = new Intl.DateTimeFormat('en-US', options).format(date)

    return(
        <div className="card__comments-comment">
            <span className='card__comment-initials'>{props.first_name[0]}{props.last_name[0]}</span>
            <h4 className="card__comment-user">{props.first_name} {props.last_name}</h4>
            <span className="card__comment-time">{formatedDate} </span>
            <div className="card__comment-content">
                {props.text}
            </div>
        </div>
    )
}