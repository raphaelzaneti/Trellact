import React, {useState, useContext} from 'react'
import '../../css/style.css'
import { useActiveCardInput } from '../../hooks/ActiveCardInput/ActiveCardInput'
import { useCardounter } from '../../hooks/CardCounter/useCardCounter'
import { useCardName } from '../../hooks/CardName/CardName'
import {Card} from '../index'

export default props =>{
    const [newCard, setNewCard] = useState([])
    const {activeInput, setActiveInput} = useActiveCardInput()
    const {cardCounter, setCardCounter} = useCardounter()
    const {cardName, setCardName, cardId, setCardId} = useCardName()
    
    let counter = 0
//    let cardId = 'card-'+cardCounter+'-'+props.listId
    
    function renderNewCard(){
        setNewCard((a)=> [...a, <Card id={cardId} key={cardId} />])
        setCardId(cardId+1)
        setCardCounter(cardCounter+1)
        setActiveInput(true)
    }

    return(
        <>
            {newCard}
            {activeInput 
                ? null
                : <button className='btn list__new-card-button' onClick={()=>renderNewCard()}>+ Add new card</button>           
            }
        </>
    )
}