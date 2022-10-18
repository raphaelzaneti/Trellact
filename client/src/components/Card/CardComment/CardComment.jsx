import React from "react";
import '../../../css/style.css'

export default function CardComment(props){
    return(
        <div className="card__comments-comment">
            <span className='card__comment-initials'>{props.user.first_name[0]}{props.user.last_name[0]}</span>
            <h4 className="card__comment-user">{props.user.first_name} {props.user.last_name}</h4>
            <span className="card__comment-time">14:15 </span>
            <div className="card__comment-content">
                {props.text}
            </div>
        </div>
    )
}