import React, { useState } from "react";
import CardComment from "../CardComment/CardComment";
import '../../../css/style.css'
import { useUser } from "../../../hooks/User/useUser";


export default function CardActivity(props){

    const [commentInputActive, setCommentInputActive] = useState(false)
    const [commentText, setCommentText] = useState("")
    const {user, setUser} = useUser()

    function handleInputChange(e){
        setCommentText(e.target.value)
    }

    if(commentInputActive){
        window.addEventListener('click', function(e){   
            const commentId = ['comment-input', 'comment-input-area', 'comment-input-button'] 
            if (!commentId.includes(e.target.id)){
                setCommentInputActive(false)
            }
          })
    }

    return (
        <div className="card__activity">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-columns-reverse card__activity-icon" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5Zm-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z"/>
            </svg>
            <h2 className="card__activity-title">Activity</h2>
            <div className="card__activity-comment-area">
            <span className='card__activity-comment-member'>{user.first_name[0]}{user.last_name[0]}</span>
                <div
                    className={`card__activity-comment-text-area ${commentInputActive ? 'card__activity-comment-text-area-focus' : ''}`}
                    onFocus={() => setCommentInputActive(true)}
                    id='comment-input-area'
                >
                    <textarea 
                        className="card__activity-comment-text" 
                        placeholder="Write a comment" 
                        value={commentText}
                        onChange={(e) => handleInputChange(e)}
                        id='comment-input'
                    />
                    <button 
                        className={`${commentInputActive ? 'card__activity-comment-text-button' : 'd-none'}`}
                        disabled={commentText === '' ? true : false}
                        onClick={() => console.log(user)}
                        id='comment-input-button'
                    >Save</button>
                </div>
            </div>
            <div className="card__comments">
                <CardComment user={user} text="abcd this is a comment" />
                <CardComment user={user} text="bcde this is a comment"/>
            </div>
        </div>
    )
}