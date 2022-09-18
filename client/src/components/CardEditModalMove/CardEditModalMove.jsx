import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import '../../css/style.css'
import { useUpdate } from '../../hooks/useUpdate/useUpdate'

export default props => {

    const [moveDropdownActive, setMoveDropdownActive] = useState(false)
    const [allLists, setAllLists] = useState(null)
    const [currentListId, setCurrentListid] = useState(null)
    const [listSelectValue, setListSelectValue] = useState(currentListId)
    const [allPositions, setAllPositions] = useState(null)
    const [cardSelectValue, setCardSelectValue] = useState(1)

    const {update, setUpdate} = useUpdate()
   
    function toggleDropdown() {
        if (props.activeButton !== 'move') {
            getAllLists()
        }
        props.activeButton === 'move' ? props.setActiveButton(null) : props.setActiveButton('move')
    }

    function getAllLists() {

        axios.get('http://localhost:3001/lists/all', { params: { board: getBoardId(), sorted: true } })
            .then(res => res.data)
            .then(data => setAllLists(data))

        handleListChange(currentListId)
    }

    function getListByCard() {
        axios.get('http://localhost:3001/lists/by-card', { params: { card_id: props.cardId } })
            .then(res => res.data)
            .then(data => setCurrentListid(data[0].list_id))
    }

    function handleListChange(e) {
        const listId = e.target === undefined ? e : e.target.value 
        
        setListSelectValue(listId)

        axios.get('http://localhost:3001/card/bylist', { params: { list_id: listId } })
            .then(res => res.data)
            .then(data => setAllPositions(data))
    }

    function handleCardChange(e){
        const cardPosition = e.target === undefined ? e : e.target.value 
        setCardSelectValue(cardPosition)
    }

    async function moveCard(){
        const cardCurrentPosition = await getCardPositionFromDb()
        axios.post('http://localhost:3001/card/move-card', { params: {
            card_id: props.cardId, current_list_id: currentListId, new_list_id: listSelectValue, 
            current_position: cardCurrentPosition, new_position: cardSelectValue
        } })
            .then(res => res.data)
            .then(data => data.success === true ? setUpdate(!update) : null)
        
    }

    async function getCardPositionFromDb(){
        let cardPosition
        await axios.get('http://localhost:3001/card/position-by-id', {params: {card_id: props.cardId}})
            .then(res => res.data)
            .then(data => cardPosition = data.card_position)
        
        return cardPosition
    }

    async function getCurrentPosition(){
        let cardPosition
        await allPositions.map(card => {
            if(card.card_id === props.cardId){
                cardPosition = card.card_position
            }
        })
        return cardPosition
    }

    function getBoardId() {
        const currentURL = window.location.href
        const arrayURL = currentURL.split('/')

        return arrayURL[arrayURL.length - 1]
    }

    useEffect(() => getListByCard(), [])

    return (
        <>
            <button className="card__edit-modal_settings-btn" onClick={toggleDropdown}>Move</button>
            {props.activeButton === 'move'
                ?
                <article className='card__edit-modal_edit-move'>
                    <div className="card__edit-modal_edit-move-header">
                        <h4 >Move card</h4>
                        <button onClick={() => props.setActiveButton(null)}>X</button>
                    </div>
                    <div className="card__edit-modal_edit-move-content">
                        <span>Select destination</span>
                        <select name="destination-list" value={listSelectValue} onChange={(e) => handleListChange(e)}>
                            {
                                allLists !== null
                                    ? allLists.map(list => (
                                        <option key={list.list_id} value={list.list_id}>
                                            {list.list_name} {list.list_id === currentListId ? '(current)' : ''}
                                        </option>
                                    ))
                                    : ""
                            }
                        </select>
                        <select name="destination-position" value={cardSelectValue} onChange={(e) => handleCardChange(e)}>
                            {
                                allPositions !== null
                                    ? allPositions.map(card => (
                                        <option key={card.card_position} value={card.card_position}>
                                            {card.card_position} {card.card_id === props.cardId ? '(current)' : ''}
                                        </option>
                                    ))
                                    : ""
                            }
                            {
                                allPositions === null
                                    ? <option>1</option>
                                    : <> {Number(listSelectValue) === currentListId ? "aaaaaaa" : <option>{allPositions.length + 1}</option>}</>
                            }
                        </select>
                        <button onClick={moveCard} data-bs-dismiss="modal">Move</button>
                    </div>
                </article>
                : ""
            }
        </>
    )
}