import React, { useEffect, useState } from 'react'
import '../../../css/style.css'
import axios from "axios";
//import { useCardName } from '../../../hooks/CardName/CardName'
import { useUser } from '../../../hooks/User/useUser'

export default function CardButtonMembers(props) {

    const [activeMenu, setActiveMenu] = useState(false)
    const [boardMembers, setBoardMembers] = useState([])
    const [updateBoardMembers, setUpdateBoardMembers] = useState(false)

    useEffect(() => setBoardMembers(boardMembers), [updateBoardMembers])

    function getCardMembers() {

        axios.get('http://localhost:3001/user/from-board/all', { params: { board_id: getBoardId(), card_id: props.card_id } })
            .then(res => res.data)
            .then(data => {
                const users = data
                setBoardMembers(users)
            })
    }

    function toggleMembersMenu() {
        setActiveMenu(!activeMenu)
    }

    function getBoardId() {
        const currentURL = window.location.href
        const arrayURL = currentURL.split('/')

        return arrayURL[arrayURL.length - 1]

    }

    function toggleActiveUser(userId, isMember){
        
        axios.post('http://localhost:3001/card/set-member', { params: { card_id: props.card_id, user_id: userId, is_member: isMember } })
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

    useEffect(() => getCardMembers(), [])

    return (
        <div className='card__button-dropdown-menu'>
            <button
                id={'card__button-members' + props.toKey}
                className="btn btn-secondary btn-sm card__button-area-btn"
                onClick={toggleMembersMenu}
            >
                Members
            </button>

            <div id={"card__button-members-dropdown" + props.toKey} className={activeMenu ? "card__button-dropdown" : "card__button-dropdown-closed"}>
                <h4 className='card__button-dropdown--title'>Members</h4>
                <div className='card__button-dropdown--list-area'>
                    <h5 className='card__button-dropdown--subtitle' onClick={() => console.log(boardMembers)}>Board members</h5>
                    <div className='card__button-members-dropdown-members-area'>
                        {boardMembers.length > 0
                            ?
                            boardMembers.map(e => (
                                <div className='card__button-members-dropdown-member' onClick={() => toggleActiveUser(e.user_id, e.is_member)}>
                                    <span className='card__button-members-dropdown-member-initials'>{e.first_name[0]}{e.last_name[0]}</span>
                                    <span className='card__button-members-dropdown-member-name'>{e.first_name} {e.last_name} ({e.login})</span>
                                    {e.is_member ? <span className='card__button-members-dropdown-member-active'>V</span> : ""}
                                </div>
                            ))
                            : 'No members to show'
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}