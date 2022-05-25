import React, {useState, useContext} from 'react'
import '../../css/style.css'
import { useActiveCardInput } from '../../hooks/ActiveCardInput/ActiveCardInput'
import { useCards } from '../../hooks/useCards/useCards'
import CardBody from '../CardBody/CardBody'

export default props =>{
    const {activeInput, setActiveInput} = useActiveCardInput()

    const {cards, setCards, cardId, setCardId} = useCards()
 
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
            {activeInput 
                ? null
                : <button className='btn list__new-card-button' onClick={testNewCard}>+ Add new card</button>           
            }
        </>
    )
}