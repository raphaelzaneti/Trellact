import React, {useState} from 'react'
import {Card} from '../index'


export default props =>{
    const [newCard, setNewCard] = useState([])

    const [counter, setCounter] = useState(0)
    let cardId = 'card-'+counter

    function renderNewCard(){
        setCounter(counter+1)
        setNewCard((a)=> [...a, <Card id={cardId} />])
         
    }

    return(
        <>
            {newCard}
            <button onClick={()=>renderNewCard()}>+ Add new card</button>
        </>
    )
}