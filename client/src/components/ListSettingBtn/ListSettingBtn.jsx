import React, { useEffect, useState } from "react"
import axios from "axios"
import DeleteBtn from "../Buttons/DeleteBtn"
import ListModal from "../ListModal/ListModal"
import { useUpdate } from "../../hooks/useUpdate/useUpdate"
import { useCards } from "../../hooks/useCards/useCards"

export default props => {

    const {update, setUpdate} = useUpdate()
    const [showSettings, setShowSettings] = useState(false)
    const [listsPosition, setListsPosition] = useState(null) 
    const {cards, setCards, cardId, setCardId} = useCards()
    
    const listIdNumber = +props.listId.split('-')[1]

    function toggleShowSettings() {
        setShowSettings(!showSettings)
        console.log(showSettings)
    }

    async function createCard(name) {

        axios.post('http://localhost:3001/card/create', { params: { list_id: listIdNumber, card_name: name, created_by: 1 } })
            .then(res => res.data)
            .then(data => console.log({ card_id: data.card_id, card_name: data.card_name }))
        
        await setUpdate(!update)
    }

    function getListPositions(){
        axios.get('http://localhost:3001/lists/positions', {params: {board_id: getBoardId(), list_id: listIdNumber}})
            .then(res => setListsPosition(res.data))
    }

    async function moveList(curPosition, newPosition){
        axios.post('http://localhost:3001/lists/update-positions', {
            data: {
                board_id: getBoardId(), 
                list_id: listIdNumber, 
                total_lists: listsPosition, 
                current_position: curPosition, 
                new_position: +newPosition
            }
        })
            .then(res => {
                console.log(res.data.success)
                if(res.data.success===true){
                    setUpdate(!update)
                }
            })
    }

    function getBoardId(){
        const currentURL = window.location.href
        const arrayURL = currentURL.split('/')

        return arrayURL[arrayURL.length-1]

    }

    async function getCardsByList(){
        const unsortedCards = await axios.get('http://localhost:3001/card/bylist', {params: {list_id: listIdNumber}})
            .then(res => res.data.map(e => {return {caption: e.card_name, card_id: e.card_id}}))
            .then(obj => orderCaptions(obj))


        function orderCaptions(obj){
            const orderedCardsCaption = obj.map(e => e.caption).sort()
            
            let orderedCards = Array(cards.length).fill("")

            obj.map(e =>{
                orderedCardsCaption.map((caption, index) =>{
                    if(e.caption === caption){
                        orderedCards[index] = e
                        orderedCards[index].new_position = index+1
                    }
                })
            })

            axios.post('http://localhost:3001/card/sort', {data:{
                ordered_cards: orderedCards
            }})

        }
        
    }


    useEffect(getListPositions, [])

    return (
        <div className="list__settings">
            <button className="list__settings-call-btn" onClick={toggleShowSettings}><i class="fas fa-ellipsis-h"></i></button>
            <div className={`list__settings-dropdown ${showSettings ? "" : "list__settings-dropdown-dnone"}`}>
                <p className="list__settings-dropdown-title">List Actions</p>
                <ul className="list__settings-list">
                    <li className="list__settings-item">
                        <ListModal
                            type="new-card"
                            caption="New Card"
                            id={props.listId}
                            modalTitle="Create new card"
                            confirmAction="Create card"
                            callback={createCard}
                        />
                    </li>
                    <li className="list__settings-item">
                        <ListModal
                            type="move-list"
                            caption="Move List"
                            id={props.listId}
                            modalTitle="Move List"
                            confirmAction="Move it"
                            listsPosition = {listsPosition}
                            callback={moveList}
                        />
                    </li>
                    <li className="list__settings-item" onClick={getCardsByList}>Order by name</li>
                    <li className="list__settings-item">
                        <DeleteBtn type="list" id={props.listId} onClick={props.deleteCallback} name={props.name} caption="Delete List" />
                    </li>
                </ul>
            </div>


        </div>
    )
}