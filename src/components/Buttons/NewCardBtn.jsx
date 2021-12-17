import React, {useState, useContext} from 'react'
import { useActiveCardInput } from '../../hooks/ActiveCardInput/ActiveCardInput'
import {Card} from '../index'

export default props =>{
    const [newCard, setNewCard] = useState([])
    const {activeInput, setActiveInput} = useActiveCardInput()

    console.log(activeInput)
    const [counter, setCounter] = useState(0)
    let cardId = 'card-'+counter
    
    function renderNewCard(){
        setCounter(counter+1)
        setNewCard((a)=> [...a, <Card id={cardId} />])
        setActiveInput(true)
    }

    return(
        <>
            {newCard}
            {activeInput 
                ? null
                : <button onClick={()=>renderNewCard()}>+ Add new card</button>           
            }
        </>
    )
}