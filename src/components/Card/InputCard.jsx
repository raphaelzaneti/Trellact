import React, {useContext, useState} from 'react'
import '../../css/style.css'
import {CardName} from '../index'
import {CardContext} from './StoreCard.jsx'
import { useActiveCardInput } from '../../hooks/ActiveCardInput/ActiveCardInput'
import { useCardName } from '../../hooks/CardName/CardName'

export default props =>{
    
    const [newSpan, setNewSpan] = useState(undefined)
    const currentText = props.text || ""
    const {activeInput, setActiveInput} = useActiveCardInput()
    const {cardName, setCardName} = useCardName()

    function handleInput(e){
        e.preventDefault()
        const inputBox = document.getElementById('input'+props.id)
        if(inputBox.value==false){
            inputBox.placeholder='Insert card name'
        } else{
            inputBox.remove()
            setActiveInput(false)
            setCardName(inputBox.value)
            setNewSpan(<CardName id={props.id} handleCardModal={props.handleCardModal}/>)
        }
    }

    return(
        <>
            <form action="submit" onSubmit={handleInput}>
                <input id={'input'+props.id} placeholder={currentText}/>
            </form>
            {newSpan}
        </>
    )
}