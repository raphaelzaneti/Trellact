import React, { useEffect, useState } from "react";
import CardComment from "../CardComment/CardComment";
import '../../../css/style.css'
import { useUser } from "../../../hooks/User/useUser";
import axios from "axios";


export default function CardActivity(props){

    const [allComments, setAllComments] = useState([])
    const [commentInputActive, setCommentInputActive] = useState(false)
    const [commentText, setCommentText] = useState("")
    const {user, setUser} = useUser()

    function getAllComments(){
        axios.get('http://localhost:3001/comment/from-card/all', {params: {card_id: props.card_id}})
            .then(res => res.data)
            .then(data => setAllComments(data))
    }

    function handleInputChange(e){
        setCommentText(e.target.value)
    }

    function submitComment(){
        axios.post('http://localhost:3001/comment/save', {params: {
            card_id: props.card_id,
            user_id: user.user_id,
            content: commentText
        }})
            .then(res => res.data)
            .then(data => data.sucess!==false ? updateCommentList() : null)

    }

    function updateCommentList(){
        setCommentText('')
        getAllComments()
    }

    if(commentInputActive){
        window.addEventListener('click', function(e){   
            const commentId = ['comment-input', 'comment-input-area', 'comment-input-button'] 
            if (!commentId.includes(e.target.id)){
                setCommentInputActive(false)
            }
          })
    }

    useEffect(() => getAllComments(), [])

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
                        onClick={() => submitComment()}
                        id='comment-input-button'
                    >Save</button>
                </div>
            </div>
            <div className="card__comments">
                {
                    allComments.length > 0 ? 
                        allComments.map(e => 
                            <CardComment 
                                comment_id={e.comment_id} 
                                first_name={e.first_name} 
                                last_name={e.last_name} 
                                text={e.content} 
                                time={e.post_time} 
                            />
                        )
                        : ''
                }
            </div>
        </div>
    )
}