import React, { useState } from 'react'
import '../../../css/style.css'
//import { useCardName } from '../../../hooks/CardName/CardName'
import { useUser } from '../../../hooks/User/useUser'

export default function CardButtonMembers(props) {

    const { user, setUser, userList, setUserList } = useUser()
  //  const {cardName, setCardName, cardId, setCardId, cardMembers, setCardMembers} = useCardName()    
    
    let users = userList

    function toggleMembersDropdown() {
        const dropdown = document.getElementById('card__button-members-dropdown'+props.toKey)
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none'
        } else {
            dropdown.style.display = 'block'
        }
        setActiveStatus()
    }

    function setActiveStatus(){
        if(users.active ===undefined){
            users[0].active = false
            users[1].active = false
            users[2].active = false
            setCardMembers(users)
        }
    }

    function renderUserList() {
        return (
            <ul className='card__button-members-dropdown--list'>
                {cardMembers===null ? " " : cardMembers.map(e =>
                    <li key={props.toKey+'-members-'+e.id} onClick={() => toggleActiveUser(e.id)} className='card__button-members-dropdown--item'>
                        <span>
                            <img className='img-fluid card__button-members-dropdown--image' src={e.photo} alt="User picture" />
                            {`${e.name} ${e.lastName}`}
                        </span>
                        <span className='card__button-members-dropdown--active'>{e.active ?
                            (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>)
                            : ''}
                        </span>
                        
                    </li>
                )}
            </ul>
        )
    }

    function toggleActiveUser(id){
        setCardMembers(
            cardMembers.map(e => {
                if(e.id === id){
                    return {
                        id: e.id,
                        name: e.name,
                        lastName: e.lastName,
                        photo: e.photo,
                        active: !e.active
                    }
                } else{
                    return e
                }
            })
        )
    }
    
    return (
        <div className='dropdown'>
            <button
                onClick={toggleMembersDropdown}
                id={'card__button-members'+props.toKey}
                className="btn btn-secondary btn-sm card__button-area-btn"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Members
            </button>

            <div id={"card__button-members-dropdown"+props.toKey} className="dropdown-menu card__button-members-dropdown" aria-labelledby={'card__button-members'+props.toKey}>
                <h4 className='card__button-members-dropdown--title'>Members</h4>
                <div className='card__button-members-dropdown--list-area'>
                    <h5 className='card__button-members-dropdown--subtitle'>Board members</h5>
                    {renderUserList()}
                </div>
            </div>

        </div>
    )
}