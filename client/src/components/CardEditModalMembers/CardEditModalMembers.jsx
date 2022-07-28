import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useUpdate } from "../../hooks/useUpdate/useUpdate";

export default props => {
    const [activeMembersEdit, setActiveMembersEdit] = useState(false)
    const [boardMembers, setBoardMembers] = useState(null)
    const [updateBoardMembers, setUpdateBoardMembers] = useState(false)

    useEffect(() => setBoardMembers(boardMembers), [updateBoardMembers])

    function toggleMembersEdit() {
        setActiveMembersEdit(!activeMembersEdit)
        getAllBoardMembers()
    }

    function getBoardId() {
        const currentURL = window.location.href
        const arrayURL = currentURL.split('/')

        return arrayURL[arrayURL.length - 1]

    }

    function getAllBoardMembers() {

        axios.get('http://localhost:3001/user/from-board/all', { params: { board_id: getBoardId() } })
            .then(res => res.data)
            .then(data => {
                const users = data
                users.map(e => e.is_member = false)
                setBoardMembers(users)
                checkActiveUsers(users)
            })
        }
        
        
    async function checkActiveUsers(users){

        await axios.get('http://localhost:3001/user/from-card/all', { params: { card_id: props.cardId } })
            .then(res => res.data)
            .then(data => {
                users.map(e => {
                    data.map(user => user.member_id === e.user_id ? e.is_member = true : null)
                })
                setUpdateBoardMembers(!updateBoardMembers)
            })
    }

    function toggleActiveUser(userId, isMember){
        
        axios.post('http://localhost:3001/card/set-member', { params: { card_id: props.cardId, user_id: userId, is_member: isMember } })
            .then(res => res.data)
            .then(data => {
                let users
                if(data.success){
                    users = boardMembers.map( e =>{
                        if(e.user_id === userId){
                            e.is_member = !e.is_member
                        }

                        return e
                    })

                    setBoardMembers(users)
                    setUpdateBoardMembers(!updateBoardMembers)
                }
            })
    }

    return (
        <>
            <button className="card__edit-modal_settings-btn" onClick={toggleMembersEdit}>Edit members</button>
            <article className={`${activeMembersEdit ? 'd-block' : 'd-none'} card__edit-modal_edit-members`}>
                <div className="card__edit-modal_edit-members-header">
                    <h4>Members</h4>
                    <button onClick={toggleMembersEdit}>X</button>
                </div>
                <div className="card__edit-modal_edit-members-content">
                    <span>Board members</span>
                    <div className="card__edit-modal_edit-members-content-members-area">
                        {boardMembers !== null ?
                            boardMembers.map(e => (
                                <div className="card__edit-modal_edit-members-content-member" onClick={() => toggleActiveUser(e.user_id, e.is_member)} member_id ={e.user_id} >
                                    <span className="card__edit-modal_edit-members-content-initials">{e.first_name[0]}{e.last_name[0]}</span>
                                    <span className="card__edit-modal_edit-members-content-name">{e.first_name} {e.last_name}</span>
                                    {e.is_member ? <span className="card__edit-modal_edit-members-content-active">V</span> : ""}
                                </div>
                            ))
                            :
                            'No members to show'
                        }
                    </div>
                </div>
            </article>
        </>

    )
}