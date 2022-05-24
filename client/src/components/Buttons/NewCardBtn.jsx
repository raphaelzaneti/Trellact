import axios from 'axios'
import React, {useState, useContext} from 'react'
import '../../css/style.css'
import { useActiveCardInput } from '../../hooks/ActiveCardInput/ActiveCardInput'
import { useCardounter } from '../../hooks/CardCounter/useCardCounter'
import { useCardName } from '../../hooks/CardName/CardName'
import { useCards } from '../../hooks/useCards/useCards'
import CardBody from '../CardBody/CardBody'
import {Card} from '../index'

export default props =>{
    const [newCard, setNewCard] = useState([])
    const {activeInput, setActiveInput} = useActiveCardInput()
    const {cardCounter, setCardCounter} = useCardounter()

    const {cards, setCards, cardId, setCardId} = useCards()
    
    let counter = 0
//    let cardId = 'card-'+cardCounter+'-'+props.listId
    
    function renderNewCard(){
        setNewCard((a)=> [...a, <Card id={cardId} listId={props.listId} key={cardId} />])
        setCardId(cardId+1)
        setCardCounter(cardCounter+1)
        setActiveInput(true)
    }

    function testNewCard(){
        setCards((a) => [...a, <CardBody 
            listId={props.listId} 
            key={'card-temporary'} 
            cardId="temporary" 
            activeInput={true}
        />])
    }


    return(
        <>
            {newCard}
            {activeInput 
                ? null
                : <button className='btn list__new-card-button' onClick={testNewCard}>+ Add new card</button>           
            }
        </>
    )
}